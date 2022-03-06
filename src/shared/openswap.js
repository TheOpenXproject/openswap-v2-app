import MasterChef from "openswap-v2-core/build/contracts/MasterChef.json";
import IUniswapV2Router02 from "openswap-v2-core/build/contracts/IUniswapV2Router02.json";
import SushiMaker from "openswap-v2-core/build/contracts/SushiMaker.json";
import IERC20 from "openswap-v2-core/build/contracts/IERC20.json";
import OpenSwapBridge from "openswap-v2-core/build/contracts/OpenSwapBridge.json";
import OpenSwapToken from "openswap-v2-core/build/contracts/OpenSwapToken.json";
import StakingPrecompiles from "@/components/farm/Validators/StakingPrecompiles.json";
import DelegatorContract from "@/components/farm/Validators/delegateContract.json";

import stateloader from "@/shared/stateloader.js";


import MultiTransfer from "@/components/farm/Validators/MultiTransfer.json";

import { ethers } from "ethers";

import { Harmony } from '@harmony-js/core';
import { toBech32, fromBech32 } from '@harmony-js/crypto'

import { ChainType, numberToHex, Unit } from '@harmony-js/utils'
import oneWallet from './OneWallet.js'


const hmy = new Harmony(
  // let's assume we deploy smart contract to this end-point URL
  'https://harmony-0-rpc.gateway.pokt.network',
  {
    chainType: ChainType.Harmony,
    chainId: 1,
  },
);
import { mapGetters, mapActions } from 'vuex';
const { Route, Price, Token, Fetcher, ChainId, Trade, TokenAmount, TradeType, Percent} = require("openswap-v2-sdk");
const { Pools } = require("../store/modules/farm/pools.js");

import { toastMe } from '@/components/toaster/toaster.js';

