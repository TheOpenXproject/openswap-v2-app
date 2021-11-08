<template>
  <div class="flex flex-wrap w-full">
  
    <div class="flex space-x-2 items-center mb-6">
      <i class="las la-user text-lg dark:text-oswapGreen"></i>
      <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">Income :</p>
    </div>

    <div class="grid grid-cols-2 gap-3 w-full">
      <div class="flex items-center space-x-3 w-full">
        <div class="flex w-12 h-12 items-center justify-center rounded-full bg-slightGray dark:bg-slightDark">
          <i class="las la-dollar-sign text-3xl dark:text-oswapGreen"></i>
        </div>
        <div class="flex flex-col text-gray-600 dark:text-gray-300">
          <p class="ss:text-md xs:text-lg font-extrabold">{{getMonthly}}</p>
          <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Monthly Income Value</p>
        </div>
      </div>

      <div class="flex items-center space-x-3 w-full">
        <div class="flex w-12 h-12 items-center justify-center rounded-full bg-slightGray dark:bg-slightDark">
          <i class="las la-dollar-sign text-3xl dark:text-oswapGreen"></i>
        </div>
        <div class="flex flex-col text-gray-600 dark:text-gray-300">
          <p class="ss:text-md xs:text-md font-extrabold">{{getWeekly}}</p>
          <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Weekly Income Value</p>
        </div>
      </div>
    </div>

  </div>
  
</template>

<script>
  import { ethers } from 'ethers';
  import openswap from "@/shared/openswap.js";
  import { toastMe } from '@/components/toaster/toaster.js';
  import { mapGetters } from 'vuex';


  export default {
    name: 'Personal',
    mixins: [openswap],
    props: {
      rewardsPerTime: Object
    },
    data() {
      return {
        oswapPrice: 0,
        usdValue: 0.00,
        weekly: 0,
        monthly: 0
      }
    },
    mounted: async function(){
      let timeout

      if(this.getUserSignedIn()){
        timeout = 1
      } else {
        timeout = 1000
      }
      
      await setTimeout(async function (){

      }.bind(this), timeout);

      await setInterval(async function(){
       // this.oswapPrice = await this.getOswapPrice();

      }.bind(this), 10000)

      
      
    },
    computed: {
      pendingValue: function() {
        return this.prettify(String(parseFloat(this.REWARDS * this.oswapPrice).toFixed(2)))
      },
      getMonthly: function(){
        let n;
        let monthlyIncome = 0
        for(n in this.rewardsPerTime.monthly){
          monthlyIncome = monthlyIncome +  parseFloat(this.rewardsPerTime.monthly[n])
          console.log(this.rewardsPerTime.monthly[n])
        }
        return monthlyIncome
      },
      getWeekly: function() {
        let n;
        let weeklyIncome = 0
        for(n in this.rewardsPerTime.weekly){
          weeklyIncome = weeklyIncome +  parseFloat(this.rewardsPerTime.weekly[n])
        }
        return weeklyIncome
      }
      
    },
    methods: {
      ...mapGetters('wallet', ['getUserSignedIn']),
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