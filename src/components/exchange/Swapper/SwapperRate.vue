<template>
  <div class="flex items-center justify-between text-xs min-w-0 px-1 mt-3">
    <p class="dark:text-gray-300 text-el">Slippage Rate &nbsp;</p>
    <div class="flex items-center ss:space-x-1 xs:space-x-2">
      <div class="flex">
        <div class="flex pr-1 items-center rounded-lg text-oswapGreen">
          <p>{{getSlippageRate}}%</p>
        </div>
      </div>
      <SelectRate rate="0.4" :picked="getSlippageRate" @selectRate="updateSelectedRate" hover="hover:bg-gray-50" darkHover="dark:hover:bg-slightDark" :class="'dark:text-gray-300 dark:bg-oswapDark-gray bg-gray-100'" />
      <SelectRate rate="0.8" :picked="getSlippageRate" @selectRate="updateSelectedRate" hover="hover:bg-gray-50" darkHover="dark:hover:bg-slightDark" :class="'dark:text-gray-300 dark:bg-oswapDark-gray bg-gray-100'" />
      <SelectRate rate="1.2" :picked="getSlippageRate" @selectRate="updateSelectedRate" hover="hover:bg-gray-50" darkHover="dark:hover:bg-slightDark" :class="'dark:text-gray-300 dark:bg-oswapDark-gray bg-gray-100'" />
      <SwapperRateCustom :picked="getSlippageRate" @selectRate="updateSelectedRate"/>
    </div>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import SelectRate from '@/components/SelectRate';
  import SwapperRateCustom from '@/components/exchange/Swapper/SwapperRateCustom';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SwapperRate',
    components: {
      SelectRate,
      SwapperRateCustom,
    },
    mixins: [openswap],
    mounted: async function() {
      //this.updateData();
    },
    computed: {
      ...mapGetters('exchange/swapper', ['getInputAmount', 'getSlippageRate'])
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange', ['goTo']),
      ...mapActions('exchange/swapper', ['setSlippageRate', 'setInputAmount', 'setPriceImpact', 'setThePath']),
      
      updateSelectedRate(rate) {
        // Ensures a correct rate
        this.setSlippageRate(
          Number((rate == '' || parseFloat(rate) < 0.1 ) ? '0.1' : rate).toString()
        )
        //this.updateData();
      }
    }
  }
</script>