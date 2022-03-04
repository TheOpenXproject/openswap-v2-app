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
  import openswap from "@/shared/openswap.js";
  const { SDK } = require("openswap-app-sdk")
const { pools } = require("@/store/modules/farm/pools.js");const { toBech32 } = require('@harmony-js/crypto')



  export default {
    name: 'OpenSwap',
    mixins: [openswap],
    components: {
      Header,
      Footer,
    },
    created() {
      window.addEventListener('scroll', this.handleScroll);
    },
    mounted: async function() {
      let walletType = localStorage.getItem("oSwap\_theme");
      if(walletType !== null){
        if (walletType == '0') {
          this.setWalletType('metamask');
        }else{
          this.setWalletType('oneWallet');
        }
      }else{
        this.setWalletType('metamask');
      }
      let theme = localStorage.getItem("walletmode");
      if (theme) {
        this.setTheme(theme);
      } else {
        localStorage.setItem("oSwap\_theme", 'dark');
      }
   const CHAIN_ID = 1666600000
      const Multicall = "0x34b415f4d3b332515e66f70595ace1dcf36254c5"
      console.log(pools)
      var farmPairAddr = []
      for(var x in pools[CHAIN_ID].pools){
        farmPairAddr.push(pools[CHAIN_ID].pools[x].pairaddress)
      }
      var farms = []
      var soloFarms = []

      for(var i in pools[CHAIN_ID].pools){
        farms.push(pools[CHAIN_ID].pools[i])
      }

      var validatorAddresses = []
      var soloFarmsArr = []

      const valContracts = this.getValContracts(this.getChainID())
      for(let r in valContracts){
        validatorAddresses.push(valContracts[r].validator)
      }

      for(var w in pools[CHAIN_ID].SoloPools){
        soloFarmsArr.push(pools[CHAIN_ID].SoloPools[w])
      }


      var sdk  = new SDK(CHAIN_ID, Multicall)
      let pairs = await sdk.initPairsWithAddresses(farmPairAddr) 

      let supply = await sdk.getOpenXSupply()
      let burnt = await sdk.getOpenXBurnt()

      this.setOpenXBurnt(burnt)
      this.setOpenXSupply(supply)
      await sdk.initFarms(farms)
      let oneBalance = await this.getOneBalance()

      this.setOneBalance(oneBalance)

      let onePrice = await sdk.getOnePrice()
      let oxPrice = await sdk.getOpenXPrice()

      this.setOnePrice(onePrice)
      this.setOpenXPrice(oxPrice)


 
      this.enabled = localStorage.getItem("oSwap\_enable_farms") === 'true' ? true : false;
  

          const user = this.getUserAddress()
          let vals = await sdk.initValidator(validatorAddresses, toBech32(user), valContracts)
          this.setValidatorData(vals)
          await sdk.initBalances(user)
          var tokens = await sdk.getTokens()
          farms = await sdk.getFarms()
          soloFarms = await sdk.getSoloFarmData(soloFarmsArr ,user)
          console.log( "kjskjskjskjksj " )
          console.log(soloFarms)

          const TVL = sdk.getTVL()
          const pending = sdk.getTotalPending()
          const userStake = sdk.getTotalStakedUser()

         const userRewardsPerWeek = sdk.getTotalRewardsPerWeek()
         const avgAPRTotal = sdk.getTotalAPR()
         const avgAPRUser =  sdk.getStakedAPR()
          

          this.setUserRewardsPerWeek(userRewardsPerWeek)
          this.setUserAPR(avgAPRUser)
          this.setStakedAPR(avgAPRTotal)
          this.setTVL(TVL)
          this.setPendingRewards(pending)
          this.setUserStakeTotal(userStake)
          this.setTokensState(tokens)

          const sortedFarms = this.sortFarms(farms);
          this.setFarms(sortedFarms)
          this.setSoloFarms(soloFarms)


            await setInterval(async function(){
            var sdk  = new SDK(CHAIN_ID, Multicall)
            let pairs = await sdk.initPairsWithAddresses(farmPairAddr) 


            await sdk.initFarms(farms)
            let onePrice = await sdk.getOnePrice()
            let oxPrice = await sdk.getOpenXPrice()

      this.setOnePrice(onePrice)
      this.setOpenXPrice(oxPrice)

          const user = this.getUserAddress()
          const valData = await sdk.initValidator(validatorAddresses, toBech32(user), valContracts)
          let userDelegationTotal = 0
          for(var x in valData.userDelegatedTotal){
            userDelegatedTotal += valData.userDelegatedTotal[x]
          }

          this.setValidatorData(valData)
          await sdk.initBalances(user)
          tokens = await sdk.getTokens()

          farms = await sdk.getFarms()
           soloFarms = await sdk.getSoloFarmData(soloFarmsArr ,user)

          const TVL = sdk.getTVL()
          const pending = sdk.getTotalPending()
          const userStake = sdk.getTotalStakedUser()

          const userRewardsPerWeek = sdk.getTotalRewardsPerWeek()
          const avgAPRTotal = sdk.getTotalAPR()
          const avgAPRUser =  sdk.getStakedAPR()
          

          this.setUserRewardsPerWeek(userRewardsPerWeek)
          this.setUserAPR(avgAPRUser)
          this.setStakedAPR(avgAPRTotal)
          this.setTokensState(tokens)
          



          this.setTVL(TVL)
          this.setPendingRewards(pending)
          this.setUserStakeTotal(userStake)
          const sortedFarms = this.sortFarms(farms);
          this.setFarms(sortedFarms)
          this.setSoloFarms(soloFarms);
      }.bind(this), 15000)


    },

    computed: {
      ...mapGetters('user', ['getIsScrolled', 'getColorTheme']),
      ...mapGetters("addressConstants", ["hMULTICALL", "hRPC", "oSWAPCHEF", 'getValContracts']),
    },
    
    methods: {
      ...mapActions('farm/farmData', ['setFarms', '']),
      ...mapActions("farm/farmData", ["setSoloDataState", "setCustomDataState", "setFarms", "setUserStakeTotal", "setTVL", "setPendingRewards", "setOnePrice", "setOpenXPrice", "setTotalAPR", "setStakedAPR", "setUserAPR", "setUserRewardsPerWeek","setValidatorData","setOpenXBurnt","setOpenXSupply","setSoloFarms", "setTokensState", "setOneBalance"]),
      ...mapActions('user', ['setIsScrolled', 'setTheme']),
      ...mapActions('wallet', ['setWalletType']),
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
