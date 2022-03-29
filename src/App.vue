<template>
  <div id="root" :class="getColorTheme" class="antialiased pt-18">
    <div id="header" :class="getIsScrolled ? 'shadow-xl' : ''" class="flex flex-1 fixed inset-x-0 top-0 st5 bg-gradient-to-r dark:from-oswapDark-gray dark:to-slightDark from-gray-300 to-slightGray z-50">
      <Header />
    </div>

    <div id="body" class="flex w-full oswap-layout z-20 st5 bg-gradient-to-r from-gray-300 to-slightGray dark:from-oswapDark-gray dark:to-slightDark">
      <router-view />
    </div>

    <div id="footer" class="w-full h-full z-40 st5 bg-gradient-to-r from-gray-300 to-slightGray dark:from-oswapDark-gray dark:to-slightDark">
      <Footer />
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header';
  import Footer from '@/components/Footer';
  import { mapActions, mapGetters } from 'vuex';
  import stateloader from "@/shared/stateloader.js";
  import { ethers } from "ethers";

  const { SDK } = require("openswap-app-sdk")
  const { pools } = require("@/store/modules/farm/pools.js");
  const { toBech32 } = require('@harmony-js/crypto')



  export default {
    name: 'OpenSwap',
    mixins: [stateloader],
    components: {
      Header,
      Footer,
    },
    created() {
      window.addEventListener('scroll', this.handleScroll);
    },
    mounted: async function() {
      
      let theme = localStorage.getItem("oSwap\_theme");

      if (theme) {
        this.setTheme(theme);
      } else {
        localStorage.setItem("oSwap\_theme", 'dark');
      }
      let timeout;
        if (this.getUserSignedIn()) {
            timeout = 1;
        } else {
            timeout = 3000;
        }
        await setTimeout(
        async function () {
      console.log(await this.UpdateState())
}.bind(this),
            timeout
        );

    },

    computed: {
      ...mapGetters('user', ['getIsScrolled', 'getColorTheme']),

      ...mapGetters("addressConstants", ["hMULTICALL", "hRPC", "oSWAPCHEF", 'getValContracts']),
    },
    
    methods: {
      ...mapGetters('wallet', ['getUserSignedIn', 'getChainID']),
      ...mapActions('exchange/swapper', ['setAllPairs']),
      ...mapActions('farm/farmData', ['setFarms']),
      ...mapActions("farm/farmData", ["setSoloDataState", "setCustomDataState", "setFarms", "setUserStakeTotal", "setTVL", "setPendingRewards", "setOnePrice", "setOpenXPrice", "setTotalAPR", "setStakedAPR", "setUserAPR", "setUserRewardsPerWeek","setValidatorData","setOpenXBurnt","setOpenXSupply","setSoloFarms", "setTokensState", "setOneBalance"]),
      ...mapActions('user', ['setIsScrolled', 'setTheme']),
      handleScroll() {
        this.setIsScrolled(window.scrollY > 0)
      },
      /// This should go inside the sdk to make sure everything has the same order imo
      /// if you can would be good to copy this and use it there
      /// Also you need to add a category field to the farm
      /// 1 is for OpenX / ONE
      /// 2 is for OpenX related pairs
      /// 3 is for ONE pairs
      /// 4 is for Stable pairs
      /// 5 is for the rest
      sortFarms(farms) {
        return farms.sort((elemA,elemB) =>{
              if (elemA?.category < elemB?.category) {
                  return -1
              } 
              if (elemA?.category > elemB?.category) {
                  return 1
              } 
              return 0
          })
      }
    },
  };
</script>
