<template>
  <div id="pairs" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center oswap-layout xl:px-0 px-3 text-gray-500 pb-16" style="margin-top: 98px">
    <transition name="fall" appear>
      <div  v-if="loaded" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        <!-- icons table -->
        <div v-for="(pair, idx) in this.Pools" :key="idx" class="flex flex-none flex-col p-3 st5 st5-all group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray border-l border-oswapGreen rounded-3xl">
          <div class="flex flex-1 space-x-2 items-center">
            <div class="relative w-20">
              <i @click="addTokenToMetamask({oneZeroxAddress:pair.pairAddress})" class="z-10 flex las la-plus text-sm p-1 text-oswapGreen absolute -top-8 items-center justify-center bg-slightGray dark:bg-slightDark rounded-full cursor-pointer shadow hover:bg-oswapGreen dark:hover:bg-oswapGreen hover:text-slightGray dark:hover:text-slightDark"></i>
              <div class="absolute top-0 bottom-0 my-auto items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-slightGray dark:border-slightDark">
                <img :src="pair.imgtoken0" class="h-8 w-8">
              </div>
              <!-- Icon token1 -->
              <div class="absolute top-0 bottom-0 my-auto left-8 items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-slightGray dark:border-slightDark">
                <img :src="pair.imgtoken1" class="h-8 w-8">
              </div>
            </div>
            <div class="flex flex-1 flex-col md:space-y-2 lg:space-y-2 space-y-4">
              <p class="text-base text-oswapBlue-light">
                {{ pair.pair }}
              </p>
              <div class="flex space-x-2 h-5 items-center mt-2">
                <i class="las la-tint dark:text-oswapGreen"></i>
                <p class="text-sm font-thin dark:text-gray-400">LP Tokens Available: {{ pair.balance }}</p>
              </div>
              <div class="flex space-x-2 h-5 items-center">
                <i class="las la-coins dark:text-oswapGreen"></i>
                <p class="text-sm font-thin dark:text-gray-400">Staked Tokens: {{ pair.staked }}</p>
              </div>
              <div class="flex space-x-2 h-5 items-center">
                <i class="las la-hand-holding-usd dark:text-oswapGreen"></i>
                <p class="text-sm font-thin dark:text-gray-400">Supply: {{ pair.supply }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex h-full items-center mt-16">
        <svg class="animate-spin h-8 w-8 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </transition>
  </div>
</template>

<script>
import Pair from "@/components/pairs/Pair";
import openswap from "@/shared/openswap.js";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "Pairs",
  mixins: [openswap],
  components: { Pair },
    computed: {
    ...mapGetters("addressConstants", ["oSWAPCHEF", "UNIROUTERV2", "hMULTICALL"]),
  },
  methods: {
    ...mapActions('pairs', ['setPairs']),
    ...mapGetters("pairs", ["getPairs"]),
    ...mapGetters("wallet", ["getUserSignedIn", "getChainID"]),
  },
  mounted: async function () {
    let timeout;
    if (this.getUserSignedIn()) {
      timeout = 1;
    } else {
      timeout = 1000;
    }
    await setTimeout(
      async function () {
        const MULTICALL = this.hMULTICALL(this.getChainID());
        const MASTERCHEF = this.oSWAPCHEF(this.getChainID());
        await this.setPairs({
          provider:this.getProvider(this.getChainID()), 
          multicallAddress:MULTICALL,
          masterchef: MASTERCHEF
        })
        this.Pools = this.getPairs();
        this.loaded = true
      }.bind(this),
      timeout
    );
  },
  data() {
    return {
      Pools: [],
      loaded: false
    };
  },
};
</script>
