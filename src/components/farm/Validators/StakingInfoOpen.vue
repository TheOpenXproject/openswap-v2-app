<template>
  <transition name="fall" appear disappear>
  <div class="flex flex-wrap xs:w-full lg:w-half">
    <div v-if="validator" class="flex min-w-0 w-full text-gray-400 dark:text-gray-300">
      <div class="flex w-full flex-wrap rounded-lg py-3 px-4 items-center dark:from-slightDark from-slightGray to-transparent rounded-lg border border-oswapGreen">
        <div class="flex w-full bg-gray-200 dark:bg-oswapDark-gray bg-slightGray rounded-lg mb-2">
          <div class="grid grid-cols-3 gap-3 w-full h-auto ss:mt-3 xs:mt-8">
      
                <div class="flex items-center mb-6">
                  <i class="las la-sitemap pl-2 text-lg dark:text-oswapGreen"></i>
                  <p class="text-2xl justify-center pl-2">{{ validator.name }}</p>
                </div>

                <div class="flex flex-col text-gray-400 dark:text-gray-300 mb-3">
                  <p class="text-xl font-extrabold">{{ prettify(validator.totalDelegated) }}</p>
                  <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Total Staked</p>
                </div>

                <div class="flex flex-col text-gray-600 dark:text-gray-200">
                  <p class="text-xl font-extrabold">{{ validator.apr }} %</p>
                  <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Expected Return</p>
                </div>
          </div>
        </div>

        <div class="grid overflow-hidden md:grid-cols-2 sm:grid-cols-1 gap-3.5 w-full">
          <div><ValidatorChart :validator="validator" /></div>
          <div>
             <div class="flex flex-wrap">
          <StakingInfoTabs :validator="validator" />
          <div class="flex w-full">
            <div class="grid w-full xs:grid-cols-2 ss:grid-cols-2 lg:grid-cols-3 gap-2 lg:ml-8 h-auto p-3 bg-gray-200 dark:bg-oswapDark-gray shadow-lg rounded">
              <div class="flex space-x-1">
                <div class="flex items-start h-full"><i class="las la-dollar-sign text-xl text-oswapGreen"></i></div>
                <div class="flex flex-col h-full justify-between">
                  <p class="text-xs text-oswapBlue-light">USD Value Earned</p>
                  <p class="text-lg dark:text-gray-400">$ {{ prettify(this.validator.earnedUsd)}}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden"><img src="https://openfi.dev/tokens/default/ONE.png" class="h-4" alt="" /></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">One Earned</p>
                  <p class="text-lg dark:text-gray-400">{{ prettify(this.validator.earnedOne) }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden"><img src="https://openfi.dev/tokens/default/oSWAP.png" class="h-4" alt="" /></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">OpenX Earned</p>
                  <p class="text-lg dark:text-gray-400">{{ prettify(this.validator.earnedOpenx) }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-coins text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">OpenX Reward Ratio</p>
                  <p class="text-lg dark:text-gray-400">% {{ this.validator.oxratio }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full"><i class="las la-handshake text-xl text-oswapGreen"></i></div>
                <div class="flex flex-col h-full justify-between">
                  <p class="text-xs text-oswapBlue-light">Pending Undelegation</p>
                  <p class="text-lg dark:text-gray-400">{{ prettify(this.validator.pendingUndelegation) }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-dollar-sign text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">One Delegated</p>
                  <p class="text-lg dark:text-gray-400">{{ prettify(this.validator.userDelegations)}}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">APR</p>
                  <p class="text-lg dark:text-gray-400">% {{ this.validator.apr }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">Injected APR</p>
                  <p class="text-lg dark:text-gray-400">% {{ this.validator.injectedAPR }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">Total APR</p>
                  <p class="text-lg dark:text-gray-400">% {{ this.validator.totalAPR }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-dollar-sign text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">Delegated value</p>
                  <p class="text-lg dark:text-gray-400">$ {{ prettify(this.validator.usdValueDelegated)}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Open Details Button -->
          <div class="flex justify-end w-full mt-2">
            <div @click="selectValidator()" class="flex items-center space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 pl-3 cursor-pointer">
              <p class="text-sm text-gray-500 dark:text-oswapBlue-light">close</p>
              <i class="las la-arrow-up text-lg p-2 text-gray-500 dark:text-oswapBlue-light rounded-full bg-gray-100 dark:bg-oswapDark-gray group-hover:bg-oswapGreen dark:group-hover:text-oswapDark-gray group-hover:text-gray-100 border-2 border-gray-200 dark:border-gray-700"></i>
            </div>
          </div>
        </div>
          </div>
      </div>
    
       
      </div>
    </div>
  </div>
</transition>
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
  },
  async mounted() {},
  methods: {
    
    selectValidator: function () {
      this.$emit("selectValidator", null);
    },
    prettify: function(number){
        if(number != "NA"){
          return ethers.utils.commify(String(number))
        }
        else{
          return number
        }
        
      }
  },
};
</script>

<style lang="scss" scoped></style>
