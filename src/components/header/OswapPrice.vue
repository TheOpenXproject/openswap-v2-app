<template>
  <!-- Oswap token info -->
  <tooltip-me v-if="this.getFarms() != null">
    <div  class="flex rounded-lg focus:outline-none focus:ring-1 focus:ring-black space-x-1 p-2 px-1 md:px-3 items-center">
      <img alt="oSwap" src="@/assets/oswap_asset.png" class="ss:h-5 xs:h-6">
      <p class="ss:hidden xs:block text-xs pr-3 dark:text-oswapGreen">${{parseFloat(this.getStateOpenXPrice()).toFixed(5)}}</p>
      <img alt="oSwap" src="@/assets/one_logo.png" class="ss:hidden xs:block ss:h-5 xs:h-6">
      <p class="ss:hidden xs:block text-xs pr-3  dark:text-oswapGreen">${{parseFloat(this.getStateOnePrice()).toFixed(5)}}</p>
    </div>
 

    <tooltip-me-content :options="tooltip" class="flex text-xs flex-col divide-y-2 divide-oswapGreen w-72 p-0.5 rounded-lg shadow-xl">
      <div class="flex flex-col p-3 bg-gray-100 dark:bg-slightDark rounded-md text-gray-500 dark:text-gray-300">
        <p class="text-sm mb-3">Token Prices</p>
        <div class="flex space-x-2 mb-3 items-center">
          <img alt="oSwap" src="@/assets/one_logo.png" class="h-5 ">
          <p class="w-half pr-4">One Price:</p>
          <p>${{parseFloat(this.getStateOnePrice()).toFixed(8)}}</p>
        </div>
        <div class="flex space-x-2 mb-3 items-center">
          <img alt="oSwap" src="@/assets/oswap_asset.png" class="h-5">
          <p class="w-half">OpenX Price: </p>
          <p class="text-center">${{parseFloat(this.getStateOpenXPrice()).toFixed(8)}}</p>
        </div>
       
      </div>
      <div class="flex flex-col p-3 bg-gray-100 dark:bg-slightDark rounded-md text-gray-500 dark:text-gray-300">
        <div class="flex space-x-2 mb-3 items-center">
          <i class="las la-coins text-xl text-yellow-500"></i>
          <p>Circ. Market Cap: ${{marketCap}} USD</p>
        </div>
        <div class="flex space-x-2 mb-3 items-center">
          <i class="las la-fire-alt text-xl text-red-400"></i>
          <p>Tokens Burnt V2: {{balances.burnedAmount}} OpenX</p>
        </div>
        <div class="flex space-x-2 items-center">
          <i class="las la-fire-alt text-xl text-red-400"></i>
          <p>Tokens Burnt Total: {{balances.totalBurnedAmount}} OpenX</p>
        </div>
      </div>
      <div class="flex flex-col p-3 bg-gray-100 dark:bg-slightDark rounded-md text-gray-500 dark:text-gray-300">
        <p class="text-sm mb-3">Token Supply</p>
        <div class="flex space-x-2 mb-3 items-center">
          <i class="las la-globe-europe text-xl text-oswapBlue-light"></i>
          <p>Total: {{balances.circSupply}} OpenX</p>
        </div>
        <div class="flex space-x-2 items-center">
          <i class="las la-hourglass-end text-xl"></i>
          <p>Max:</p>
          <i class="las la-infinity text-xl"></i>
          <p>OpenX</p>
        </div>
      </div>
    </tooltip-me-content>
  </tooltip-me> 
</template> 

<script>
  import openswap from "@/shared/openswap.js"
  import { commify } from '@ethersproject/units';
  import { ethers } from 'ethers';
  import { mapGetters } from 'vuex';

  export default {
    name: "Oswap",
    components: {},
    data() {
      return {
        tooltip: {
          name: new Date().getTime(),
          position: 'bottom',
          color: 'rgba(24, 213, 187, 1)',
          offset: 12,
          speed: 300,
          shift: 50
        },
        ttpObj: null,
        ttpRec: null,
        oswapPrice: 0,
        balances: {
          totalSupply: 0.00,
          circSupply: 0.00,
          burnedAmount: 0.00,
          totalBurnedAmount: 0.00,
          devLocked: 0.00
        },
        marketCap: 0.00,

      }
    },
 
    mounted: async function() {
      this.$nextTick(async function() {
        // Grabs the tooltip element
        this.ttpObj = document.querySelector(`div[tooltipme="tooltip-me_${this.tooltip.name}"]`);
        // Format the tooltip the first time
        this.adjustTooltip();
        // Format the tooltip when the user resizes the browser
        window.addEventListener('resize', () => {
          this.adjustTooltip();
        });

        
      })

     
      await this.loadData()
   


      
    },
    methods: {
      ...mapGetters('wallet', ['getUserSignedIn']),
      ...mapGetters('farm/farmData', ['getStateOpenXPrice','getStateOnePrice','getOpenXSupply','getOpenXBurnt' , 'getFarms']),
      getWindowSize() {
        return {
          height: window.innerHeight,
          width: window.innerWidth
        }
      },
      loadData: async function(){
      this.oswapPrice = await this.getStateOpenXPrice();
      const supply = parseFloat(ethers.utils.formatEther(this.getOpenXSupply())).toFixed(2)
      const burnt = parseFloat(ethers.utils.formatEther(this.getOpenXBurnt())).toFixed(2)

      this.marketCap = commify((supply * this.oswapPrice).toFixed(2));
      this.balances.circSupply = commify(supply);
      this.balances.burnedAmount = commify(burnt);
      this.balances.totalBurnedAmount = commify(parseFloat(burnt) + 1220000)
      },
      adjustTooltip() {
        // gets the tooltip location bounduary
        this.ttpRec = this.ttpObj.getBoundingClientRect();
        // find the middle of the window
        let width = this.getWindowSize().width;
        let xMiddle = width / 2;

        // screen size from 0 - 540
        if (width > 0 && width < 540) {
          // for tooltips at the middle right
          if ((this.ttpRec.width / 2 + this.ttpRec.left) > xMiddle) {
            this.tooltip.shift = 65
          }
        } else if (width >= 540 && width < 1024) {
          // for tooltips at the middle right
          if ((this.ttpRec.width / 2 + this.ttpRec.left) > xMiddle) {
            this.tooltip.shift = 55
          }
        } else if (width > 1024) {
          this.tooltip.shift = 50
        }
      }
    }
  }
</script>