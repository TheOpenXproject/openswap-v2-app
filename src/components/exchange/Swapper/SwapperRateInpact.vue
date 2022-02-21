<template>
  <div class="grid grid-cols-2 gap-2 min-w-0 py-2 text-gray-500 dark:text-gray-300 px-3">
    <div class="flex flex-col p-1 justify-between text-xs">
      <p>Rate</p>
      <p class="text-el">{{rate}}</p>
    </div>

    <div class="flex flex-col p-1 justify-between text-xs">
      <p>Next Price</p>
      <p class="text-el">{{nextMidPrice}}</p>
    </div>

     <div class="flex flex-col p-1 justify-between text-xs">
      <p>Fee</p>
      <p class="text-el">{{getFee}} %</p>
    </div>

    <div class="flex flex-col p-1 justify-between text-xs">
      <p>Price Impact</p>
      <p class="text-el">{{(getPriceImpact - getFee).toFixed(3)}}%</p>
    </div>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'SwapperRateInpact',
    
    mixins: [openswap],
    props:{
      rate: Number,
      nextMidPrice: Number
    },
    data(){
      return{
        fee: 0,
        hops: 0,

      }
    },
    mounted: async function() {
      
      //this.fee = this.getThePath.length * 0.3
    },
    computed: {
      ...mapGetters('exchange/swapper', ['getPriceRate', 'getPriceImpact','getThePath', 'getSlippageRate','getInputAmount']),
      getFee: function(){
         console.log(this.getThePath)
        if(this.getThePath != null)
        return ((this.getThePath.length-1) * 0.3).toFixed(1)
      else
        return this.fee
      }
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange/swapper', ['setPriceRate'])
    }
  }
</script>