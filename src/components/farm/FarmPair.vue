<template>
  <div class="flex flex-col p-3 st5 st5-all group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray rounded-3xl border-l border-oswapGreen">
    <!-- Header -->
    <PoolHeader  :pool="pool" />
    <!-- Body -->
    <div class="flex flex-col h-full mt-2 pb-3 relative">
      <!-- Show this when pool details is closed -->
      <PoolStatsClosed @setPool="setPool" :isOpen="poolStatsOff" :pool="pool" />

      <!-- <div v-if="isOpen" class="fixed inset-0 bg-gray-700 bg-opacity-30"></div> -->
      <!-- Show this when pool details is opened -->
      <PoolStatsInfo   :isOpen="poolStatsOn" :pool="pool" @setPool="setPool" />

      <!-- Show this when the pool is opened and clicked on Stake -->
      <PoolStake :isOpen="poolStakeOn" :maxAmount="pool.user.lpTokenBalBigString" :pool="pool" @setPool="setPool"   />

      <!-- Show this when the pool is opened and clicked on Unstake -->
      <PoolUnstake :isOpen="poolUnstakeOn" :maxAmount="pool.user.lpStakedBalBigString" :pool="pool" @setPool="setPool"  />
    </div>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";

  import PoolHeader from "@/components/farm/FarmPair/PoolHeader";
  import PoolStatsClosed from "@/components/farm/PoolStatsClosed";
  import PoolStatsInfo from "@/components/farm/FarmPair/PoolStatsInfo";
  import PoolStake from "@/components/farm/FarmPair/PoolStake";
  import PoolUnstake from "@/components/farm/FarmPair/PoolUnstake";

  export default {
    name: 'FarmPair',
    props: {
      pool: Object,
    },
    components: {
      PoolHeader,
      PoolStatsClosed,
      PoolStatsInfo,
      PoolStake,
      PoolUnstake
    },
    mixins: [openswap],
    mounted: async function() {},
    data() {
      return {
        poolStatsOff: true,
        poolStatsOn: false,
        poolStakeOn: false,
        poolUnstakeOn: false,
      }
    },
    methods: {
      setPool(value) {
        if (value == 'open') {
          this.$el.classList.add('row-span-3', 'ensure-height', 'ring-1', 'ring-inset', 'ring-oswapGreen');
          this.poolStatsOff = false
          this.poolStatsOn = true
        }

        if (value == 'close') {
          this.$el.classList.remove('row-span-3', 'ensure-height', 'ring-1', 'ring-inset', 'ring-oswapGreen');
          this.poolStatsOn = false
          this.poolStatsOff = true
        }

        if (value == 'stake') {
          this.poolStatsOn = false
          this.poolStakeOn = true
        }

        if (value == 'stats') {
          this.poolStakeOn = false
          this.poolUnstakeOn = false
          this.poolStatsOn = true
        }

        if (value == 'unstake') {
          this.poolStatsOn = false
          this.poolUnstakeOn = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ensure-height {
    height: 420px;
  }
</style>