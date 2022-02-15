<template>
  <div id="farm" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center justify-center oswap-layout xl:px-0 px-3 text-gray-500">
    <transition name="fall" appear>
      <FarmHeader v-if="this.getFarms() != null" />
    </transition>

    <transition name="fall" appear>
      <div v-if="this.getFarms() != null" class="flex-wrap w-full">
        <StakingInfo />
      </div>
    </transition>

    <transition name="fall" appear>
      <div class="w-full" v-if="this.getFarms() != null && this.getSoloFarms() != null">
        <div class="flex flex-none p-2 my-2">
          <SwitchGroup>
            <div class="flex items-center">
              <SwitchLabel class="mr-4">Show only staked pools</SwitchLabel>
              <Switch
              v-model="enabled"
              @click="setEnabled(enabled)"
              :class='enabled ? "bg-oswapGreen-dark" : "bg-gray-500"'
              class="relative inline-flex items-center h-4 transition-colors rounded-full w-10 focus:outline-none"
              >
              <span
              :class='enabled ? "translate-x-6 bg-opaqueDark-light" : "translate-x-1 bg-white dark:bg-oswapDark-dark"'
              class="inline-block w-4 h-4 transition-transform transform rounded-full"
              />
            </Switch>
          </div>
        </SwitchGroup>
      </div>
      <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-1 gap-3 w-full">
          
          <template v-for="(solopool, index) in this.getSoloFarms()"  :key="index">
            <SoloFarmPair :class="parseFloat(solopool.user.lpStakedBal).toFixed(5) > 0 || !enabled ? '':'hidden'" :pool="solopool" />
          </template>
        
        <template  v-for="(pool, index) in this.getFarms()"  :key="index">
          <FarmPair :class="parseFloat(pool.user.lpStakedBal).toFixed(5) > 0 || !enabled ? '':'hidden'" :pool="pool" />
        </template>
      </div>
    </div>

    <div v-else class="flex h-full items-center mt-16">
      <Loading/>
    </div>
  </transition>
</div>
</template>

<script>
  import Loading from "@/components/Loading";
  import FarmHeader from "@/components/farm/FarmHeader";
  import FarmPair from "@/components/farm/FarmPair";
  import SoloFarmPair from "@/components/farm/SoloFarmPair";
  import StakingInfo from "@/components/farm/Validators/StakingInfo";
  import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
  import openswap from "@/shared/openswap.js";

  import { createWatcher } from "@makerdao/multicall";
  import { mapGetters, mapActions } from "vuex";

  const { pools } = require("@/store/modules/farm/pools.js");
  export default {
    name: "Farm",
    mixins: [openswap],
    components: {
      FarmHeader,
      Loading,
      FarmPair,
      SoloFarmPair,
      StakingInfo,
      Switch, 
      SwitchGroup, 
      SwitchLabel 
    },
    mounted: async function () {





    },
    data() {
      return {
        enabled: false,
        loaded:false,
        Pools: null,
        SoloPools: null,
        farmData: null,
        soloData: null,
        haveWarnings: true,
        warnings: {},
        rewardsPerTimeObj: {
          monthly: [],
          weekly: [],
        },
        farmHeaderData: {
          rewardsPending: 0,
          TVL: 0,
          PVL: 0,
          APRs: {
            pAPR: 0,
            tAPR: 0,
          },
          chartData: {
            name: [],
            liquidity: [],
          },
        },
      };
    },
    computed: {
      ...mapGetters("addressConstants", ["oSWAPMAKER", "oSWAPCHEF", "hMULTICALL", "hRPC"]),
    },
    methods: {
      ...mapGetters("farm/farmData", [ "getFarms", "getSoloFarms"]),
      ...mapGetters("wallet", [ "getUserAddress"]),
      ...mapActions("farm/farmData", ["setSoloDataState", "setCustomDataState", "setFarms", "setUserStakeTotal", "setTVL", "setPendingRewards", "setOnePrice", "setOpenXPrice", "setTotalAPR", "setStakedAPR", "setUserAPR", "setUserRewardsPerWeek"]),
      setEnabled: function (value) {
        localStorage.setItem("oSwap\_enable_farms", value);
        console.log(value)
      },
      updateFarms: async function(){
        this.Pools = this.getFarms();
      }
    },
  };
</script>
