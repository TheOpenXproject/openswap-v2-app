<template>
  <transition name="horizontal">
    <div v-if="isOpen" class="flex flex-col justify-between h-full w-full absolute">
      <Chart v-if="amount != null" :amount="amount" :key="amount" :rewardPerWeek="rewardsPerWeek"/>
      <transition name="fall" appear>
        <div class="flex flex-1 justify-center flex-wrap text-center">
            <div class="flex flex-col text-gray-600 dark:text-gray-300 p-2">
                <p class="ss:text-md xs:text-lg font-extrabold">${{parseFloat(rewardsPerWeek / 7).toFixed(3)}}</p>
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Daily</p>
            </div>
            <div class="flex flex-col text-gray-600 dark:text-gray-300 p-2">
                <p class="ss:text-md xs:text-lg font-extrabold">${{parseFloat(rewardsPerWeek).toFixed(3)}}</p>
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Weekly</p>
            </div>
            <div class="flex flex-col text-gray-600 dark:text-gray-300 p-2">
                <p class="ss:text-md xs:text-lg font-extrabold">${{parseFloat(rewardsPerWeek *4.4).toFixed(3)}}</p>
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Monthly</p>
            </div>
            <div class="flex flex-col text-gray-600 dark:text-gray-300 p-2">
                <p class="ss:text-md xs:text-lg font-extrabold">${{parseFloat(rewardsPerWeek *4.4 * 12).toFixed(3)}}</p>
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Yearly</p>
            </div>
        </div>
    </transition>
    <div class="flex space-x-2">
           <div @click="setPool()" class="flex h-9 items-center space-x-2 ss:space-x-0 sm:space-x-2 md:space-x-0 xl:space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 pr-3 ss:pr-0 sm:pr-3 md:pr-0 xl:pr-3 cursor-pointer">
          <i class="las la-arrow-left text-lg p-2 text-gray-500 dark:text-oswapBlue-light rounded-full bg-gray-100 dark:bg-oswapDark-gray group-hover:bg-oswapGreen dark:group-hover:text-oswapDark-gray group-hover:text-gray-100 border-2 border-gray-200 dark:border-gray-700"></i>
          <p class="ss:hidden sm:block md:hidden xl:block text-sm text-gray-500 dark:text-oswapBlue-light">back</p>
        </div>
        </div>
    </div>
  </transition>
</template>

<script>
  import InputWithValidationLiquidity from "@/components/InputWithValidation"
  import openswap from "@/shared/openswap.js";
  import Chart from '@/components/farm/Chart'

  export default {
    name: 'PoolUnstake',
    mixins: [openswap],
    components: {
      InputWithValidationLiquidity,
      Chart
    },
    props: {
      pool: Object,
      isOpen: Boolean,
    },
    data() {
      return {
        errors: {},
        buttonState: 'disabled',
        rewardsPerWeek: null,
        amount: "",
        farm: null,
      }
    },
     mounted() {

      this.rewardsPerWeek = this.pool.usdPerWeek * this.pool.user.stakeWeight / 100
      console.log(this.rewardsPerWeek)
      this.amount = this.pool.user.stakeValue.toString()
      console.log(this.amount)
    },
    methods: {
      inputAmount: async function(value){
        //if (this.errors !== {} && value !== this.amount) {
            this.amount = value

           

      },
      unstake: async function() {
        this.buttonState = 'executing';
        await this.unstakeLP(this.pool, this.amount);
        this.buttonState = 'active';
      },
      setPool() {
        this.$emit('setPool', 'stats')
      }
    }
  }
</script>