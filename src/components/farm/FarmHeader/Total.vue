<template>
  <div class="flex flex-col xs:justify-center sm:justify-center ">
  
    <div class="flex space-x-4 items-center mb-6">
      <i class="las la-globe-europe text-lg dark:text-oswapGreen"></i>
      <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">Total:</p>
    </div>

    <div class="flex flex-col space-y-2 text-gray-600 dark:text-gray-300 mb-3">
      <p class="md:text-4xl ss:text-2xl inline xs:text-5xl font-extrabold">${{prettify((this.getTVL()).toFixed(2))}}</p>
      <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Total Staked Value</p>
    </div>


    <div class="flex flex-col space-y-2 text-gray-600 dark:text-gray-300">
      <p class="md:text-xl ss:text-2xl xs:text-5xl font-extrabold">{{this.getStakedAPR().toFixed(2)}} %</p>
      <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Average APR</p>
    </div>

  </div>
</template>

<script>
  import { ethers } from 'ethers'; 
  import { mapGetters } from "vuex";

  export default {
    name: 'Total',
    props: {
    },
    methods: {
    ...mapGetters('farm/farmData', ['getTVL','getStakedAPR']),

      prettify: function(number){
        return  ethers.utils.commify(number)
      }
    }
  }
</script>