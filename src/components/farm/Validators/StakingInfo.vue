<template>
 <transition name="fall" appear>
      <div>
        <center>
        <div v-if="farmloaded && !loaded" class="items-center">
          <Loading/>

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
import Loading from '@/components/Loading'
import { mapGetters, mapActions } from "vuex";

import delegateContract from "./delegateContract.json"
export default {
  name: "StakingInfo",
  mixins: [openswap],
  components: {
    StakingInfoClosed,
    StakingInfoOpen,
    Loading
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
