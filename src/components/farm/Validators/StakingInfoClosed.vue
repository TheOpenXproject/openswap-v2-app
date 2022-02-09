<template>
  <transition name="fall" appear>
  <div v-if="validator" class="flex grid lg:grid-cols-5 lg:grid-rows-1 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-5 md:grid-rows-1 mb-1 pl-4 py-2 dark:from-slightDark items-center from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray rounded-lg border-l border-oswapGreen" >
    <div class="text-oswapBlue-light xs:pb-3">{{ validator.name }}</div>
    <div class="rounded-md align-middle xl:visible ">
      <div class="flex items-center align-middle space-x-4">
        <i class="las la-layer-group text-oswapGreen text-4xl"></i>
        <div class="flex flex-col">
          <p class="text-sm text-oswapBlue-light ">Total Staked:</p>
          <p class="text-sm text-el">{{ prettify(validator.totalDelegated) }}</p>
        </div>
      </div>
    </div>

    <div class="rounded-md align-middle sm-pt-2">
      <div class="flex items-center align-middle space-x-4">
        <i class="las la-layer-group text-oswapGreen text-4xl"></i>
        <div class="flex flex-col">
          <p class="text-sm text-oswapBlue-light">Staked:</p>
          <p class="text-sm text-el">{{ prettify(validator.userDelegations) }}</p>
        </div>
      </div>
    </div>


    <div class="rounded-md align-middle xl:visible sm-pt-2">
      <div class="flex items-center align-middle space-x-4">
        <i class="las la-percent text-oswapGreen text-4xl"></i>
        <div class="flex flex-col">
          <p class="text-xs">Expected Return:</p>
          <p class="text-sm text-el">{{ validator.apr }}%</p>
        </div>
      </div>
    </div>

     <div class="flex justify-end mt-2">
            <div @click="selectValidator()" class="flex items-center space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 pl-3 cursor-pointer">
              <p class="text-sm text-gray-500 dark:text-oswapBlue-light">Details</p>
              <i class="las la-arrow-down text-lg p-2 text-gray-500 dark:text-oswapBlue-light rounded-full bg-gray-100 dark:bg-oswapDark-gray group-hover:bg-oswapGreen dark:group-hover:text-oswapDark-gray group-hover:text-gray-100 border-2 border-gray-200 dark:border-gray-700"></i>
            </div>
          </div>



  </div>
</transition>
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
      prettify: function(number){
        return ethers.utils.commify(number)
      },
    },
  };
</script>

<style lang="scss" scoped></style>
