const { createWatcher } = require('@makerdao/multicall');
const ethers = require("ethers")
const { pools } = require("./farm/pools.js");
import { toBech32 } from '@harmony-js/crypto'
export default {
      namespaced: true,
      state: {
        pairs: [],
      },
      getters: {
        getPairs: (state) => {
          return state.pairs
        },
      },
      actions: {
        async setPairs({commit, rootGetters}, {provider, multicallAddress, masterchef}) {
          const MULTICALL = multicallAddress
          const RPC = provider.connection.url
          const userAddress =  rootGetters['wallet/getUserAddress'];
          const chainId = rootGetters['wallet/getChainID']
          let CALL = [];
          for(const i in pools[chainId].pools){
            const pool = pools[chainId].pools[i]
            CALL.push({
              target: pool.pairaddress,
              call: ['balanceOf(address)(uint256)', userAddress],
              returns: [["balance:" + i, val => val]]
            })
            CALL.push({
              target: pool.pairaddress,
              call: ["totalSupply()(uint256)"],
              returns: [["supply:" + i, (val) => val]],
            });
            CALL.push({
              target: masterchef,
              call: ["amountStaked(uint256,address)(uint256)", parseInt(pool.pid), userAddress],
              returns: [["staked:" + i, (val) => val]],
            });
          }
          const config = {
            rpcUrl: RPC,
            multicallAddress: MULTICALL
          };
          const watcher = createWatcher(
            CALL,
            config
          );
          let results = []
          let poolsWithBalance = {}
          watcher.subscribe(update => { 
            results.push(update)
          });
          watcher.start();
          await watcher.awaitInitialFetch();
          watcher.stop();
          for(const i in pools[chainId].pools){
            const pair = pools[chainId].pools[i]
            const balance = results.find((element) => element.type === 'balance:' + i)
            const supply = results.find((element) => element.type === 'supply:' + i)
            const staked = results.find((element) => element.type === 'staked:' + i)
            const balanceValue = balance? parseFloat(ethers.utils.formatUnits(balance.value.toString(), 18)).toFixed(6): 0
            const supplyValue = supply? parseFloat(ethers.utils.formatUnits(supply.value.toString(), 18)).toFixed(6): 0
            const stakedValue = staked? parseFloat(ethers.utils.formatUnits(staked.value.toString(), 18)).toFixed(6): 0
            poolsWithBalance[i] = {
              ...pair, 
              oneAddress: toBech32(pair.pairaddress),
              balance: balanceValue, 
              supply: supplyValue, 
              staked: stakedValue
            }
          }
          commit('_loadPairs', poolsWithBalance)
          return poolsWithBalance;
        },
      },
      mutations: {
        _loadPairs: (state, value) => {
          state.pairs = value
        },
      }
}