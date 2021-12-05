<template>
  <div class="flex flex-wrap xs:w-full lg:w-half transition-all">
    <div v-if="validator" class="flex min-w-0 w-full text-gray-400 dark:text-gray-300">
      <div class="flex w-full flex-wrap rounded-2xl bg-gradient-to-light dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray py-3 px-4 items-center">
        <div class="flex ss:w-full xs:w-full lg:w-6/12">
          <ValidatorChart :validator="validator" />
        </div>
        <div class="flex flex-wrap ss:w-full xs:w-full lg:w-6/12">
          <StakingInfoTabs :validator="validator" />
          <div class="flex w-full">
            <div class="grid w-full xs:grid-cols-2 ss:grid-cols-2 lg:grid-cols-3 gap-2 lg:ml-8 h-full p-3 bg-gray-200 dark:bg-oswapDark-gray shadow-lg rounded">
              <div class="flex h-12 space-x-1">
                <div class="flex items-start h-full"><i class="las la-handshake text-xl text-oswapGreen"></i></div>
                <div class="flex flex-col h-full justify-between">
                  <p class="text-xs text-oswapBlue-light">Pending Undelegation</p>
                  <p class="text-lg dark:text-gray-400">{{ this.pendingUndelegation }}</p>
                </div>
              </div>
              <div class="flex h-12 space-x-1">
                <div class="flex items-start h-full"><i class="las la-dollar-sign text-xl text-oswapGreen"></i></div>
                <div class="flex flex-col h-full justify-between">
                  <p class="text-xs text-oswapBlue-light">USD Value Earned</p>
                  <p class="text-lg dark:text-gray-400">data</p>
                </div>
              </div>
              <div class="flex h-12 space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden"><img src="https://openfi.dev/tokens/default/ONE.png" class="h-4" alt="" /></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">One Earned</p>
                  <p class="text-lg dark:text-gray-400">{{ this.totalOneRewarded }}</p>
                </div>
              </div>
              <div class="flex h-12 space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden"><img src="https://openfi.dev/tokens/default/oSWAP.png" class="h-4" alt="" /></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">OpenX Earned</p>
                  <p class="text-lg dark:text-gray-400">{{ this.totalOpenXrewarded }}</p>
                </div>
              </div>
              <div class="flex h-12 space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-coins text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">Token Reward Ratio</p>
                  <p class="text-lg dark:text-gray-400">{{ this.totalOneRewarded / this.totalOpenXrewarded }}</p>
                </div>
              </div>
              <div class="flex h-12 space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">APR</p>
                  <p class="text-lg dark:text-gray-400">{{ this.totalApr }}</p>
                </div>
              </div>
              <div class="flex h-12 space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">Injected APR</p>
                  <p class="text-lg dark:text-gray-400">{{ this.injectedApr }}</p>
                </div>
              </div>
              <div class="flex h-12 space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-dollar-sign text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">Total Staked</p>
                  <p class="text-lg dark:text-gray-400">data</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Open Details Button -->
          <div class="flex justify-end w-full mt-2">
            <div @click="selectValidator()" class="flex h-9 items-center space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 pl-3 cursor-pointer">
              <p class="text-sm text-gray-500 dark:text-oswapBlue-light">close</p>
              <i class="las la-arrow-down text-lg p-2 text-gray-500 dark:text-oswapBlue-light rounded-full bg-gray-100 dark:bg-oswapDark-gray group-hover:bg-oswapGreen dark:group-hover:text-oswapDark-gray group-hover:text-gray-100 border-2 border-gray-200 dark:border-gray-700"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import openswap from "@/shared/openswap.js";
import ValidatorChart from "@/components/farm/Validators/ValidatorChart";
import StakingInfoTabs from "@/components/farm/Validators/StakingInfoTabs";

import { ethers } from "ethers";

export default {
  name: "StakingInfo",
  mixins: [openswap],
  components: {
    ValidatorChart,
    StakingInfoTabs,
  },
  props: {
    validator: Object,
  },
  data() {
    return {
      defaultApr: 10,
      injectedApr: 5,
      totalApr: 15,
      delegated: 10000,
      pendingUndelegation: 200,
      totalUSDRewarded: 58.5,
      totalOneRewarded: 150.0,
      totalOpenXrewarded: 50.0,
      rewardRatioOpenxOne: 30,
    };
  },
  async mounted() {},
  methods: {
    selectValidator: function () {
      this.$emit("selectValidator", null);
    },
  },
};
</script>

<style lang="scss" scoped></style>
