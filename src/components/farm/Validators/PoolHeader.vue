<template>
  <div class="flex justify-between items-center">
    <!-- Header left side -->
    <div class="relative flex h-12 items-center">
      <!-- Icon token0 -->
      <div class="absolute items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-slightGray dark:border-slightDark">
        <img :src="pool.imgtoken0" class="h-8 w-8">
      </div>
      <!-- Icon token1 -->
      <div class="absolute left-8 items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-slightGray dark:border-slightDark">
        <img :src="pool.imgtoken1" class="h-8 w-8">
      </div>
      <!-- Pair Title -->
      <div class="absolute left-20 pl-2 items-center justify-center flex h-12 space-x-2">
        <p class="text-xs text-oswapBlue-light">{{pool.pair}}</p>
        <tooltip-me>
          <i class="las la-exclamation-circle text-xl transform rotate-180 hover:text-oswapGreen"></i>
          <tooltip-me-content :options="tooltip"
            class="flex ss:w-64 xs:w-80 rounded-lg shadow-xl p-0.5"
          >
            <div class="flex w-full space-x-2 items-start bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300 rounded-md p-3">
              <div class="flex space-x-2 items-center">
                <i class="las la-coins text-3xl"></i>
              </div>
              <div class="flex flex-1 flex-col space-y-2">
                <p class="text-sm mt-1">Earn {{pool.name[0]}} and {{pool.name[1]}} from One Rewards which get compounded daily earning you your share of fees from the Exchange's transaction. You earn OpenX from the farm at the same rate as the selected farm's APR from the liquidity added. LP can be unstaked in Farms and withdrawn from Liquidity page.. Refer to Docs for more details.</p>
              </div>
            </div>
          </tooltip-me-content>
        </tooltip-me>
      </div>
    </div>
    <!-- Header right side -->
    <div class="flex items-center justify-center ">
      <template v-if="!this.rewards">
        <svg class="animate-spin h-7 w-7 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </template>
      <template v-else>
          <button @click="setCompounding()" 
            :class="this.isActive? 'bg-oswapGreen text-slightDark pointer-events-none':''"
            class="flex items-center justify-center rounded-xl border border-oswapGreen st5 text-oswapGreen hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark">
            <p class="text-sm p-1 px-3">{{this.isActive? 'Active!':'Select!'}}</p>
          </button>
      </template>
    </div>
  </div>
</template>

<script>
import openswap from "@/shared/openswap.js";
import { ethers } from "ethers";
  import { mapGetters, mapActions } from 'vuex';


  export default {
    name: 'PoolHeader',
    mixins: [openswap],
    props: {
      pool: Object,
      poolData: Object,
      farmPair: String,
      compActive: String,
      index: Number
    },
    data() {
      return {
        tooltip: {
          name: new Date().getTime(),
          position: 'top',
          color: 'rgba(24, 213, 187, 1)',
          offset: 16,
          speed: 300,
          shift: 50
        },
        ttpObj: null,
        ttpRec: null,
        tt0s: '?',
        tt1s: '?',
        tas: '?',
        rewards: '0',
        selected: null,
        isActive: false,
      } 
    },
    mounted: async function() {
      if(this.pool.pairaddress == this.farmPair && this.compActive == 'true'){
        this.isActive = true
      }
      console.log(this.pool.pairaddress)
      console.log(this.farmPair)
      this.ttpObj = document.querySelector(`div[tooltipme="tooltip-me_${this.tooltip.name}"]`);
      console.log(this.ttpObj)
      // Mobile
      // Adjust Tooltips for mobile
      if (this.getWindowSize().width < 768) {
        this.adjustTooltipforMobile();
      }
      // Desktop
      // Format the tooltip the first time
      if (this.getWindowSize().width >= 768) {
        this.adjustTooltip();
      }
      // Desktop
      // Format the tooltip when the user resizes the browser
      window.addEventListener('resize', () => {
        this.adjustTooltip();
      });
      // Desktop
      // When the user clicks top open the farm pair details
      // we must recalc tooltips again
      this.oswapEmit.on('recalc-tooltips', () => {
        if (this.getWindowSize().width >= 768) {
          this.adjustTooltip();
        }
      });

         
    
      

    
     
    },
    methods: {
      ...mapGetters('farm/farmData', ['getFarmData']),
      setCompounding: async function(){
        console.log(this.poolData.index)
        this.setValCompounding(this.poolData.index, true , this.index)
        this.isActive = true
      },
      updatePoolState: function(pool){
      var farmData = this.getFarmData()
      var poolData = farmData[pool.i]
     return poolData;
     
      },
      getWindowSize() {
        return {
          height: document.documentElement.getBoundingClientRect().height,
          width: document.documentElement.getBoundingClientRect().width
        }
      },
      adjustTooltip() {
        // gets the tooltip location bounduary
        this.ttpRec = this.ttpObj.getBoundingClientRect();
        // find the middle of the window
        let width = this.getWindowSize().width;
        let xMiddle = width / 2;

        if (width > 540 && width < 1200) {
          // for tooltips at the middle left
          if ((this.ttpRec.width / 2 + this.ttpRec.left) < xMiddle) {
            this.tooltip.shift = 30
          }
          // for tooltips at the middle right
          if ((this.ttpRec.width / 2 + this.ttpRec.left) > xMiddle) {
            this.tooltip.shift = 70
          }
        } else if (width > 1200) {
          this.tooltip.shift = 50
        }
      },
      adjustTooltipforMobile() {
        // gets the tooltip location bounduary
        this.ttpRec = this.ttpObj.getBoundingClientRect();
        // find the middle of the window
        let width = this.getWindowSize().width;
        let xMiddle = width / 2;

        // screen size from 0 - 540
        if (width > 0 && width <= 540) {
          // for tooltips at the middle left
          if ((this.ttpRec.width / 2 + this.ttpRec.left) < xMiddle) {
            
            let fromMiddle = xMiddle - (this.ttpRec.width / 2 + this.ttpRec.left);
            let shiftSub = (fromMiddle * 100) / this.ttpRec.width;
            let roomLeftL = xMiddle - fromMiddle;

            if ((this.ttpRec.width / 2) < roomLeftL) {
              this.tooltip.shift = 50 - shiftSub
            } else {
              let outsideL = (this.ttpRec.width / 2) - roomLeftL
              this.tooltip.shift = 45 - outsideL
            }
          }
          // for tooltips at the middle right
          if ((this.ttpRec.width / 2 + this.ttpRec.left) > xMiddle) {

            let fromMiddle = (this.ttpRec.width / 2 + this.ttpRec.left) - xMiddle;
            let shiftAdd = (fromMiddle * 100) / this.ttpRec.width;
            let roomLeftR = width - (xMiddle + fromMiddle);

            if ((this.ttpRec.width / 2) < roomLeftR) {
              this.tooltip.shift = 50 + shiftAdd
            } else {
              let outsideR = (this.ttpRec.width / 2) - roomLeftR
              this.tooltip.shift = 55 + outsideR
            }
          }
        }
      },
    }
  }
</script>