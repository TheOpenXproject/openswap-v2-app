<template>
  <div class="flex flex-wrap w-half mb-4">
    <div v-if="validator" class="flex plex-1 gap-3 min-w-0 w-full text-gray-600 dark:text-gray-300">
      <div class="flex flex-col w-full st5 rounded-2xl bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:from-slightDark hover:from-slightGray py-3 px-4">
        <p class="text-sm mb-2">{{ validator.name }}</p>
        <div class="flex space-x-3">
          <!-- total staked -->
          <div class="flex items-center space-x-2">
            <i class="las la-layer-group text-oswapGreen text-4xl"></i>
            <div class="flex flex-col">
              <p class="text-xs">Total Staked:</p>
              <p class="text-sm text-el">{{ validator.totalDelegated }}</p>
            </div>
          </div>
          <!-- expected return -->
          <div class="flex items-center space-x-2">
            <i class="las la-percent text-oswapGreen text-4xl"></i>
            <div class="flex flex-col">
              <p class="text-xs">Expected Return:</p>
              <p class="text-sm text-el">{{ validator.apr }}%</p>
            </div>
          </div>
        </div>
        <!-- Open Details Button -->
        <div class="flex justify-end h-12 ss:mt-4 xs:mt-4 lg:mt-0">
          <div @click="selectValidator()" class="flex h-9 items-center space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 pl-3 cursor-pointer">
            <p class="text-sm text-gray-500 dark:text-oswapBlue-light">details</p>
            <i class="las la-arrow-down text-lg p-2 text-gray-500 dark:text-oswapBlue-light rounded-full bg-gray-100 dark:bg-oswapDark-gray group-hover:bg-oswapGreen dark:group-hover:text-oswapDark-gray group-hover:text-gray-100 border-2 border-gray-200 dark:border-gray-700"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import openswap from "@/shared/openswap.js";
import { ethers } from "ethers";

export default {
  name: "StakingInfo",
  mixins: [openswap],
  props: {
    validator: Object,
  },
  data() {},
  async mounted() {},
  methods: {
    selectValidator: function () {
      this.$emit("selectValidator", this.validator.address);
    },
  },
};
</script>

<style lang="scss" scoped></style>
