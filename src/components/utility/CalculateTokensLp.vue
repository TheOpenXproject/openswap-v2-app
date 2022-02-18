<template>
    <div class="flex flex-col space-y-2">
        <div class="flex flex-row items-center space-x-2">
            <span class="whitespace-nowrap">USD to invest:</span>
            <InputWithValidationLiquidity :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="USD" :errorTop="'mt-10 z-90'">

            </InputWithValidationLiquidity>
        </div>
        <div class="flex flex-none space-x-4 flex-row justify-end  text-right" >
            <div class="flex flex-col text-gray-600 dark:text-gray-300">
                <p class="ss:text-md xs:text-lg font-extrabold">{{parseFloat(amount0).toFixed(2)}}</p>
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400">{{pair.name[0]}}</p>
            </div>
            <div class="flex flex-col text-gray-600 dark:text-gray-300">
                <p class="ss:text-md xs:text-lg font-extrabold">{{parseFloat(amount1).toFixed(2)}}</p>
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400">{{pair.name[1]}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import openswap from "@/shared/openswap.js";
import InputWithValidationLiquidity from '@/components/InputWithValidationLiquidity';
export default {
    name: "CalculateTokensLp",
    mixins: [openswap],
    components: { 
        InputWithValidationLiquidity
     },
     props: {
        pair: Object
     },
    computed: {
    },
    methods: {
        calculateRewards() {
            this.$emit('calculate', {amount0: this.amount0, amount1: this.amount1, pair: this.pairObject, amount: this.amount})
        },
        async getPair() {
            if (!this.pairObject) {
                this.pairObject = this.pair.uniPair
            }
        },
        async updatePrice(n) {
            if(n){
              this.tokenValue = this.pair.token1PriceUsd * this.amount1
            }
            if(!n){
              this.tokenValue = this.pair.token0PriceUsd * this.amount0
            }
        },
        inputAmount: async function(value){
            this.$emit('amountInput', value)
            this.setErrors(value, 'errors0')
            if (this.errors !== {} && value !== this.amount) {
                this.amount0 = (value/2 / this.pair.token0PriceUsd)
                this.amount1 = (value/2 / this.pair.token1PriceUsd)
               this.calculateRewards()

            }   

        },
        inputAmount0: async function(value){
            this.setErrors(value, 'errors0')
            if (this.errors0 !== {} && value !== this.amount0) {
                this.fetching = true;
                await this.getPair();
                const liquidity = await this.getAmountsLiquidityCalc(
                    this.pairObject,
                    { oneZeroxAddress:this.pair.token0address, decimals: this.pair.decimals[0]},
                    { oneZeroxAddress:this.pair.token1address, decimals: this.pair.decimals[1]},
                    value
                )
                this.amount0 = value;
                this.amount1 = (liquidity).toString();
                await this.updatePrice(false);
                this.fetching = false;
            }   this.calculateRewards()

        },
        inputAmount1: async function(value){
            this.setErrors(value, 'errors1')
            if (this.errors1 !== {} && value !== this.amount1) {
                this.fetching = true;
                await this.getPair();
                const liquidity = 

                await this.getAmountsLiquidityCalc(
                    this.pairObject,
                    { oneZeroxAddress:this.pair.token1address, decimals: this.pair.decimals[1]},
                    { oneZeroxAddress:this.pair.token0address, decimals: this.pair.decimals[0]},
                    value
                )
                this.amount0 = value;
                this.amount1 = (liquidity).toString();
                await this.updatePrice(true);
                this.fetching = false;
                this.calculateRewards()
            }
        },
        setErrors(value, setup) {
            if (!value.match(/^\d*\.?\d*$/)) {
                this[setup]['format'] = 'Invalid format! e.g: 12345.678';
            } else {
                delete this[setup]['format'];
            }
            if (value == '') {
                this[setup]['blank'] = 'Amount can\'t be blank';
            } else {
                delete this[setup]['blank']
            }
        }
    },
    props: {
      pair: Object
    },
    data() {
        return {
        pairObject: null,
        fetching: false,
        amount:    "0",
        amount0: '0',
        amount1: '0',
        tokenValue: '0',
        errors:{},
        errors0: {},
        errors1: {},
        };
    },
};
</script>
