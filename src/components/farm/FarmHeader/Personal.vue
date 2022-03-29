<template>
  <div class="flex flex-wrap w-full lg:mb-6 lg:my-0 my-3 space-y-3">
  
    <div class="flex space-x-3 items-center ">
      <i class="las la-user text-lg dark:text-oswapGreen"></i>
      <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">Personal:</p>
    </div>

    <div class="grid grid-cols-2 gap-5 w-full">

       <div class="flex flex-1 items-center space-x-3 w-full">
        <div class="flex w-12 h-12 items-center justify-center rounded-full bg-slightGray dark:bg-slightDark ">
          <i class="las la-piggy-bank text-2xl dark:text-oswapGreen"></i>
        </div>
        <div class="flex flex-col text-gray-600 dark:text-gray-300">
          <p class="ss:text-md xs:text-xl md: md:text-xl font-extrabold">${{prettify(this.getUserStake().toFixed(2))}}</p>
          <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Total Staked</p>
        </div>
      </div>

      <div class="flex flex-1 items-center space-x-3 w-full">
        <div class="flex w-12 h-12 items-center justify-center rounded-full bg-slightGray dark:bg-slightDark ">
          <i class="las la-coins text-2xl dark:text-oswapGreen"></i>
        </div>
        <div class="flex flex-col text-gray-600 dark:text-gray-300">
          <p class="ss:text-md xs:text-xl md: md:text-xl font-extrabold">${{pendingValue}} / {{parseFloat(this.getPendingRewards()).toFixed(2)}}</p>

          <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Total Rewards</p>
        </div>
      </div>

      <div class="flex flex-1 items-center space-x-2 w-full">
        <div class="flex w-12 h-12 items-center justify-center rounded-full bg-slightGray dark:bg-slightDark ">
          <i class="las la-percent text-2xl dark:text-oswapGreen"></i>
        </div>
        <div class="flex flex-col text-gray-600 dark:text-gray-300">
          <p class="ss:text-md xs:text-xl md: md:text-xl font-extrabold">{{this.getUserAPR().toFixed(2)}}</p>
          <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Average APR</p>
        </div>
      </div>

     
      

<div class="flex flex-1 items-center space-x-3 w-full">
        
        <button @click="collectAllButton" class="flex mt-2 h-8 items-center justify-center rounded-md  w-48 bg-oswapGreen text-slightGray dark:text-slightDark dark:bg-oswapGreen">
            <p class="text-sm">Claim All</p>
          </button>
        
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
    },
    data() {
      return {
        oswapPrice: 0,
        usdValue: 0.00
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
        this.oswapPrice = await this.getOswapPrice();
      }.bind(this), timeout);

      await setInterval(async function(){
        this.oswapPrice = await this.getOswapPrice();
      }.bind(this), 15000)
      
    },
    computed: {
      pendingValue: function() {
        return this.prettify(String(parseFloat(this.getPendingRewards() * this.oswapPrice).toFixed(2)))
      }
    },
    methods: {
      ...mapGetters("farm/farmData", [ "getPendingRewards","getUserStake", "getTVL", "getUserAPR"]),
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