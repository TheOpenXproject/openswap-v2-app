<template>
  <div class="flex flex-wrap w-full lg:mb-6 lg:my-0 my-3  space-y-2">
  
    <div class="flex space-x-2 items-center">
      <i class="las la-user text-lg dark:text-oswapGreen"></i>
      <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">Income:</p>
              <div class="flex flex-none p-2 my-2">
          <SwitchGroup>
            <div class="flex items-center">
              <SwitchLabel class="mr-4"></SwitchLabel>
              <Switch
              v-model="showOpenx"
              @click="showOpenx = !showOpenx"
              :class='!showOpenx ? "bg-oswapGreen-dark" : "bg-gray-500"'
              class="relative inline-flex items-center h-4 transition-colors rounded-full w-10 focus:outline-none"
              >
              <span
              :class='!showOpenx ? "translate-x-6 bg-opaqueDark-light" : "translate-x-1 bg-white dark:bg-oswapDark-dark"'
              class="inline-block w-4 h-4 transition-transform transform rounded-full"
              />
            </Switch>
          </div>
        </SwitchGroup>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 w-full pl-2">

      <div class="flex space-x-1 w-full">
        <div class="flex flex-col text-gray-600 dark:text-gray-300">
          <p class="ss:text-md xs:text-lg font-extrabold">{{showOpenx? '': '$'}}{{(this.getRewards/7).toFixed(2)}}</p>
                    <p class="text-xs font-bold text-gray-500 dark:text-gray-400">{{showOpenx? ' OpenX': ''}}</p>

          <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Daily</p>
        </div>
      </div>

      <div class="flex  space-x-3 w-full">
        <div class="flex flex-col text-gray-600 dark:text-gray-300">
          <p class="ss:text-md xs:text-lg font-extrabold">{{showOpenx? '': '$'}}{{(this.getRewards)?.toFixed(1)}}</p>
          <p class="text-xs font-bold text-gray-500 dark:text-gray-400"></p>
                    <p class="text-xs font-bold text-gray-500 dark:text-gray-400">{{showOpenx? ' OpenX': ''}}</p>

          <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Weekly</p>
        </div>
      </div>

      <div class="flex space-x-3 w-full">
        <div class="flex flex-col text-gray-600 dark:text-gray-300">
          <p class="ss:text-md xs:text-lg font-extrabold">{{showOpenx? '': '$'}}{{(this.getRewards * 4.34).toFixed(2)}}</p>
                    <p class="text-xs font-bold text-gray-500 dark:text-gray-400">{{showOpenx? ' OpenX': ''}}</p>

          <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Monthly</p>
        </div>
      </div>

      <div class="flex space-x-3 w-full">
        <div class="flex flex-col text-gray-600 dark:text-gray-300">
          <p class="ss:text-md xs:text-lg font-extrabold">{{showOpenx? '': '$'}}{{(this.getRewards * 4.34 * 12).toFixed(2)}}</p>
                    <p class="text-xs font-bold text-gray-500 dark:text-gray-400">{{showOpenx? ' OpenX': ''}}</p>

          <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Yearly</p>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  import { ethers } from 'ethers';
  import openswap from "@/shared/openswap.js";
  import { mapGetters } from 'vuex';

  export default {
    name: 'Personal',
    mixins: [openswap],
    props: {
    },
    data() {
      return {
        oswapPrice: 0,
        usdValue: 0.00,
        weekly: 0,
        monthly: 0,
        showOpenx: false,
        oswapPrice:0,
      }
    },
    mounted: async function(){

      this.oswapPrice = await this.getStateOpenXPrice();

    },
    computed: {
      getRewards: function() {
        let price = 1;
        if (this.showOpenx) {
          price = this.oswapPrice
        }
        return this.getUserRewardsPerWeek() / price
      },
    },
    methods: {
      ...mapGetters('wallet', ['getUserSignedIn']),//getUserRewardsPerWeek
      ...mapGetters('farm/farmData', ['getUserRewardsPerWeek', 'getStateOpenXPrice']),
      prettify: function(number){
        return  ethers.utils.commify(number)
      },
      collectAllButton: async function(){
        const tx = await this.collectAll() 
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>