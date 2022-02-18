<template>
  <transition name="horizontal">
    <div v-if="isOpen" class="flex flex-col h-full w-full justify-between absolute">
      <div class="flex flex-col dark:bg-oswapDark-gray py-2 bg-gray-100 rounded-2xl">
        <div class="flex shadow-lg dark:bg-oswapDark-gray bg-gray-100 p-3 rounded-2xl">
          <div class="flex flex-1 items-center justify-between relative">
            <div class="flex h-full flex-col justify-between">
              <p class="text-xs text-oswapGreen-dark">Your Unclaimed Rewards</p>
              <p class="text-2xl dark:text-gray-300">{{pool.user.pendingRewardsBal.toFixed(5)}}</p>
            </div>
<!--
            <div v-if="parseFloat(this.getEthUnits(this.poolData.pendingReward)).toFixed(6) > 0" class="glow-collect -right-1.5 z-20"></div>
            
            <div  class="absolute -right-1 w-32 h-14 z-30 flex space-x-2 items-center justify-center rounded-lg bg-gray-100 group-scope dark:bg-oswapDark-gray border border-gray-300 dark:border-gray-500 select-none">
              <i class="las la-hand-holding-usd text-3xl text-gray-300 dark:text-gray-500"></i>
              <p class="text-lg text-gray-300 dark:text-gray-500">Collect !</p>
            </div>
            -->
            <div @click="this.collectOSWAP(this.pool)" class="absolute -right-1 w-32 h-14 z-30 flex space-x-2 items-center justify-center rounded-lg bg-gray-100 group-scope dark:bg-oswapDark-gray hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
              <i class="las la-hand-holding-usd text-3xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
              <p class="text-lg text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Collect !</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 pt-3 pb-3 px-3">
          <div class="flex h-12 space-x-2">
            <div class="flex items-start h-full">
              <i class="las la-balance-scale-left text-xl text-oswapGreen"></i>
            </div>
            <div class="flex flex-col h-full justify-between">
              <p class="text-xs text-oswapBlue-light">Stake Weight</p>
              <p class="text-lg dark:text-gray-400">{{(this.pool.user.stakeWeight).toFixed(5)}} %</p>
            </div>
          </div>
          <div class="flex h-12 space-x-2">
            <div class="flex items-start h-full">
              <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden">
                <img :src="pool.imgtoken0" class="h-4" alt="">
              </div>
            </div>
            <div class="flex flex-col h-full justify-between pt-0.5">
              <p class="text-xs text-oswapBlue-light">{{pool.name[0]}} Staked</p>
              <p class="text-lg dark:text-gray-400">{{pool.user.lpStakedBal.toFixed(5)}}</p>
            </div>
          </div>


          <!--
           <div class="flex h-12 space-x-2">
            <div class="flex items-start h-full">
              <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden">
                <i class="las la-money-bill text-xl text-oswapGreen"></i>

              </div>
            </div>
            <div class="flex flex-col h-full justify-between pt-0.5">
              <p class="text-xs text-oswapBlue-light">{{pool.name[0]}} Price</p>
              <p class="text-lg dark:text-gray-400">${{pool.token0PriceUsd.toFixed(5)}}</p>
            </div>
          </div>
          <div class="flex h-12 space-x-2">
            <div class="flex items-start h-full">
              <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden">
                <i class="las la-money-bill text-xl text-oswapGreen"></i>

              </div>
            </div>
            <div class="flex flex-col h-full justify-between pt-0.5">
              <p class="text-xs text-oswapBlue-light">{{pool.name[1]}} Price</p>
              <p class="text-lg dark:text-gray-400">${{pool.token1PriceUsd.toFixed(5)}}</p>
            </div>
          </div>
        -->
        </div>
      </div>

      <div class="flex flex-col ml-2 mt-2 mb-1 py-2 space-y-2 justify-between">
        <div class="flex space-x-2 h-5 items-center">
          <i class="las la-calendar-day dark:text-oswapGreen"></i>
          <p class="text-sm font-thin dark:text-gray-400">Expected Weekly Rewards: $ {{ pool.user.rewardsPerWeek.toFixed(5) }}</p>
        </div>
        <div class="flex space-x-2 h-5 items-center">
          <i class="las la-calendar dark:text-oswapGreen"></i>
          <p class="text-sm font-thin dark:text-gray-400">Expected Monthly Rewards: $ {{ (pool.user.rewardsPerWeek*4.34).toFixed(5)}}</p>
        </div>
        <div class="flex space-x-2 h-5 items-center">
          <i class="las la-coins dark:text-oswapGreen"></i>
          <p class="text-sm font-thin dark:text-gray-400">{{pool.name[0]}} Tokens Available: {{ pool.user.lpTokenBal.toFixed(5) }}</p>
        </div>
      </div>

      <div class="flex flex-none items-center py-2 justify-end space-x-2">
        <!-- Unstake Button -->
        <div @click="this.$emit('setPool', 'unstake')" class="flex items-center space-x-2 pl-3 pr-1 rounded-full h-9 group-scope hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
          <p class="text-sm text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Unstake</p>
          <i class="las la-sign-out-alt text-2xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
        </div>
        <!-- Stake Button -->
        <div @click="this.$emit('setPool', 'stake')" class="flex items-center space-x-2 pl-3 pr-1 rounded-full h-9 group-scope hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
          <p class="text-sm text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray">Stake</p>
          <i class="las la-sign-in-alt text-2xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
        </div>
        <!-- Close Button -->
        <div @click="closeStats()" class="flex items-center justify-center rounded-full h-9 w-9 group-scope hover:bg-oswapGreen dark:hover:bg-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer">
          <i class="las la-times text-xl text-oswapGreen-dark group-scope-hover:text-gray-50 dark:text-oswapGreen dark:group-scope-hover:text-oswapDark-gray"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import openswap from "@/shared/openswap.js";
  export default {
    name: 'PoolStatsInfo',
    mixins: [openswap],
    props: {
      isOpen: Boolean,
      pool: Object,
    },
    data() {
      return {
        tooltip: {
          name: new Date().getTime(),
          position: 'top',
          color: 'rgba(24, 213, 187, 1)',
          offset: 16,
          speed: 200,
          shift: 50
        },

        stakeWeight: '0 ',
        stakeWeight: '0 ',
        weeklyRewards: '0.00',
        monthlyRewards: '0.00'
      } 
    },

    methods: {
      closeStats() {
        this.$emit('setPool', 'close')
        if (window.innerWidth >= 768) {
          this.oswapEmit.emit("recalc-tooltips");
        }
      }
    }
  }
</script>