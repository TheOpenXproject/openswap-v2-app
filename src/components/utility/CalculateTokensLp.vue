<template>

    <div class="flex flex-grid overflow-hidden grid-cols-2 gap-3 w-auto h-2/12">
    <div class="box"> USD to invest:</div>
    <div class="box"><InputWithValidationLiquidity :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="USD" :errorTop="'mt-10 z-90'">

    </InputWithValidationLiquidity></div>
    </div>


    <div class="flex flex-grid overflow-hidden grid-cols-2 gap-3 w-auto h-2/12">
    <div class="box"> <img :src="pair.imgtoken0" class="h-8 w-8"></div>
    <div class="box">{{amount0}}</div>
    </div>
     <span v-if="tokenValue !== '0'" class="ml-2 text-xs text-oswapGreen-dark">${{tokenValue}}</span>
    
    <div class="flex flex-grid overflow-hidden grid-cols-2 gap-3 w-auto h-2/12">
    <div class="box"> <img :src="pair.imgtoken1" class="h-8 w-8"></div>
    <div class="box">    {{amount1}}
    </div>
    </div>

   
    <span  v-if="tokenValue !== '0'" class="ml-2 text-xs text-oswapGreen-dark">${{tokenValue}}</span>
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
