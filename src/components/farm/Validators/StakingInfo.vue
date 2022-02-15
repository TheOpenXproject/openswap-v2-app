<template>
 <transition name="fall" appear>
      <div>
        <center>
        <div v-if="farmloaded && !loaded" class="items-center">
        <svg class="animate-spin h-8 w-8 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

      </div>
      </center>

      <div class="grid overflow-hidden grid-cols-1 grid-rows-1 gap-3.5 w-full items-center mb-4">
        <div v-if="this.getFarms() != null" v-for="(validator, index) in this.getValidatorData()"  class="w-full ">
          <StakingInfoClosed class="flex w-full my-4 pl-4 dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray " :validator="validator"  v-if="this.selectedValidator != validator.address" @selectValidator="selectValidator" />
          <StakingInfoOpen v-if="this.selectedValidator == validator.address" :validator="validator" @selectValidator="selectValidator" class="w-full pl-4 my-4 dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray " />
        </div>
       </div>
       </div>
   </transition>
</template>

<script>
import openswap from "@/shared/openswap.js";
import { ethers } from "ethers";
import StakingInfoOpen from "@/components/farm/Validators/StakingInfoOpen";
import StakingInfoClosed from "@/components/farm/Validators/StakingInfoClosed";
import { createWatcher } from "@makerdao/multicall";

import { mapGetters, mapActions } from "vuex";

import delegateContract from "./delegateContract.json"
export default {
  name: "StakingInfo",
  mixins: [openswap],
  components: {
    StakingInfoClosed,
    StakingInfoOpen,
  },
  props: {
  },
  computed: {
    ...mapGetters("addressConstants", ["hMULTICALL", "hRPC", "oSWAPCHEF", 'getValContracts']),
  },
  data() {
    return {
      loaded: false,
      validators: [],
      selectedValidator: null,
      validatorAddresses: {
        0: "one1p2e0a0806jv8tqr37k7c8k67zgfjwtzpf9apv2",
        1: "one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0",

      }
    }
  },
  async mounted() {
      
    //await this.updateValData()
    
  },
  methods: {
        ...mapGetters('farm/farmData', ['getStateOpenXPrice', 'getStateOnePrice','getFarms', 'getValidatorData']),

    selectValidator: function (val) {
      console.log(val);
      this.selectedValidator = val;
    },

    prettify: function (number) {
      return ethers.utils.commify(number);
    }
  }

};
</script>

<style lang="scss" scoped>
  .titanic{
    float: none;
  }
</style>
