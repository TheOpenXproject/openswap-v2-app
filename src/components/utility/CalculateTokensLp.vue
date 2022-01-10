<template>
    <InputWithValidationLiquidity :input="amount0" :errors="errors0" @catchInput="inputAmount0" :rounded="'rounded-xl'" :placeholder="pair.name[0]" :errorTop="'mt-10 z-90'">

    </InputWithValidationLiquidity>
    <span v-if="price !== '0'" class="ml-2 text-xs text-oswapGreen-dark">${{price}}</span>
    <InputWithValidationLiquidity :input="amount1" :errors="errors1" @catchInput="inputAmount1" :rounded="'rounded-xl'" :placeholder="pair.name[1]" :errorTop="'mt-10 z-90'" >

    </InputWithValidationLiquidity>
    <span  v-if="price !== '0'" class="ml-2 text-xs text-oswapGreen-dark">${{price}}</span>
    <div @click="calculateRewards()" :class="!fetching? '':'cursor-not-allowed'" class="flex h-10 items-center bg-gray-100 dark:bg-oswapDark-gray group-scope-hover:bg-oswapGreen text-oswapGreen-dark dark:text-oswapGreen border-l border-black border-opacity-10 cursor-pointer px-3 rounded-xl">
        <transition name="fall" appear>
            <p v-if="!fetching" class="text-sm dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100">Calculate Rewards</p>
            <div v-else class="flex flex-1 justify-start items-center space-x-2">
                <p class="text-oswapGreen-dark">Fetching</p>
                <i class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen"></i>
            </div>
        </transition>
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
    computed: {
    },
    methods: {
        calculateRewards() {
            this.$emit('calculate', {amount0: this.amount0, amount1: this.amount1, pair: this.pairObject})
        },
        async getPair() {
            if (!this.pairObject) {
                this.pairObject = await this.getPairByAddressFarm(this.pair.token0address, this.pair.token1address)
            }
        },
        async updatePrice() {
            [this.price] = await this.getLiquidityValue(
                this.pair, 
                this.getEthers(this.amount0),
                this.getEthers(this.amount1),
            );
        },
        inputAmount0: async function(value){
            this.setErrors(value, 'errors0')
            if (this.errors0 !== {} && value !== this.amount0) {
                this.fetching = true;
                await this.getPair();
                const liquidity = await this.getAmountsLiquidity(
                    this.pairObject,
                    { oneZeroxAddress:this.pair.token0address, decimals: this.pair.decimals[0]},
                    { oneZeroxAddress:this.pair.token1address, decimals: this.pair.decimals[1]},
                    value
                )
                this.amount0 = value;
                this.amount1 = (liquidity).toString();
                await this.updatePrice();
                this.fetching = false;
            }

        },
        inputAmount1: async function(value){
            this.setErrors(value, 'errors1')
            if (this.errors1 !== {} && value !== this.amount1) {
                this.fetching = true;
                await this.getPair();
                const liquidity = await this.getAmountsLiquidity(
                    this.pairObject,
                    { oneZeroxAddress:this.pair.token0address, decimals: this.pair.decimals[0]},
                    { oneZeroxAddress:this.pair.token1address, decimals: this.pair.decimals[1]},
                    value
                )
                this.amount1 = value;
                this.amount0 = (liquidity).toString();
                await this.updatePrice();
                this.fetching = false;
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
        amount0: '0',
        amount1: '0',
        price: '0',
        errors0: {},
        errors1: {},
        };
    },
};
</script>
