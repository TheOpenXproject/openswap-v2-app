<template>
  <div class="flex flex-1 items-center">
    <!-- Left side -->
    <div class="flex flex-col space-y-1 w-1/3 min-w-0">
      <!-- Token img and name -->
      <div class="relative flex space-x-2 items-center h-10">
        <i @click="addTokenToMetamask(this.getToken()['token2'])" class="flex las la-plus text-sm p-1 text-oswapGreen absolute top-0 left-0 items-center justify-center bg-slightGray dark:bg-slightDark rounded-full cursor-pointer shadow hover:bg-oswapGreen dark:hover:bg-oswapGreen hover:text-slightGray dark:hover:text-slightDark"></i>
        <img :src="this.getToken()['token2'].imgSrc" class="h-8 w-8 rounded-full flex items-center justify-center" alt="">
        <div class="flex flex-1 items-center min-w-0">
          <p class="text-sm text-el text-oswapGreen-dark">{{this.getToken()['token2'].Symbol}}</p>
        </div>
      </div>
      <!-- Network name -->
      <div class="flex pl-1 space-x-2 h-4">
        <p class="text-xs text-el">{{this.getToken()['token2'].name}}</p>
      </div>
    </div>
    <!-- Right side -->
    <div class="flex flex-col space-y-1 flex-1 w-2/3 min-w-0">
      <div class="flex h-10">
        <Input1 :errors="errors" :rounded="'rounded-xl'" @input1="input1" :placeholder="'Amount...'" :errorTop="'pt-10'">
          <div class="flex flex-1 st5-all items-center justify-end group-scope z-30 absolute right-0">
            <div @click="setMax()" class="flex h-10 items-center bg-gray-100 dark:bg-oswapDark-gray group-scope-hover:bg-oswapGreen text-oswapGreen-dark dark:text-oswapGreen border-l border-black border-opacity-10 cursor-pointer px-3 rounded-xl">
              <p class="text-sm dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100">MAX</p>
            </div>
          </div>
        </Input1>
      </div>
      <div class="flex pl-2 space-x-2 h-4">
        <p class="text-xs flex-none dark:text-oswapGreen-dark">Balance :</p>
        <p class="text-xs text-el text-gray-600 dark:text-gray-300">{{parseFloat(getBalanceToken(1)).toFixed(8)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Input1 from '@/components/exchange/Swapper/Input1';
  import openswap from "@/shared/openswap.js";
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'SwapperToken1',
    components: {
      Input1
    },
    mixins: [openswap],
    mounted: async function() {
      this.setBalanceToken({ 
        1: await this.getTokenBalance(this.getToken()['token2']) 
      })
    },
    data() {
      return {
        errors: {},
      }
    },
    computed: {
      ...mapGetters('exchange/swapper', ['getBalanceToken', 'getInputAmount', 'getSlippageRate', 'getPriceImpact'])
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapActions('exchange/swapper/buttons', ['setBtnState']),
      ...mapActions('exchange/swapper', [
        'setBalanceToken', 
        'setInputAmount', 
        'setPriceImpact', 
        'setThePath', 
        'setWarning', 
        'deleteWarning',
        'setLastSelected'
      ]),
      input1: async function(amount1) {
        this.$emit('input1', amount1)

      },
      setMax: async function(){
          this.$emit('input1', await this.getTokenBalance(this.getToken()['token2']))
                  this.setLastSelected(3) 

      }
    }
  }
</script>