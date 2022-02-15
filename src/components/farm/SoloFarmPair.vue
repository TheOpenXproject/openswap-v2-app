<template>
  <div class="flex flex-col p-3 st5 st5-all group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray rounded-3xl border-l border-oswapGreen">
    <!-- Header -->
    <PoolHeader  :pool="pool" />
    <!-- Body -->
    <div class="flex flex-col h-full mt-3 pb-3 relative">
      <!-- Show this when pool details is closed -->
      <PoolStatsClosed @setPool="setPool" :isOpen="poolStatsOff" :pool="pool" />

      
      <PoolStatsInfo   :isOpen="poolStatsOn" :pool="pool" @setPool="setPool" />

     
      <PoolStake :isOpen="poolStakeOn" :maxAmount="pool.user.lpTokenBalBigString" :pool="pool" @setPool="setPool"   />

          <PoolUnstake :isOpen="poolUnstakeOn" :maxAmount="pool.user.lpStakedBalBigString" :pool="pool" @setPool="setPool" />
    </div>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";

  import PoolHeader from "@/components/farm/SoloFarmPair/PoolHeader"
  import PoolStatsClosed from "@/components/farm/SoloFarmPair/PoolStatsClosed"
  import PoolStatsInfo from "@/components/farm/SoloFarmPair/PoolStatsInfo"
  import PoolStake from "@/components/farm/SoloFarmPair/PoolStake"
  import PoolUnstake from "@/components/farm/SoloFarmPair/PoolUnstake"

  export default {
    name: 'FarmPair',
    props: {
      pool: Object,
      poolData: Object,
    },
    components: {
      PoolHeader,
      PoolStatsClosed,
      PoolStatsInfo,
      PoolStake,
      PoolUnstake
    },
    mixins: [openswap],
    mounted: async function (){
      
    },
    data() {
      return {
        //pool: null,
        poolStatsOff: true,
        poolStatsOn: false,
        poolStakeOn: false,
        poolUnstakeOn: false
      }
    },
    methods: {
      updateTVL(value){
        this.$emit("updateTVL", value)
      },
      rewardsPerTime(value){
        this.$emit("rewardsPerTime", value)
       
      },
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