export default {
  created: function () {},
  mixins: [stateloader],
  computed: {
    ...mapGetters('addressConstants', ['oSWAPMAKER', 'oSWAPCHEF','WONE' , 'UNIROUTERV2', 'OPENSWAPBRIDGE','oSWAPTOKEN', 'bBUSD', 'eBUSD', 'eUSDC', 'bUSDC', 'lockedAddress','getValContracts']),

      
  },
  methods: {
    ...mapGetters('exchange/swapper', ['getAllPairs']),
    ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress', 'getWallet', 'getWalletType']),
    ...mapGetters('farm/farmData', ['getStateOpenXPrice', 'getStateOnePrice']),
    ...mapActions('farm/farmData', ['setOpenXPrice', 'setOnePrice']),
    ...mapActions('exchange/swapper', ['setBtnState']),
    ...mapGetters('farm/farmData', ['getFarmPairs', 'getFarms']),
    ...mapActions('liquidity/buttons', ['setBtnState']),
    getProvider: function(call){
       let networks = {
      1:{
        rpcURL: '',
        provider: '',
        name: ""
      },
      56: {
        rpcURL: '',
        provider: '',
        name: ""
      },
      1666600000: {
        rpcURL: 'https://harmony-0-rpc.gateway.pokt.network',
        provider: new ethers.providers.JsonRpcProvider('https://harmony-0-rpc.gateway.pokt.network/', {chainId: 1666600000, name: "Harmony Mainnet S0"}),
        name: "mainnet harmony"
      },
      1666700000: {
        rpcURL: 'https://api.s0.b.hmny.io',
        provider: new ethers.providers.JsonRpcProvider('https://api.s0.b.hmny.io', {chainId: 1666700000, name: "Harmony Testnet S0"}),
        name: "testnet"
      },
      1337:{
        rpcURL: 'http://localhost:7545',
        provider: new ethers.providers.JsonRpcProvider('http://localhost:7545', {chainId: 1337, name: "local"}),
        name: "local"
      }
    }
      let id = this.getChainID();
      console.log(id)
      if(this.getUserSignedIn() == true && this.getWalletType() == 'metamask' && call == undefined){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        return provider
      }
      if(call){
        const provider = networks[this.getChainID()].provider
        return provider
      }
      else{
        const provider = networks[this.getChainID()].provider
        return provider
      }
    },

    addTokenToMetamask: async function(token) {
      const tokenAddress = token.oneZeroxAddress;
      var tokenSymbol = token.Symbol;
      if(tokenAddress == this.WONE(this.getChainID())){
        tokenSymbol = "WONE";
      }
      
      const tokenDecimals = token.decimals;
      const tokenImage = token.imgSrc;

      const res = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol.slice(0,11), // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage // A string url of the token logo
          }
        }
      });
      console.log(res);
      },
    getOpenXPrice: async function () {
        this.balances = [];
        let chainID = this.getChainID()

        const Oswap = new Token(
          chainID,
          this.oSWAPTOKEN(chainID),
          18
        );
        const Busd = new Token(
          chainID,
          this.bBUSD(chainID),
          18
        );

        const pair = await Fetcher.fetchPairData(Oswap, Busd).catch(error => {
          console.log(error);
          this.error = 1;
          this.errormessage = "Pool Doesn't Exist";
        });
        if(pair.tokenAmounts[0].token.address == this.bBUSD(this.getChainID())){
          return pair.token1Price.toSignificant(4);
        }else {
          return pair.token0Price.toSignificant(4);
        }
        

    },
    getOnePrice: async function () {
        this.balances = [];
        let chainID = this.getChainID()

        const Oswap = new Token(
          chainID,
          this.WONE(chainID),
          18
        );
        const Busd = new Token(
          chainID,
          this.bBUSD(chainID),
          18
        );

        const pair = await Fetcher.fetchPairData(Oswap, Busd).catch(error => {
          console.log(error);
          this.error = 1;
          this.errormessage = "Pool Doesn't Exist";
        });
        if(pair.tokenAmounts[0].token.address == this.bBUSD(this.getChainID())){
          return pair.token0Price.toSignificant(4);
        }else {
          return pair.token1Price.toSignificant(4);
        }
        

    },
    getOswapPrice: async function(){
      return this.getStateOpenXPrice()
    },
    getTokenPrices: async function(){
      let oswap = await this.getOpenXPrice();
      let one = await this.getOnePrice();

      this.setOnePrice(one);
      this.setOpenXPrice(oswap)
    },
    getOneBalance: async function(){
        const provider = this.getProvider()
        const userAddress = this.getUserAddress()
                const balance = await provider.getBalance(userAddress);
        return balance
    },
    getETHTokenBalance: async function(token, address){
      const abi = [
        // balanceOf
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function"
        },
        // decimals
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          type: "function"
        }
      ];
      const provider = new ethers.providers.InfuraProvider('mainnet',
      '998f0142cce3485ba1cb3c4e9d9990ab')
      const userAddress = address

      if (token.ethAddress == "0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        const balance = await provider.getBalance(userAddress);

        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      } else {
        const contract = new ethers.Contract(token.ethAddress, abi, provider)
        const balance = await contract
            .balanceOf(userAddress)
        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      }
    

    },
    getBSCTokenBalance: async function(token, address){
      const abi = [
        // balanceOf
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function"
        },
        // decimals
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          type: "function"
        }
      ];
      const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/", {chainId: 56, name: "Binance"})
      const userAddress = address
      
      if (token.bscAddress == "0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
        const balance = await provider.getBalance(userAddress);

        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      } else {
        const contract = new ethers.Contract(token.bscAddress, abi, provider)
        const balance = await contract
            .balanceOf(userAddress)
        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      }
    

    },
    getHMYTokenBalance: async function(token){
      const abi = [
        // balanceOf
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function"
        },
        // decimals
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          type: "function"
        }
      ];
      const provider = this.getProvider(true)
      const userAddress = this.getUserAddress()

      if (token.oneZeroxAddress == this.WONE(this.getChainID())) {
        const balance = await provider.getBalance(userAddress);

        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      } else {
        const contract = new ethers.Contract(token.oneZeroxAddress, abi, provider)
        const balance = await contract
            .balanceOf(userAddress)
        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      }
    

    },
    getTokenBalance: async function(token){
      const abi = [
        // balanceOf
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function"
        },
        // decimals
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          type: "function"
        }
      ];
      const provider = this.getProvider()
      const userAddress = this.getUserAddress()
      ;

      if (token.oneZeroxAddress == this.WONE(this.getChainID())) {
        const balance = await provider.getBalance(userAddress);

        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      } else {
        const contract = new ethers.Contract(token.oneZeroxAddress, abi, provider)
        const balance = await contract
            .balanceOf(userAddress)
        let formatedbalance = ethers.utils.formatUnits(balance.toString(), token.decimals).toString();
        

        return formatedbalance;
      }
    

    },
    getAllRewards: async function () {
      const provider = this.getProvider(true)
      const address = this.getUserAddress()
      ;
      if (address != "0x0000000000000000000000000000000000000011") {
        var i = 0, n;
        var totalUnclaimedRewards = ethers.BigNumber.from("0");

        const abi = MasterChef.abi;
        const masterChef = this.oSWAPCHEF(this.getChainID());
        const contract = new ethers.Contract(masterChef, abi, provider);

        for (n in Pools) {
          const pending = await contract
            .pendingOpenSwap(parseInt(Pools[n].pid), address).catch(error => {
              console.log(error);
              this.error = 1;
              this.errormessage = "Error getting reward amount.";
            });
          
          const pendingsushi = ethers.BigNumber.from(pending);
          totalUnclaimedRewards =
            totalUnclaimedRewards.add(pendingsushi);

          i++;
        }
        this.unclaimedTotal = ethers.utils.formatUnits(totalUnclaimedRewards.toString(), 18).toString();
      }

      await this.getSingleRewards();
      let unclaimedFormatted = ethers.utils.formatUnits(this.unclaimedTotal.toString()).toString();
      return unclaimedFormatted;
      
    },
    getSingleRewards: async function(){
      var totalUnclaimedRewards = ethers.BigNumber.from("0");
      const provider = this.getProvider(true)
      const address = this.getUserAddress()
      ;
      const abi = MasterChef.abi;
      const masterChef = this.oSWAPCHEF(this.getChainID());
      const contract = new ethers.Contract(masterChef, abi, provider);
      const i = 11;
      const pending = await contract.pendingOpenSwap(i, address).catch(error => {
        console.log(error);
        this.error = 1;
        this.errormessage = "Error getting reward amount.";
      });;
      const pendingsushi = ethers.BigNumber.from(pending);
      this.unclaimedTotal = totalUnclaimedRewards.add(pendingsushi);
    },
    collectAll: async function(){
      
        let isDefaultWallet = this.checkSignedIn()
            if (isDefaultWallet){
              toastMe('error', {
                title: 'ERROR',
                msg: `Not Signed In`,
                link: false,
                href: ''
                })
              return 1
        }
        let abi = [
              {
                "inputs": [],
                "name": "masterchef",
                "outputs": [
                  {
                    "internalType": "contract IMASTERCHEF",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
              },
              {
                "inputs": [],
                "name": "collectAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              }
            ]


          if(this.getWalletType() == 'metamask'){
            
              
              
            
            const provider = this.getProvider()
            const signer = provider.getSigner();
            const contract = new ethers.Contract(this.oSWAPCHEF(this.getChainID()), abi, signer);
            const tx = await contract.collectAll().catch(err => {

              var message;
              if(!err.data?.message){
                message = err.message
              }else{
                message = err.data.message
              }
              toastMe('error', {
                title: 'Error :',
                msg: message,
                link: false
              })
              return
            })
            let transaction = tx.hash
            let explorer = 'https://explorer.harmony.one/#/tx/'
              toastMe('info', {
                title: 'Transaction Sent',
                msg: "Collect All Sent to network. waiting for confirmation",
                link: false,
                href: `${explorer}${transaction}`
              })
              
              await tx.wait(1)
              toastMe('success', {
                title: 'Tx Succesfull',
                msg: "Explore : " + transaction,
                link: true,
                href: `${explorer}${transaction}`
              })
          }
          if(this.getWalletType() == 'oneWallet'){
            let options = { gasPrice: "0x3B9ACA00" };
            const unattachedContract = hmy.contracts.createContract(abi,this.oSWAPCHEF(this.getChainID()));
            let wallet = new oneWallet()
            await wallet.signin()
            let contract = wallet.attachToContract(unattachedContract)
            //const gas = await contract.methods.collectAll().estimateGas(options).catch();
            //console.log(gas)
            options = {
              gasPrice: 30000000000,
              gasLimit: 2000000
              };
            var tx = await contract.methods.collectAll().send(options)
            if(tx.transaction.txStatus == 'CONFIRMED'){
              let transaction = tx.transaction.id
            let explorer = 'https://explorer.harmony.one/#/tx/'
               toastMe('success', {
                title: 'Tx Succesfull',
                msg: "Explore : " + transaction,
                link: true,
                href: `${explorer}${transaction}`
              })
            }
            
          }
         // this.getAllRewards();
          await this.UpdateState()


          return tx;
    },
    collectOSWAP: async function(pool){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const abi = MasterChef.abi
      const masterChef = this.oSWAPCHEF(this.getChainID());
      const pid = parseInt(pool.pid)

      if(this.getWalletType() == 'metamask'){
        const provider = this.getProvider()
        const signer = provider.getSigner();
        const contract = new ethers.Contract(masterChef, abi, signer);
        
        const tx = await contract.withdraw(pid, '0').catch(err => {

          var message;
          if(!err.data?.message){
            message = err.message
          }else{
            message = err.data.message
          }
          toastMe('error', {
            title: 'Error :',
            msg: message,
            link: false
          })
          return
        })
        let explorer = 'https://explorer.harmony.one/#/tx/'
        let transaction = tx.hash

        toastMe('info', {
          title: 'Transaction Sent',
          msg: "Collect request sent to network. Waiting for confirmation",
          link: false,
          href: `${explorer}${transaction}`
        })
        await tx.wait(1)
        toastMe('success', {
          title: 'Tx Successful',
          msg: "Explore : " + transaction,
          link: true,
          href: `${explorer}${transaction}`
        })
      }
      if(this.getWalletType() == 'oneWallet'){
            let options = { gasPrice: "0x3B9ACA00" };
            const unattachedContract = hmy.contracts.createContract(abi, masterChef);
            let wallet = new oneWallet()
            await wallet.signin()
            let contract = wallet.attachToContract(unattachedContract)
            //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
            //console.log(gas)
            options = {
              gasPrice: 30000000000,
              gasLimit: 700000
              };
            var tx = await contract.methods.withdraw(pid, '0').send(options)
            if(tx.transaction.txStatus == 'CONFIRMED'){
              let transaction = tx.transaction.id
            let explorer = 'https://explorer.harmony.one/#/tx/'
               toastMe('success', {
                title: 'Tx Succesfull',
                msg: "Explore : " + transaction,
                link: true,
                href: `${explorer}${transaction}`
              })
            }
            
          
      }
            await this.UpdateState()

    },
    unstakeLP: async function(pool, amount){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const abi = MasterChef.abi
      const masterChef = this.oSWAPCHEF(this.getChainID());
      const pid = parseInt(pool.pid)
      let tempToken = {decimals: 18};
      amount = this.getUnits(amount, tempToken)


      if(this.getWalletType() == 'metamask'){
      const provider = this.getProvider()
      const signer = provider.getSigner();
      const contract = new ethers.Contract(masterChef, abi, signer);
      const tx = await contract.withdraw(pid, amount).catch(err => {

        var message;
        if(!err.data?.message){
          message = err.message
        }else{
          message = err.data.message
        }
        toastMe('error', {
          title: 'Error :',
          msg: message,
          link: false
        })
        return
      })
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Collect request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
    }
      if(this.getWalletType() == 'oneWallet'){
            let options = { gasPrice: "0x3B9ACA00" };
            const unattachedContract = hmy.contracts.createContract(abi, masterChef);
            let wallet = new oneWallet()
            await wallet.signin()
            let contract = wallet.attachToContract(unattachedContract)
            //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
            //console.log(gas)
            options = {
              gasPrice: 30000000000,
              gasLimit: 700000
              };
            var tx = await contract.methods.withdraw(pid, amount.toString()).send(options)
            if(tx.transaction.txStatus == 'CONFIRMED'){
              let transaction = tx.transaction.id
            let explorer = 'https://explorer.harmony.one/#/tx/'
               toastMe('success', {
                title: 'Tx Succesfull',
                msg: "Explore : " + transaction,
                link: true,
                href: `${explorer}${transaction}`
              })
            }
          }
                await this.UpdateState()

    },
    changeSpending: async function(token1, contractAddr, amount){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      //biggest wei denomination
      const wei =
          ethers.BigNumber.from(amount);
      const abi = IERC20.abi;
      if(this.getWalletType() == 'metamask'){
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = this.getUserAddress()
        ;
        

        const contract = new ethers.Contract(token1.oneZeroxAddress, abi, signer);

        const tx = await contract.approve(contractAddr, wei).catch( error => {
          throw error
        })
        let explorer = 'https://explorer.harmony.one/#/tx/'
        let transaction = tx.hash

        toastMe('info', {
          title: 'Transaction Sent',
          msg: "Approval Sent to network. Waiting for confirmation",
          link: false,
          href: `${explorer}${transaction}`
        })
        await tx.wait(1)
        toastMe('success', {
          title: 'Tx Successful',
          msg: "Explore : " + transaction,
          link: true,
          href: `${explorer}${transaction}`
        })
      }
      if(this.getWalletType() == 'oneWallet'){
            let options = { gasPrice: "0x3B9ACA00" };
            const unattachedContract = hmy.contracts.createContract(abi, token1.oneZeroxAddress);
            let wallet = new oneWallet()
            await wallet.signin()
            let contract = wallet.attachToContract(unattachedContract)
            //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
            //console.log(gas)
            options = {
              gasPrice: 30000000000,
              gasLimit: 700000
              };
            var tx = await contract.methods.approve(contractAddr, wei.toString()).send(options)
            if(tx.transaction.txStatus == 'CONFIRMED'){
              let transaction = tx.transaction.id
            let explorer = 'https://explorer.harmony.one/#/tx/'
               toastMe('success', {
                title: 'Tx Succesfull',
                msg: "Explore : " + transaction,
                link: true,
                href: `${explorer}${transaction}`
              })
            
              
            }
          
      }
    },
    revokeSpending: async function(token1, contractAddr){
      await this.changeSpending(token1, contractAddr, "0")
    },
    approveSpending: async function(token1, contractAddr){
      await this.changeSpending(token1, contractAddr, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
    },
    checkAllowance: async function(token1, contractAddr){
      const provider = this.getProvider(true)
      const address = this.getUserAddress()
      
      const abi = IERC20.abi;
      const contract = new ethers.Contract(token1.oneZeroxAddress, abi, provider);
      let allowance = contract.allowance(address, contractAddr)
      return allowance;
    },
    burnAll: async function(){
      var i = 0,
        n;
       let token0arr = []
       let token1arr = []
      for (n in Pools) {
        
        token0arr.push(Pools[n].token0address)
        token1arr.push(Pools[n].token1address)
        i++
      }

      const abi = SushiMaker.abi;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.oSWAPMAKER(this.getChainID()), abi, signer);
      
      

      const tx = await contract.convertMultiple(token0arr, token1arr).catch(err => {

        var message;
        if(!err.data?.message){
          message = err.message
        }else{
          message = err.data.message
        }
        toastMe('error', {
          title: 'Error :',
          msg: message,
          link: false
        })
        return
      })

      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Burn request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      return
        
      
    },
    burnPool: async function(pool){
      
      const abi = SushiMaker.abi;
      if(this.getWalletType() == 'metamask'){
         const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          let makerAddr = this.oSWAPMAKER(this.getChainID())
          
      const contract = new ethers.Contract(makerAddr, abi, signer);
      const tx = await contract.convert(pool.token0address, pool.token1address).catch(err => {
        var message;
        if(!err.data?.message){
          message = err.message
        }else{
          message = err.data.message
        }
        toastMe('error', {
          title: 'Error :',
          msg: message,
          link: false
        })
        return
      })

      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Burn request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.oSWAPMAKER(this.getChainID()));
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 700000
          };
        var tx = await contract.methods.convert(pool.token0address, pool.token1address).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
      return
    },
    
    //----------------------------------------SDK------------------------------------------
    getPair: async function(token0, token1){
      const Token0 = await Fetcher.fetchTokenData(
      this.getChainID(),
      token0.oneZeroxAddress
    );
    const Token1 = await Fetcher.fetchTokenData(
      this.getChainID(),
      token1.oneZeroxAddress
    );
    const pair = await Fetcher.fetchPairData(Token0,Token1).catch(error => {
      console.log(error); 
      throw error 
    });
    return pair;
    },
    getPairAsToken: async function(token0, token1){
      const Token0 = await Fetcher.fetchTokenData(
      this.getChainID(),
      token0.oneZeroxAddress
    );
    const Token1 = await Fetcher.fetchTokenData(
      this.getChainID(),
      token1.oneZeroxAddress
    );
    const pair = await Fetcher.fetchPairData(Token0,Token1).catch(error => {
      console.log(error);  
    });

    let token = {}
    token.oneZeroxAddress = pair["liquidityToken"].address
    token.decimals = 18
    return token;
    },
     getPairByAddressFarm: async function(token0, token1){
      const Token0 = await Fetcher.fetchTokenData(
      1666600000,
      token0
    );
    const Token1 = await Fetcher.fetchTokenData(
      1666600000,
      token1
    );
    const pair = await Fetcher.fetchPairData(Token0,Token1).catch(error => {
      console.log(error); 
      throw error 
    });
    return pair;
    },
    getRate: function(pair, token1) {
      let rate = [];
      if (
        pair["tokenAmounts"][0].currency.address != token1.oneZeroxAddress
      ) {
        rate = pair.token1Price.toFixed(8);
      } else {
        rate = pair.token0Price.toFixed(8);
      }

      return rate;
    },
    getReserves: function(pair, token1) {
      let reserves = [];
      if (
        pair["tokenAmounts"][0].currency.address != token1.oneZeroxAddress
      ) {
        reserves[1] = ethers.utils.commify(pair.reserve0.toFixed(6));
        reserves[0] = ethers.utils.commify(pair.reserve1.toFixed(6));
      } else {
        reserves[0] = ethers.utils.commify(pair.reserve0.toFixed(6));
        reserves[1] = ethers.utils.commify(pair.reserve1.toFixed(6));
      }
      return reserves;
    },
    getLiquidityValueSolo: async function(pool, staked){
      let token0 = {oneZeroxAddress : pool.token0address} 
      let token1 = {oneZeroxAddress :this.bBUSD(this.getChainID())} //BUSD
      const pair = await this.getPair(token1, token0)
      let rate = this.getRate(pair, token0)
      return parseFloat(rate * this.getEthUnits(staked.toString())).toFixed(5)
    },
    
      getLiquidityValue: async function(pool, tt0sBN, tt1sBN){
      let is0Stable = this.isStablecoin(pool.token0address)
      let is1Stable = this.isStablecoin(pool.token1address)
      let onePrice = this.getStateOnePrice();
      let openxPrice = this.getStateOpenXPrice();

      
      let tt0s = parseFloat(this.getFormatedUnitsDecimals(tt0sBN.toString(), pool.decimals[0]))
      let tt1s = parseFloat(this.getFormatedUnitsDecimals(tt1sBN.toString(), pool.decimals[1]))
      if(is0Stable == true ){
        return [ethers.utils.commify(parseFloat(tt0s).toFixed(2) * 2), parseFloat(tt0s).toFixed(2) *2];
      }
       let check = false
      if(is1Stable == true){
        check = true
        return [ethers.utils.commify(parseFloat(tt1s).toFixed(2) * 2), parseFloat(tt1s).toFixed(2) * 2];

      }
      
      if(pool.token0address == this.WONE(this.getChainID())){
        check = true
        return [ethers.utils.commify((parseFloat(tt0s).toFixed(2)* onePrice * 2).toFixed(2)), parseFloat(tt0s).toFixed(2)* onePrice * 2];
      }
      if(pool.token1address == this.WONE(this.getChainID())){
        check = true
        return [ethers.utils.commify((parseFloat(tt1s).toFixed(2)* onePrice * 2).toFixed(2)), parseFloat(tt1s).toFixed(2)* onePrice * 2];
      }
      if(pool.token0address == this.oSWAPTOKEN(this.getChainID())){
        check = true
        return [ethers.utils.commify((parseFloat(tt0s).toFixed(2)* openxPrice * 2).toFixed(2)), parseFloat(tt0s).toFixed(2) * openxPrice * 2];
      }
      if(pool.token1address == this.oSWAPTOKEN(this.getChainID())){
        check = true
        return [ethers.utils.commify((parseFloat(tt1s).toFixed(2)* openxPrice * 2).toFixed(2)), parseFloat(tt1s).toFixed(2) * openxPrice * 2];
      }

      if(check == false){
        var Token0 = {oneZeroxAddress: pool.token0address} 
        let Token1 = {oneZeroxAddress: this.bBUSD(this.getChainID())}
        let wei = ethers.utils.parseUnits('1', 18)
        var route = await this.getBestRouteFarms(wei, Token0, Token1);
        
        
        return  [ethers.utils.commify(parseFloat(route.route.midPrice.toFixed(8)  * tt0s * 2).toFixed(2)) ,
          parseFloat(route.route.midPrice.toFixed(8) * tt0s).toFixed(8) * 2]
      }
    },
    getBestRouteOut: async function(parsedAmount, token0, token1) {
            const Token0 = new Token(
                this.getChainID(),
                token0.oneZeroxAddress,
                token0.decimals
                )
             const Token1 = new Token(
                this.getChainID(),
                token1.oneZeroxAddress,
                token1.decimals
                )

            var pairs = []
            const farms = this.getAllPairs()
            for(var w in farms){
              pairs.push(farms[w])

            }

      const bestRoute = await Trade.bestTradeExactOut(pairs,Token1, new TokenAmount(Token0, parsedAmount), { maxNumResults : 6, maxHops : 3 })
      console.log(bestRoute)
      return bestRoute[0]
    },
    getBestRouteIn: async function(parsedAmount, token0, token1) {
            const Token0 = new Token(
                this.getChainID(),
                token0.oneZeroxAddress,
                token0.decimals
                )
             const Token1 = new Token(
                this.getChainID(),
                token1.oneZeroxAddress,
                token1.decimals
                )


            var pairs = []
            const farms = this.getAllPairs()
            for(var w in farms){
              pairs.push(farms[w])
  
            }


      const bestRoute = await Trade.bestTradeExactIn(pairs, new TokenAmount(Token0, parsedAmount), Token1)
      console.log(bestRoute)
      return bestRoute[0]
    },
    getBestRoute: async function(parsedAmount, token0, token1) {
            const Token0 = new Token(
                this.getChainID(),
                token0.oneZeroxAddress,
                token0.decimals
                )
             const Token1 = new Token(
                this.getChainID(),
                token1.oneZeroxAddress,
                token1.decimals
                )


            var pairs = []
            const farms = this.getFarms()
            for(var w in farms){
            if(farms[w].uniPair.involvesToken(Token0) || farms[w].uniPair.involvesToken(Token1))
              pairs.push(farms[w].uniPair)
              console.log(pairs)
            }


      const bestRoute = await Trade.bestTradeExactOut(pairs,Token1,new TokenAmount(Token0, parsedAmount),{ maxNumResults : 6, maxHops : 3 })
      console.log(bestRoute)
      
      return bestRoute[0]
    },
    getBestRouteFarms: async function(parsedAmount, token0, token1) {

            const [
      Token0,
      Token1,
      TokenX,
      TokenY,
      TokenZ,
      EUSDC,
      BUSDC] = await Promise.all([
        Fetcher.fetchTokenData(
                this.getChainID(),
                token0.oneZeroxAddress
                ),
        Fetcher.fetchTokenData(
                this.getChainID(),
                token1.oneZeroxAddress
                ),
        new Token(
                this.getChainID(),
                this.WONE(this.getChainID()),
                18
                ),
        new Token(
                this.getChainID(),
                this.oSWAPTOKEN(this.getChainID()),
                18
                ),
        new Token(
                this.getChainID(),
                this.bBUSD(this.getChainID()),
                18
                ),
        new Token(
                this.getChainID(),
                this.eUSDC(this.getChainID()), //eusdc
                6
                ),
        new Token(
                this.getChainID(),
                this.bUSDC(this.getChainID()), //busdc
                18
                )
      ]);

      const pairTHATEXISTS = await Fetcher.fetchPairData(TokenZ, TokenY)

      const [
             pair01,
             paira,
             pairab,
             pairc,
             paircd,
             paire,
             pairef,
             pairfg,
             pairgh,pairij
            ] = await Promise.all([
              Fetcher.fetchPairData(Token0, Token1).catch(() => {
                      return pairTHATEXISTS
              }), 
              Fetcher.fetchPairData(Token0, TokenX).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(TokenX, Token1).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(Token0, TokenY).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(TokenY, Token1).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(Token0, TokenZ).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(TokenZ, Token1).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(Token1, EUSDC).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(BUSDC, EUSDC).catch(() => {
                      return pairTHATEXISTS
              }),
              Fetcher.fetchPairData(EUSDC, BUSDC).catch(() => {
                      return pairTHATEXISTS
              })
            ]);

      const bestRoute = await Trade.bestTradeExactIn([paira,pairab,pairc,paircd,paire,pairef, pairgh, pairij,pairfg,pair01, pairTHATEXISTS],new TokenAmount(Token0, parsedAmount), Token1)

      return bestRoute[0]
    },
    getBestRouteFarmsV2: async function(parsedAmount, token0, token1) {
            const [
      Token0,
      Token1] = await Promise.all([
        Fetcher.fetchTokenData(
                this.getChainID(),
                token0.oneZeroxAddress
                ),
        Fetcher.fetchTokenData(
                this.getChainID(),
                token1.oneZeroxAddress
                )
      ]);

            let pairs = this.getFarmPairs();

      const bestRoute = await Trade.bestTradeExactIn(pairs,new TokenAmount(Token0, parsedAmount), Token1).catch(err => {
        console.log(err)
      })

      return bestRoute[0]
    },
    getPath: function(bestRoute){
      var i = 0;
      var path = [];
      while(bestRoute.route.path.length > i){
        
        path.push(bestRoute.route.path[i].address)
        i++
      }
      return path;
    },
    getTrade: async function(route, amount, token0){
       const Token0 = await Fetcher.fetchTokenData(
        this.getChainID(),
        token0.oneZeroxAddress
      );
      const trade = new Trade(
        route,
        new TokenAmount(Token0, amount),
        TradeType.EXACT_INPUT
      );
      return trade;
    },
    getOswapPerBlock: async function(){
      const provider = this.getProvider()
      const abi = MasterChef.abi;
      const contract = new ethers.Contract(this.oSWAPCHEF(this.getChainID()), abi, provider);

      const oswapPerBlock = await contract.OpenSwapPerBlock();
      const allocPoints = await contract.totalAllocPoint();
      if(allocPoints.toString() == '0'){
        return 0
      }
      const blocksPerWeek = ethers.BigNumber.from(String(604800 / 2))
      let rewardsPerWeek = oswapPerBlock.div(allocPoints).mul(blocksPerWeek)
      
      return ethers.utils.formatUnits(rewardsPerWeek.toString(), 18).toString()

    },

    getAllocPoints: async function(pool){
      const provider = this.getProvider()
      const abi = MasterChef.abi;
      const contract = new ethers.Contract(this.oSWAPCHEF(this.getChainID()), abi, provider);

      const oswapPerBlock = await contract.OpenSwapPerBlock();
      const poolInfo = await contract.poolInfo(pool.pid);

      
      return poolInfo.allocPoint.toString()/1

    },
    
    getRewardValue: async function(pool, poolWeight) {
  
      
      const price = await this.getOswapPrice()
      
      const aWeekly = await this.getOswapPerBlock()
     
      const allocpoint = await this.getAllocPoints(pool)

      const aMonthly = aWeekly * 4;

      

          const weekly = String(price * aWeekly*allocpoint * poolWeight / 100);
          const monthly = String(price * aMonthly*allocpoint * poolWeight / 100);

      return [weekly.substring(0, 10), monthly.substring(0, 10)];
    },
    getRewardValueVal: async function(pool, poolWeight) {
  
      
      const price = await this.getOswapPrice()
      
      const aWeekly = await this.getOswapPerBlock()
     
      const allocpoint = await this.getAllocPoints(pool)
      
      const aMonthly = aWeekly * 4;

      

          //const weekly = String(price * aWeekly*allocpoint * poolWeight / 100);
          const monthly = String(price * aMonthly*allocpoint * poolWeight / 100);

      return monthly;
    },
    getLpTokens: async function(pair, totalSupply, amount0, decimals0, amount1, decimals1) {
      const t0 = this.getBN(this.getUnitsD(amount0.toFixed(8), decimals0))
      const t1 = this.getBN(this.getUnitsD(amount1.toFixed(8), decimals1))
      const total = await pair.getLiquidityMinted(
        new TokenAmount(pair.liquidityToken,totalSupply), 
        new TokenAmount(pair.token0,t0), 
        new TokenAmount(pair.token1,t1), 
        )
      return total;
    },
    getTokenAmounts: async function(pool, LPsupply, staked, totalStaked) {
      
      const [
        token0,
        token1,
        tokenLP,
       ] = await Promise.all([
         Fetcher.fetchTokenData(this.getChainID(), pool.token0address),
         Fetcher.fetchTokenData(this.getChainID(), pool.token1address),
         Fetcher.fetchTokenData(this.getChainID(), pool.pairaddress)
       ]);

      

      const supply = new TokenAmount(tokenLP, LPsupply);
      const liquidity = new TokenAmount(tokenLP, staked);
      const Tliquidity = new TokenAmount(
        tokenLP,
        supply
      );
     

      const pair = await Fetcher.fetchPairData(token0, token1);
      const value0 = await pair.getLiquidityValue(token0, supply, liquidity);
      const token0Pstaked = ethers.utils.commify(value0.toFixed(4));
      const value1 = await pair.getLiquidityValue(token1, supply, liquidity);
      const token1Pstaked = ethers.utils.commify(value1.toFixed(4));
      
      
      const tvalue0 = await pair.getLiquidityValue(token0, supply, Tliquidity);
      const token0Tstaked = ethers.utils.commify(tvalue0.toFixed(4));
      const tvalue1 = await pair.getLiquidityValue(token1, supply, Tliquidity);
      const token1Tstaked = ethers.utils.commify(tvalue1.toFixed(4));


      return [token0Pstaked, token1Pstaked, token0Tstaked, token1Tstaked, value0, value1, tvalue0, tvalue1]
    },
    getAmountsLiquidity: async function(pair, token0, token1, amount){
      
      const Token0 = await Fetcher.fetchTokenData(
        this.getChainID(),
        token0.oneZeroxAddress
      );
      const route = new Route([pair], Token0);
      const price = Price.fromRoute(route);
      const amountin = ethers.BigNumber.from(this.getUnits(amount, token0))

      const amountOut = price
        .quote(new TokenAmount(Token0, amountin.toString()))
        .toFixed(token1.decimals);
        return amountOut


    },
    getAmountsLiquidityCalc: async function(pair, token0, token1, amount){
      
      const Token0 = pair.token0
      const route = new Route([pair], Token0);
      const price = Price.fromRoute(route);
      const amountin = ethers.BigNumber.from(this.getUnits(amount, token0))

      const amountOut = price
        .quote(new TokenAmount(Token0, amountin.toString()))
        .toFixed(token1.decimals);
        return amountOut


    },
    //----------------------------------------Swap-------------------------------------------
    swapETHForExactTokens: async function(amountIn, amountOutMin, path, token1){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const value = ethers.utils.parseEther(amountIn)
      const deadline = this.getDeadline()
      const amountOutParsed = this.getUnits(amountOutMin, token1)
      const address = this.getUserAddress()
      ;
      const abi = IUniswapV2Router02.abi;


      if(this.getWalletType() == 'metamask'){
      let valueOveride = {
        value: value
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.UNIROUTERV2(this.getChainID()), abi, signer);
      const tx = await contract.swapExactETHForTokens(amountOutParsed, path, address, deadline, valueOveride).catch(err => {

        var message;
        if(!err.data?.message){
          message = err.message
        }else{
          message = err.data.message
        }
        toastMe('error', {
          title: 'Error :',
          msg: message,
          link: false
        })
        this.setBtnState({swap: 'swap'});
        return
      })


      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash
      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Swap sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2(this.getChainID()));
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 3000000,
          value: String(value)
          };
        var tx = await contract.methods.swapExactETHForTokens(amountOutParsed.toString(), path, address, deadline).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
      await this.UpdateState()

    },
    swapTokensForExactETH: async function(amountIn, amountOutMin, path, token0){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      let deadline = this.getDeadline()
      let amoutInParsed = this.getUnits(amountIn, token0)
      let amountOutParsed = ethers.utils.parseEther(amountOutMin)
      const address = this.getUserAddress()
      ;
      const abi = IUniswapV2Router02.abi;

      if(this.getWalletType() == 'metamask'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.UNIROUTERV2(this.getChainID()), abi, signer);
      const tx = await contract.swapExactTokensForETH(amoutInParsed, amountOutParsed, path, address, deadline).catch(err => {

        var message;
        if(!err.data?.message){
          message = err.message
        }else{
          message = err.data.message
        }
        toastMe('error', {
          title: 'Error :',
          msg: message,
          link: false
        })
        this.setBtnState({swap: 'swap'});
        return
      })


      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash
      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Swap sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2(this.getChainID()));
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 3000000
          };
        var tx = await contract.methods.swapExactTokensForETH(amoutInParsed.toString(),amountOutParsed.toString(), path, address, deadline).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
          await this.UpdateState()

    },
    swapExactTokensForTokens: async function(amountIn, amountOutMin, path, token0, token1){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      let deadline = this.getDeadline()
      let amoutInParsed = this.getUnits(amountIn, token0)
      let amountOutParsed = this.getUnits(amountOutMin, token1)
      const address = this.getUserAddress()
      ;
      const abi = IUniswapV2Router02.abi;

      if(this.getWalletType() == 'metamask'){

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(this.UNIROUTERV2(this.getChainID()), abi, signer);

      const tx = await contract.swapExactTokensForTokens(amoutInParsed, amountOutParsed, path, address, deadline).catch(err => {

        var message;
        if(!err.data?.message){
          message = err.message
        }else{
          message = err.data.message
        }
        toastMe('error', {
          title: 'Error :',
          msg: message,
          link: false
        })
        this.setBtnState({swap: 'swap'});
        return
      })

      
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash
      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Swap sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2(this.getChainID()));
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 3000000
          };
        var tx = await contract.methods.swapExactTokensForTokens(amoutInParsed.toString(), amountOutParsed.toString(), path, address, deadline).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
            await this.UpdateState()

    },
    stakeLP: async function(pool,amount){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const abi = MasterChef.abi
      const masterChef = this.oSWAPCHEF(this.getChainID());
      const pid = parseInt(pool.pid)
      let tempToken = {decimals: 18};
      

      if(this.getWalletType() == 'metamask'){
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(masterChef, abi, signer);
      const tx = await contract.deposit(pid, amount).catch(err => {
        var message;
        if(!err.data?.message){
          message = err.message
        }else{
          message = err.data.message
        }
        toastMe('error', {
          title: 'Error :',
          msg: message,
          link: false
        })
        return
      })
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Stake request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, masterChef);
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 3000000
          };
        var tx = await contract.methods.deposit(pid, amount.toString()).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
            await this.UpdateState()

    },
    //----------------------------------------Liquidity--------------------------------------
    removeLiquidityParse: async function(token0, token1, amount0, slippage){
      if(token0.Symbol == 'ONE'){
        await this.removeLiquidityETH(token1, amount0)
      }
      if(token1.Symbol == 'ONE'){
        await this.removeLiquidityETH(token0, amount0)
      }
      if(token1.Symbol != 'ONE' && token0.Symbol != 'ONE'){
        await this.removeLiquidityToken(token0, token1, amount0);
      }
    },
    removeLiquidityETH: async function(token0, amount){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      let tempToken = {decimals: 18};
      let deadline = this.getDeadline();
      amount = this.getUnits(amount, tempToken)
      const address = this.getUserAddress()
      ;
      const abi = IUniswapV2Router02.abi;

      if(this.getWalletType() == 'metamask'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.UNIROUTERV2(this.getChainID()), abi, signer);
      let tx = await contract.removeLiquidityETH(
        token0.oneZeroxAddress,
        amount,
        '10',
        '10', 
        address,
        deadline
      ).catch(err => {
        this.setBtnState({remove: 'remove'})

        var message;
        if(!err.data?.message){
          message = err.message
        }else{
          message = err.data.message
        }
        toastMe('error', {
          title: 'Error :',
          msg: message,
          link: false
        })
        
        return
      })
    if(tx !== undefined){
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Remove Liquidity request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })

      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      }) 
      this.setBtnState({remove: 'removed'})
    }
    }
    if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2(this.getChainID()));
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 3000000
          };
        var tx = await contract.methods.removeLiquidityETH(
                token0.oneZeroxAddress,
                amount.toString(),
                '10',
                '10', 
                address,
                deadline
              ).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          this.setBtnState({remove: 'removed'})
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
      await this.UpdateState()


    },
    removeLiquidityToken: async function(token0, token1, amount){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const address = this.getUserAddress()
      ;
      const abi = IUniswapV2Router02.abi;
      let tempToken = {decimals: 18};
      amount = this.getUnits(amount, tempToken)
      let deadline = this.getDeadline();


      if(this.getWalletType() == 'metamask'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.UNIROUTERV2(this.getChainID()), abi, signer);
      let tx = await contract
      .removeLiquidity(
        token0.oneZeroxAddress,
        token1.oneZeroxAddress,
        amount,
        '10',
        '10',
        address,
        deadline).catch(err => {

          var message;
          if(!err.data?.message){
            message = err.message
          }else{
            message = err.data.message
          }
          toastMe('error', {
            title: 'Error :',
            msg: message,
            link: false
          })
          this.setBtnState({remove: 'remove'})
          return
        })
        console.log(tx)
        if(tx != undefined){
        let explorer = 'https://explorer.harmony.one/#/tx/'
        let transaction = tx.hash
  
        toastMe('info', {
          title: 'Transaction Sent',
          msg: "Remove liquidity request sent to network. Waiting for confirmation",
          link: false,
          href: `${explorer}${transaction}`
        })
        await tx.wait(1)
        toastMe('success', {
          title: 'Tx Successful',
          msg: "Explore : " + transaction,
          link: true,
          href: `${explorer}${transaction}`
        })
        this.setBtnState({remove: 'removed'})
      }
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2(this.getChainID()));
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 3000000
          };
        var tx = await contract.methods.removeLiquidity(
        token0.oneZeroxAddress,
        token1.oneZeroxAddress,
        amount.toString(),
        '10',
        '10',
        address,
        deadline).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          let transaction = tx.transaction.id
          this.setBtnState({remove: 'removed'})
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
            await this.UpdateState()

    },

    addLiquidityParse: async function(token0, token1, amount0, amount1, slippage){
      if(token0.Symbol == 'ONE'){
       await this.addLiquidityETH(token0, token1, amount0, amount1, slippage)
      }
      if(token1.Symbol == 'ONE'){
        await this.addLiquidityETH(token1, token0, amount1,  amount0, slippage)
      }
      if(token1.Symbol != 'ONE' && token0.Symbol != 'ONE'){
        await this.addLiquidityToken(token0, token1, amount0, amount1, slippage);
      }
    },


    addLiquidityETH: async function(token0, token1, amount0, amount1, slippage){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      let amountA = this.getUnits(amount0, token0)
      let valueOveride = {value: amountA}
      const address = this.getUserAddress()
      ;
      const abi = IUniswapV2Router02.abi;
      let amountB = this.getUnits(amount1, token1)
      let amountAmin = await this.calculateSlippage(amountA, '90');
      let amountBmin = await this.calculateSlippage(amountB, '90')
      let deadline = this.getDeadline();

      if(this.getWalletType() == 'metamask'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.UNIROUTERV2(this.getChainID()), abi, signer);
      

      const tx = await contract
          .addLiquidityETH(
            token1.oneZeroxAddress,
            amountB,
            amountAmin,
            amountBmin,
            address,
            deadline,
            valueOveride
          ).catch(err => {

            var message;
            if(!err.data?.message){
              message = err.message
            }else{
              message = err.data.message
            }
            toastMe('error', {
              title: 'Error :',
              msg: message,
              link: false
            })
            this.setBtnState({add: 'add'})
            return
          })
      if(tx != undefined){
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Collect request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      this.setBtnState({add: 'added'})
      }
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2(this.getChainID()));
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 3000000,
          value: amountA.toString()
          };
        var tx = await contract.methods.addLiquidityETH(
            token1.oneZeroxAddress,
            amountB.toString(),
            amountAmin.toString(),
            amountBmin.toString(),
            address,
            deadline).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          this.setBtnState({add: 'added'})
          let transaction = tx.transaction.id
          this.setBtnState({remove: 'removed'})
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
            await this.UpdateState()

    },
    addLiquidityToken: async function(token0, token1, amount0, amount1, slippage){
      let isDefaultWallet = this.checkSignedIn()
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const address = this.getUserAddress()
      ;
      const abi = IUniswapV2Router02.abi;
      let amountA = this.getUnits(amount0, token0)
      let amountB = this.getUnits(amount1, token1)
      let amountAmin = await this.calculateSlippage(amountA, '90');
      let amountBmin = await this.calculateSlippage(amountB, '90');
      let deadline = this.getDeadline();
      if(this.getWalletType() == 'metamask'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.UNIROUTERV2(this.getChainID()), abi, signer);
      const tx = await contract
        .addLiquidity(
          token0.oneZeroxAddress,
          token1.oneZeroxAddress,
          amountA,
          amountB,
          amountAmin,
          amountBmin,
          address,
          deadline
        ).catch(err => {

          var message;
          if(!err.data?.message){
            message = err.message
          }else{
            message = err.data.message
          }
          toastMe('error', {
            title: 'Error :',
            msg: message,
            link: false
          })
          this.setBtnState({add: 'add'})
          return
        })
      if(tx !== undefined){
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Collect request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      this.setBtnState({add: 'added'})
      }
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.UNIROUTERV2(this.getChainID()));
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 3000000
          };
        var tx = await contract.methods.addLiquidity(
          token0.oneZeroxAddress,
          token1.oneZeroxAddress,
          amountA.toString(),
          amountB.toString(),
          amountAmin.toString(),
          amountBmin.toString(),
          address,
          deadline).send(options)
        if(tx.transaction.txStatus == 'CONFIRMED'){
          this.setBtnState({add: 'added'})
          let transaction = tx.transaction.id
          this.setBtnState({remove: 'removed'})
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }
          await this.UpdateState()

    },
    approveV1: async function(token){
      await this.approveSpending(token, this.OPENSWAPBRIDGE(this.getChainID()));
    },
    migrateV2: async function(amountIn){
      let amount = this.getUnitsD(amountIn, 18)
      let isDefaultWallet = this.checkSignedIn();
      const abi = OpenSwapBridge.abi;
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const address = this.getUserAddress()
      ;
      if(this.getWalletType() == "metamask"){
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(this.OPENSWAPBRIDGE(this.getChainID()), abi, signer);
      const tx = await contract.convert(amount).catch(err => {
          var message;
          if(!err.data?.message){
            message = err.message
          }else{
            message = err.data.message
          }
          toastMe('error', {
            title: 'Error :',
            msg: message,
            link: false
          })
          this.setBtnState({add: 'add'})
          return
        })
      if(tx !== undefined){
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Collect request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      }
      
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, this.OPENSWAPBRIDGE(this.getChainID()));
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 3000000
          };
        var tx1 = await contract.methods.convert(amount.toString()).send(options)
        if(tx1.transaction.txStatus == 'CONFIRMED'){
          this.setBtnState({add: 'added'})
          let transaction = tx1.transaction.id
          this.setBtnState({remove: 'removed'})
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }

    },
    calculateSlippage: async function(amount, slippage) {
      slippage = ethers.BigNumber.from(String(parseFloat(slippage) * 10));
      const divider = ethers.BigNumber.from("1000");

      const value = amount.div(divider).mul(slippage);
      const value2 = amount.sub(value);
      return value2;
    },//21.6186
    setValRewardTo: async function(addr, index){
      let isDefaultWallet = this.checkSignedIn();
      const abi = MultiTransfer.abi;
      const contracts = this.getValContracts(this.getChainID())
      const delContractAddr = contracts[index].valv4;
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const address = this.getUserAddress()
      ;
      if(this.getWalletType() == "metamask"){
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
 
      const contract = new ethers.Contract(delContractAddr, abi, signer);
      const tx = await contract.setToAddress(addr).catch(err => {
          var message;
          if(!err.data?.message){
            message = err.message
          }else{
            message = err.data.message
          }
          toastMe('error', {
            title: 'Error :',
            msg: message,
            link: false
          })
          this.setBtnState({add: 'add'})
          return
        })
      if(tx !== undefined){
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Ratio change request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      }
      
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, delContractAddr);
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 3000000
          };
        var tx1 = await contract.methods.setToAddress(addr).send(options)
        if(tx1.transaction.txStatus == 'CONFIRMED'){
          this.setBtnState({add: 'added'})
          let transaction = tx1.transaction.id
          this.setBtnState({remove: 'removed'})
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }

    },
      setValCompounding: async function(id, active, index){
      let isDefaultWallet = this.checkSignedIn();
      const abi = MultiTransfer.abi;
      const contracts = this.getValContracts(this.getChainID())
      const delContractAddr = contracts[index].valv4;
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const address = this.getUserAddress()
      ;
      if(this.getWalletType() == "metamask"){
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
 
      const contract = new ethers.Contract(delContractAddr, abi, signer);
      const tx = await contract.setAutoFarmCompounding(active, id).catch(err => {
          var message;
          if(!err.data?.message){
            message = err.message
          }else{
            message = err.data.message
          }
          toastMe('error', {
            title: 'Error :',
            msg: message,
            link: false
          })
          this.setBtnState({add: 'add'})
          return
        })
      if(tx !== undefined){
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Ratio change request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      }
      
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, delContractAddr);
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 3000000
          };
        var tx1 = await contract.methods.setAutoFarmCompounding(active ,(id).toString()).send(options)
        if(tx1.transaction.txStatus == 'CONFIRMED'){
          this.setBtnState({add: 'added'})
          let transaction = tx1.transaction.id
          this.setBtnState({remove: 'removed'})
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }

    },
    setRatioValidator: async function(amount, index){
      let isDefaultWallet = this.checkSignedIn();
      const abi = DelegatorContract.abi;
      const contracts = this.getValContracts(this.getChainID())
      const delContractAddr = contracts[index].delegateContract;
      if (isDefaultWallet){
        toastMe('error', {
          title: 'ERROR',
          msg: `Not Signed In`,
          link: false,
          href: ''
          })
        return 1
      }
      const address = this.getUserAddress()
      ;
      if(this.getWalletType() == "metamask"){
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
 
      const contract = new ethers.Contract(delContractAddr, abi, signer);
      const tx = await contract.setRatioPercentageOpenswap(amount).catch(err => {
          var message;
          if(!err.data?.message){
            message = err.message
          }else{
            message = err.data.message
          }
          toastMe('error', {
            title: 'Error :',
            msg: message,
            link: false
          })
          this.setBtnState({add: 'add'})
          return
        })
      if(tx !== undefined){
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Ratio change request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      }
      
      }
      if(this.getWalletType() == 'oneWallet'){
        let options = { gasPrice: "0x3B9ACA00" };
        const unattachedContract = hmy.contracts.createContract(abi, delContractAddr);
        let wallet = new oneWallet()
        await wallet.signin()
        let contract = wallet.attachToContract(unattachedContract)
        //const gas = await contract.methods.withdraw(pid, '0').estimateGas(options).catch();
        //console.log(gas)
        options = {
          gasPrice: 30000000000,
          gasLimit: 3000000
          };
        var tx1 = await contract.methods.setRatioPercentageOpenswap((amount).toString()).send(options)
        if(tx1.transaction.txStatus == 'CONFIRMED'){
          this.setBtnState({add: 'added'})
          let transaction = tx1.transaction.id
          this.setBtnState({remove: 'removed'})
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Succesfull',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        }
      }

    },
    unDelegateValidator: async function(amountIn, valAddr, index){
      if(this.getWalletType() == 'metamask'){
      const abi = StakingPrecompiles.abi;
      const user = this.getUserAddress()

      const contracts = this.getValContracts(this.getChainID())
      const delContractAddr = contracts[index].precompiles
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
 
      const contract = new ethers.Contract(delContractAddr, abi, signer);
      const tx = await contract.Undelegate(user, fromBech32(valAddr), this.getUnitsD(amountIn, 18)).catch(err => {
          var message;
          if(!err.data?.message){
            message = err.message
          }else{
            message = err.data.message
          }
          toastMe('error', {
            title: 'Error :',
            msg: message,
            link: false
          })
          this.setBtnState({add: 'add'})
          return
        })
      if(tx !== undefined){
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Undelegation request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      }
        return
      }
      hmy.stakings.setTxParams({
        gasLimit: 25000,
        gasPrice: numberToHex(new hmy.utils.Unit('30').asGwei().toWei()),
        chainId: 1
      });
      const delegate = hmy.stakings.undelegate({
        delegatorAddress: toBech32(this.getUserAddress()
          ),
        validatorAddress: valAddr,
        amount: numberToHex(new hmy.utils.Unit(amountIn).asOne().toWei())
      });
      const delegateStakingTx = delegate.build();
      const explorer = 'https://explorer.harmony.one/#/tx/'
      let wallet = new oneWallet()
        await wallet.signin()
        await wallet.signStakingTxn(delegateStakingTx).then(signedTxn => {
          if(signedTxn[0].txStatus == 'REJECTED'){
            toastMe('error', {
            title: 'Tx Failed',
            msg: signedTxn[1],
            link: false,
            href: ""
            })
            return
          }
          let transaction =  signedTxn[0].id
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Success',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        });
    },
    delegateValidator: async function(amountIn, valAddr, index){
      if(this.getWalletType() == 'metamask'){
      const user = this.getUserAddress()

      const abi = StakingPrecompiles.abi;
      const contracts = this.getValContracts(this.getChainID())
      const delContractAddr = contracts[index].precompiles

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
 
      const contract = new ethers.Contract(delContractAddr, abi, signer);
      console.log(abi)
      const tx = await contract.Delegate(user, fromBech32(valAddr), this.getUnitsD(amountIn, 18)).catch(err => {
          var message;
          if(!err.data?.message){
            message = err.message
          }else{
            message = err.data.message
          }
          toastMe('error', {
            title: 'Error :',
            msg: message,
            link: false
          })
          this.setBtnState({add: 'add'})
          return
        })
      if(tx !== undefined){
      let explorer = 'https://explorer.harmony.one/#/tx/'
      let transaction = tx.hash

      toastMe('info', {
        title: 'Transaction Sent',
        msg: "Undelegation request sent to network. Waiting for confirmation",
        link: false,
        href: `${explorer}${transaction}`
      })
      await tx.wait(1)
      toastMe('success', {
        title: 'Tx Successful',
        msg: "Explore : " + transaction,
        link: true,
        href: `${explorer}${transaction}`
      })
      }
        return
      
      }
      hmy.stakings.setTxParams({
        gasLimit: 25000,
        gasPrice: numberToHex(new hmy.utils.Unit('30').asGwei().toWei()),
        chainId: 1
      });
      const delegate = hmy.stakings.delegate({
        delegatorAddress: toBech32(this.getUserAddress()
          ),
        validatorAddress: valAddr,
        amount: numberToHex(new hmy.utils.Unit(amountIn).asOne().toWei())
      });
      const delegateStakingTx = delegate.build();
      const explorer = 'https://explorer.harmony.one/#/tx/'
      let wallet = new oneWallet()
        await wallet.signin()
        await wallet.signStakingTxn(delegateStakingTx).then(signedTxn => {
          if(signedTxn[0].txStatus == 'REJECTED'){
            toastMe('error', {
            title: 'Tx Failed',
            msg: signedTxn[1],
            link: false,
            href: ""
            })
            return
          }
          let transaction =  signedTxn[0].id
          let explorer = 'https://explorer.harmony.one/#/tx/'
           toastMe('success', {
            title: 'Tx Success',
            msg: "Explore : " + transaction,
            link: true,
            href: `${explorer}${transaction}`
          })
        });
    },
    delegateValidatorMetamaskTestingStuff: async function(amountIn, valAddr){
        hmy.stakings.setTxParams({
        gasLimit: 25000,
        gasPrice: numberToHex(new hmy.utils.Unit('30').asGwei().toWei()),
        chainId: 1
      });
      const delegate = hmy.stakings.delegate({
        delegatorAddress: toBech32(this.getUserAddress()
          ),
        validatorAddress: valAddr,
        amount: numberToHex(new hmy.utils.Unit(amountIn).asOne().toWei())
      });
      const delegateStakingTx = delegate.build();
      console.log(delegateStakingTx)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider)
      console.log(delegateStakingTx)
      const [encoded, raw] = delegateStakingTx.encode()
      console.log(encoded)
      console.log(raw)
      const signer = provider.getSigner();
      let TX = await signer.signMessage(raw)
      console.log(TX)
     TX =  await signer.sendTransaction(TX)
      console.log(TX)
      if(this.getWalletType == 'metamask'){

      }
    },

    //----------------------------------------Utils------------------------------------------
    getDeadline: function(){
      var deadline = new Date();
      deadline = parseInt(deadline / 1000) + 480;
      return deadline;
    },
    checkSignedIn: function(){
      if(this.getUserAddress()
       == '0x0000000000000000000000000000000000000011'){
        return true
      }else{
        return false;
      }
    },
    getStakeWeight: function(staked, totalStaked) {
      if (staked != 0) {
        var poolWeight = ((staked / totalStaked) * 100).toFixed(4);
      } else {
        var poolWeight = 0;
      }
      return poolWeight
    },
    isStablecoin: function(tokenAddress){
      var stablecoins = [
      this.bBUSD(this.getChainID()), //bBUSD
       // "0x9A89d0e1b051640C6704Dde4dF881f73ADFEf39a", //bUSDT
       this.bUSDC(this.getChainID()),, //bUSDC
       // "0xE176EBE47d621b984a73036B9DA5d834411ef734", //eBUSD
       this.eUSDC(this.getChainID()), //eUSDC
       // "0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f", //eUSDT
       this.eBUSD(this.getChainID()),
      ]
      for(let i in stablecoins){
        if(stablecoins[i] == tokenAddress){
          return true;
        }
      }
      return false;
    },
    getAmountOutWithSlippage: async function(amount, bestRoute, slippageRate, token1, token2){

      let parsedAmount = this.getUnits(amount, token1);
      let Token0 = await Fetcher.fetchTokenData(
        this.getChainID(),
        token1.oneZeroxAddress
        )
      const trade = new Trade(
        bestRoute.route,
        new TokenAmount(Token0, parsedAmount),
        TradeType.EXACT_INPUT
      );

      let slippageTolerence = new Percent(String(parseFloat(slippageRate)*10), "1000");
      let amountOut = trade
                      .minimumAmountOut(slippageTolerence)
                      .toFixed(parseFloat(token2.decimals));
      
      return amountOut;

    },
    getAmountInWithSlippage: async function(amount, bestRoute, token1, token2){

      let parsedAmount = this.getUnits(amount, token1);
      const provider = this.getProvider(true)
      const address = this.getUserAddress()
      ;
      let path = this.getPath(bestRoute)
      const abi = IUniswapV2Router02.abi;
      const contract = new ethers.Contract(this.UNIROUTERV2(this.getChainID()), abi, provider);
      let allowance = await contract.getAmountsIn(parsedAmount, path)
      let amountIn = this.getFormatedUnits(allowance[0].toString(), token2)
      return amountIn;


    },
    getBN: function(amount){
      const bn = ethers.BigNumber.from(amount);
      return bn
    },
    getEthers: function(amount) {
      let parsedEthers = ethers.utils.parseEther(amount);
      return parsedEthers;
    },
    getUnits: function(amount, token){
      let parsedunits = ethers.utils.parseUnits(amount, token.decimals);
      return parsedunits;
    },
    getUnitsD: function(amount, decimals){
      let parsedunits = ethers.utils.parseUnits(String(amount), decimals);
      return parsedunits;
    },
    getFormatedUnits: function(amount, token){
      let parsedunits = ethers.utils.formatUnits(amount, token.decimals);
      return parsedunits;
    },
    getFormatedUnitsDecimals: function(amount, decimals){
      let parsedunits = ethers.utils.formatUnits(amount, decimals);
      return parsedunits;
    },
    getEthUnits: function(amount){
      let parsedunits = ethers.utils.formatEther(amount);
      return parsedunits;
    },
    getBurnAndTotalSupply: async function() {
      
      const oSWAPToken = this.oSWAPTOKEN(this.getChainID());
      const burnAddress = "0xdEad000000000000000000000000000000000000";

      const abi = OpenSwapToken.abi
      
      const provider = this.getProvider()
      const contract = new ethers.Contract(oSWAPToken, abi, provider);

      //Get Burned Balance
      let burnBalance = await contract.burnCount();
      let burnBalanceUnformated = ethers.utils.formatUnits(burnBalance.toString()).toString();
      let burnBalanceFormated = (burnBalanceUnformated / 1).toFixed(2);


       //Get Total Supply
       let totalSupply = await contract.totalSupply();

       let circSupply = totalSupply
       circSupply = circSupply.sub(burnBalance);
     
       circSupply = ethers.utils.formatUnits(circSupply.toString()).toString();
       let circSupplyFormated = (circSupply / 1).toFixed(2);

       totalSupply = ethers.utils.formatUnits(totalSupply.toString()).toString();
       totalSupply = (totalSupply / 1).toFixed(2);
       //let devLock = parseFloat(ethers.utils.formatUnits(lockedBalance.toString()).toString()).toFixed(2);

       return {
         circSupply: circSupplyFormated,
         totalSupply: totalSupply,
         burnedAmount: burnBalanceFormated
       }

    }
  }
};