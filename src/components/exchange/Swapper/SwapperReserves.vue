<template>
  <div class="flex flex-col space-y-2 pt-2 pb-3 px-3 min-w-0 rounded-b-2xl shadow-lg">
    <p class="text-sm dark:text-gray-300">Reserves</p>
    <div class="flex items-center space-x-4">
      <div class="flex w-1/2 items-center space-x-2">
        <img :src="this.getToken()['token1'].imgSrc" class="h-4 w-4 rounded-full flex items-center justify-center" alt="">
        <p class="text-xs dark:text-gray-300 text-el">{{reserves[0]}}</p>
      </div>
      <div class="flex w-1/2 items-center space-x-2">
        <img :src="this.getToken()['token2'].imgSrc" class="h-4 w-4 rounded-full flex items-center justify-center" alt="">
        <p class="text-xs dark:text-gray-300 text-el">{{reserves[1]}}</p>
      </div>
    </div>
  </div>
</template>

<script>

  import openswap from "@/shared/openswap.js";
  import { mapGetters } from 'vuex';

  export default {
    name: 'SwapperReserves',
    data() {
      return {
        token1: null,
        token2: null,
        reserves: []
      }
    },
    mixins: [openswap],
    mounted: async function (){
      this.token1 = this.getToken()['token1'];
      this.token2 = this.getToken()['token2'];

      let pair = await this.getPair(this.token1, this.token2)
      this.reserves = await this.getReserves(pair, this.token1)
      console.log(this.reserves)
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
    }
  }
</script>