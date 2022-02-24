<template>
  <div class="flex flex-col pb-5 pt-2.5">
    <div class="flex flex-col p-4 st5 bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent ss:w-80 xs:w-96 rounded-3xl border-l border-oswapGreen h-auto">
      <div class="flex items-center space-x-2 mb-3">
        <i class="las la-random text-xl dark:text-gray-300"></i>
        <p class="text-sm dark:text-gray-300">Swap</p>
      </div>
      <div class="flex flex-col st5 dark:bg-oswapDark-gray bg-gray-100 rounded-2xl">
        <div class="flex flex-col st5 dark:bg-oswapDark-gray bg-gray-100 rounded-2xl">
          <div class="flex shadow-lg flex-col space-y-3 st5 dark:bg-oswapDark-gray bg-gray-100 p-3 rounded-2xl">
            <SwapperToken0 @input0="input0" />
            <SwapperToken1 @input1="input1" />
          </div>
          <SwapperReserves />
        </div>
        <SwapperRateInpact :nextMidPrice="nextMidPrice" :rate="rate"  />
      </div>
      <SwapperRate />
      
      <Warning :warnings="getWarnings" />

      <div class="flex pt-3">
        <div class="flex w-full h-10 items-center">
          <SwapperBackButton />
          <div class="flex flex-1 h-full space-x-2 justify-end">
            <div class="flex items-center w-28 h-full relative">
              <SwapperApprove />
            </div>
            <div class="flex items-center w-28 h-full relative">
              <SwapperSwap @reload='reload' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SwapperToken0 from '@/components/exchange/Swapper/SwapperToken0'
  import SwapperToken1 from '@/components/exchange/Swapper/SwapperToken1'
  import SwapperReserves from '@/components/exchange/Swapper/SwapperReserves'
  import SwapperRate from '@/components/exchange/Swapper/SwapperRate'
  import SwapperRateInpact from '@/components/exchange/Swapper/SwapperRateInpact'
  import SwapperBackButton from '@/components/exchange/Swapper/SwapperBackButton'
  import SwapperApprove from '@/components/exchange/Swapper/SwapperApprove'
  import SwapperSwap from '@/components/exchange/Swapper/SwapperSwap'
  import Warning from '@/components/exchange/Warning'
  import { mapGetters, mapActions } from 'vuex'
  import openswap from "@/shared/openswap.js";
const { Trade, TokenAmount, TradeType, Percent} = require("openswap-v2-sdk");

  export default {
    name: 'Swapper',
    mixins: [openswap],
    components: {
      SwapperToken0,
      SwapperToken1,
      SwapperReserves,
      SwapperRate,
      SwapperRateInpact,
      SwapperBackButton,
      SwapperApprove,
      SwapperSwap,
      Warning
    },
    mounted(){
      if(!this.getUserSignedIn){
        this.setBtnState({swap: 'swapped'})
      }
      this.input0('1');

    },
    unmounted() {
      this.resetAll();
    },
    data() {
      return {
        rate: 0,
        nextMidPrice: 0,
      }
    },
    computed: {
     
      ...mapGetters('exchange/swapper/buttons', ['getBtnState']),
      ...mapGetters('exchange/swapper', ['getWarnings','getSlippageRate']),
      ...mapGetters('wallet', ['getUserSignedIn']),
    },
    methods: {
       ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange/swapper/buttons', ['setBtnState']),
      ...mapActions('exchange/swapper', [
        'setInputAmount', 
        'setPriceImpact', 
        'setThePath',
        'setWarning', 
        'deleteWarning',
        'setLastSelected',
        'resetAll'
      ]),

      input0: async function(amount0){
        const token0 = this.getToken()['token1']
        const token1 = this.getToken()['token2']

        let units = this.getUnits(amount0, token0)
        let bestRoute = await this.getBestRouteIn(units, token0, token1)

        const trade = new Trade(
        bestRoute.route,
        new TokenAmount(bestRoute.inputAmount.token, units),
        TradeType.EXACT_INPUT
      );

        this.setPriceImpact(bestRoute.priceImpact.toFixed(2))
        this.setThePath(this.getPath(bestRoute));
        let slippageTolerence = new Percent(String(parseFloat(this.getSlippageRate)*10), "1000");
        let amountOut = trade
                      .minimumAmountOut(slippageTolerence)
        this.rate = parseFloat(trade.executionPrice.raw.toFixed(token0.decimals)).toFixed(6)
        this.nextMidPrice = parseFloat(trade.nextMidPrice.raw.toFixed(token0.decimals)).toFixed(6)
        this.setInputAmount({
          1: String(this.getFormatedUnitsDecimals(amountOut.raw.toString(), token1.decimals))
        })
        this.setInputAmount({
          0: String(this.getFormatedUnitsDecimals(units, token0.decimals))
        })
        console.log(bestRoute)
        console.log(trade)
      },
      input1: async function(amount0){

        const token0 = this.getToken()['token1']
        const token1 = this.getToken()['token2']


        let units = this.getUnits(amount0, token1)
        let bestRoute = await this.getBestRouteOut(units, token1, token0)
        const trade = new Trade(
        bestRoute.route,
        new TokenAmount(bestRoute.outputAmount.token, units),
        TradeType.EXACT_OUTPUT
      ); 

        this.rate = parseFloat(trade.executionPrice.raw.toFixed(token0.decimals)).toFixed(6)
        this.nextMidPrice = parseFloat(trade.nextMidPrice.raw.toFixed(token0.decimals)).toFixed(6)
        
        this.setPriceImpact(trade.priceImpact.toFixed(2))
        this.setThePath(this.getPath(bestRoute));


         let slippageTolerence = new Percent(String(parseFloat(this.getSlippageRate)*10), "1000");
        let amountOut = trade
                      .maximumAmountIn(slippageTolerence)
                      

        console.log(bestRoute.outputAmount.raw.toString())
        this.setInputAmount({
          0: this.getFormatedUnitsDecimals(amountOut.raw.toString(), token0.decimals)
        })
        this.setInputAmount({
          1: this.getFormatedUnitsDecimals(units, token1.decimals)
        })
      },
      reload(value) {
        this.$emit('reload', true)
      },
    }
  }
</script>