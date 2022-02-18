<template>
  <div id="calculator" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center oswap-layout xl:px-0 px-3 text-gray-500 pb-16" style="margin-top: 98px">
    <div  class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3 w-full">
      <div v-if="this.getFarms() != null" v-for="(pair, idx) in this.getFarms()" :key="idx" class="flex flex-none flex-col cols-3 h-a p-3 st5 st5-all group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray border-l border-oswapGreen rounded-3xl space-y-2">
       
        <div class="flex flex-none justify-center items-center space-x-2">
            <div class="flex flex-row -space-x-2">
              <img :src="pair.imgtoken0" class="dark:bg-slightGray bg-oswapDark-gray p-1 w-10 h-10 rounded-full" />
              <img :src="pair.imgtoken1" class="dark:bg-slightGray bg-oswapDark-gray p-1 w-10 h-10 rounded-full"  />
            </div>
            <span class="text-base text-oswapBlue-light dark:text-oswapGreen-light">{{pair.pair}}</span>
        </div>

        <div class="flex flex-none justify-center items-center">
          <CalculateTokensLp v-on:calculate="loadRewards(pair, $event)" @amountInput="amountInput" :pair='pair' />
        </div>
        <div class="flex flex-none">   
          <Rewards 
          :loaded="loaded[pair.pid]?.loaded" 
          :daily="loaded[pair.pid]?.daily?.toFixed(2)" 
          :weekly="loaded[pair.pid]?.weekly?.toFixed(2)" 
          :monthly="loaded[pair.pid]?.monthly?.toFixed(2)" 
          :yearly="loaded[pair.pid]?.yearly?.toFixed(2)" 
          />
        </div>
        <div class="flex flex-1 justify-center">
          <Chart v-if="loaded[pair.pid]?.loaded" :amount="usdAmount" :rewardPerWeek="loaded[pair.pid]?.weekly?.toFixed(10)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import openswap from "@/shared/openswap.js";
import { createWatcher } from "@makerdao/multicall";
import CalculateTokensLp from '@/components/utility/CalculateTokensLp'
import Chart from '@/components/utility/Chart'

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
      InputWithValidationLiquidity,
      Chart
   },
  computed: {
    ...mapGetters("addressConstants", ["oSWAPCHEF", "UNIROUTERV2", "hMULTICALL", "hRPC"]),
  },
  methods: {
    ...mapGetters("farm/farmData", ["getFarms"]),
    ...mapGetters("wallet", ["getChainID"]),
    async loadRewards(pair, amounts) {
      try {
        this.loaded[pair.pid] = {};
        this.loading = pair.pid;
        const total = pair.totalStaked
        const lpSupply = pair.lpSupply
        const personalLP = await this.getLpTokens(pair.uniPair, lpSupply, amounts.amount0, pair.decimals[0], amounts.amount1, pair.decimals[1])
       // console.log(totalLP)
        const stakeWeight = ((personalLP.toFixed(10)) / (((parseFloat(this.getEthUnits(total.add(this.getBN(personalLP.raw.toString())))).toFixed(10))))).toFixed(10)
        const rewardsPerWeek = pair.usdPerWeek * stakeWeight
        const weekly = parseFloat(rewardsPerWeek)
        const daily = weekly / 7
        const monthly = parseFloat(rewardsPerWeek * 4.3)
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
    amountInput: function(amount){
      this.usdAmount = amount
    }
  },
  mounted: async function () {
  },
  data() {
    return {
      loading: 0,
      errors: 0,
      token0: '0',
      token1: '0',
      loaded: [],
      usdAmount: 0,
    };
  },
};
</script>