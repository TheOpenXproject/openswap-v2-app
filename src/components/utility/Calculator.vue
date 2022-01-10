<template>
  <div id="calculator" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center oswap-layout xl:px-0 px-3 text-gray-500 pb-16" style="margin-top: 98px">
      <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        <div v-for="(pair, idx) in this.Pools" :key="idx" class="flex flex-none flex-col h-a p-3 st5 st5-all group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray border-l border-oswapGreen rounded-3xl">
          <div class="flex flex-none space-x-2 items-center">
            <div class="relative w-20">
              <div class="absolute top-0 bottom-0 my-auto items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-slightGray dark:border-slightDark">
                <img :src="pair.imgtoken0" class="h-8 w-8">
              </div>
              <div class="absolute top-0 bottom-0 my-auto left-8 items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-slightGray dark:border-slightDark">
                <img :src="pair.imgtoken1" class="h-8 w-8">
              </div>
            </div>
            <div class="flex flex-1 flex-col md:space-y-2 lg:space-y-2 space-y-4">
                <span>{{pair.pair}}</span>
                <CalculateTokensLp v-on:calculate="loadRewards(pair, $event)" :pair='pair' />
            </div>
          </div>
          <div class="flex flex-none items-center justify-center mt-6 pl-24" v-if="loading === pair.pid || loaded[pair.pid]?.loaded">
            <Rewards 
              :loaded="loaded[pair.pid]?.loaded" 
              :daily="loaded[pair.pid]?.daily?.toFixed(2)" 
              :weekly="loaded[pair.pid]?.weekly?.toFixed(2)" 
              :monthly="loaded[pair.pid]?.monthly?.toFixed(2)" 
              :yearly="loaded[pair.pid]?.yearly?.toFixed(2)" 
            />
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import openswap from "@/shared/openswap.js";
import { createWatcher } from "@makerdao/multicall";
import CalculateTokensLp from '@/components/utility/CalculateTokensLp'
import Rewards from '@/components/utility/Rewards'
import InputWithValidationLiquidity from '@/components/InputWithValidationLiquidity';
import { mapGetters } from "vuex";
const { pools } = require("@/store/modules/farm/pools.js");
export default {
  name: "Calculator",
  mixins: [openswap],
  components: { 
      CalculateTokensLp,
      Rewards,
      InputWithValidationLiquidity
   },
  computed: {
    ...mapGetters("addressConstants", ["oSWAPCHEF", "UNIROUTERV2", "hMULTICALL", "hRPC"]),
  },
  methods: {
    ...mapGetters("wallet", ["getChainID"]),
    async loadRewards(pair, amounts) {
      try {
        this.loaded[pair.pid] = {};
        this.loading = pair.pid;
        const total = await this.getLpStaked(pair.pairaddress)
        const totalLP = await this.getLpTokens(amounts.pair, total.supply, amounts.amount0, pair.decimals[0], amounts.amount1, pair.decimals[1])
        const stakeWeight = (totalLP.toFixed(3) / parseFloat(this.getEthUnits(total.staked)).toFixed(3) * 100).toFixed(15)
        let rewards = await this.getRewardValue(pair, stakeWeight);
        const weekly = parseFloat(rewards[0])
        const daily = weekly / 7
        const monthly = parseFloat(rewards[1])
        const yearly = monthly * 12
        this.loaded[pair.pid] = {
            loaded: true,
            daily,
            weekly,
            monthly,
            yearly
        }
      } catch (error) {
        console.log(error)
          setTimeout(async () => {
            this.errors++
            if (this.errors <= 3) {
              await this.loadRewards(pair, amounts);
            }
          }, 1000); // 1 sec delay
      }
    },
    async getLpStaked(poolAddress) {
        const MULTICALL = this.hMULTICALL(this.getChainID());
        const RPC = this.hRPC(this.getChainID());
         const MASTERCHEF = this.oSWAPCHEF(this.getChainID());
        const CALL =  [{
          target: poolAddress,
          call: ["totalSupply()(uint256)"],
          returns: [["supply", (val) => val]],
        },{
          target: poolAddress,
          call: ["balanceOf(address)(uint256)", MASTERCHEF],
          returns: [["staked" , (val) => val]],
        }]
        let totalStaked = {};
        const config = {
            rpcUrl: RPC,
            multicallAddress: MULTICALL,
        };

        const watcher = createWatcher(CALL, config);
        watcher.subscribe((update) => {
            totalStaked[update.type] = update.value
        });
        watcher.start();
        await watcher.awaitInitialFetch();
        watcher.stop();
        return totalStaked;
    }
  },
  mounted: async function () {
      this.Pools = pools[this.getChainID()].pools;
      await this.getTokenPrices();
  },
  data() {
    return {
      Pools: [],
      loading: 0,
      errors: 0,
      token0: '0',
      token1: '0',
      loaded: []
    };
  },
};
</script>