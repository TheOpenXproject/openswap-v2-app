<template>
  <div class="flex w-full flex-wrap lg:pl-8" v-if="validator ">
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap py-2 flex-row">
        <li class="-mb-px lg:mr-2 last:mr-0 ss:mb-2 flex-auto lg:w-max text-center cursor-pointer">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(0)" v-bind:class="{ 'bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 ': openTab !== 0, 'text-white bg-oswapGreen': openTab === 0 }"> Info </a>
        </li>
        <li class="-mb-px lg:mr-2 last:mr-0 ss:mb-2 flex-auto lg:w-max text-center cursor-pointer">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{ 'bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 ': openTab !== 1, 'text-white bg-oswapGreen': openTab === 1 }"> Staking </a>
        </li>
        <li class="-mb-px lg:mr-2 last:mr-0 ss:mb-2 flex-auto ml-1 lg:w-max text-center cursor-pointer">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{ 'bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 ': openTab !== 2, 'text-white bg-oswapGreen': openTab === 2 }"> Unstaking </a>
        </li>
        <li class="-mb-px lg:mr-2 last:mr-0 ss:mb-2 flex-auto ml-1 lg:w-max text-center cursor-pointer">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{ 'bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 ': openTab !== 3, 'text-white bg-oswapGreen': openTab === 3 }">Settings</a>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words bg-gray-200 dark:bg-oswapDark-gray w-full rounded mb-2">
        <div class="p-3 flex-auto">
          <div class="tab-content tab-space">
            <div v-bind:class="{ 'hidden h-full': openTab !== 0, 'h-full flex flex-wrap justify-between': openTab === 0 }">
              <h5 class="w-full">Stake Amount:</h5>
              <InfoTab v-if="this.sortedFarms != []" :validator="this.validator" :myAPY="this.myAPY" :highestAPY="this.highest" :lowestAPY="lowest"/>
            </div>

            <div v-bind:class="{ 'hidden h-full': openTab !== 1, 'h-full flex flex-wrap justify-between': openTab === 1 }">
              <h5 class="w-full">Stake Amount:</h5>
              <input type="text" v-model="amount" class="ring-black mt-2 ring-opacity-10 focus:ring-oswapGreen ring-1 focus:outline-none rounded-xl flex ss:w-full lg:w-9/12 z-20 bg-gray-100 py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" placeholder="Amount to Stake" />
              <button @click="delegateVal()" class="flex w-full mt-2 lg:w-2/12 items-center justify-center rounded-xl border border-oswapGreen st5 text-oswapGreen hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark">
                <p class="text-sm p-1 px-3">Stake!</p>
              </button>
            </div>
            <div v-bind:class="{ 'hidden h-full': openTab !== 2, 'h-full flex flex-wrap justify-between': openTab === 2 }">
              <h5 class="w-full">Unstake Amount:</h5>
              <p class="text-sm text-red-300">Note: It takes 7 epochs to undelegate.</p>
              <input type="text" v-model="amount" class="ring-black mt-2 ring-opacity-10 focus:ring-oswapGreen ring-1 focus:outline-none rounded-xl flex ss:w-full lg:w-9/12 z-20 bg-gray-100 py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" placeholder="Amount to Unstake" />
              <button @click="unDelegateVal()" class="flex w-full lg:w-2/12 mt-2 items-center justify-center rounded-xl border border-oswapGreen st5 text-oswapGreen hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark">
                <p class="text-sm p-1 px-3">Unstake!</p>
              </button>
            </div>
            <div v-bind:class="{ 'hidden h-full': openTab !== 3, 'h-full flex flex-wrap justify-between': openTab === 3 }">
              <div class="w-full pt-3 pb-6">
              <h5 class="w-full">Set Reward Ratio Openx:One</h5>
              <p class="text-sm text-oswapGreen-300">Set ratio of rewards in Openswap Tokens.</p>
               <div class="flex justify-between items-center">
              <input type="text" v-model="amount" class="ring-black mt-2 ring-opacity-10 focus:ring-oswapGreen ring-1 focus:outline-none rounded-xl flex ss:w-full lg:w-9/12 z-20 bg-gray-100 py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" :placeholder="100 - validator.oxratio" />
              <button @click="setRatioVal()" :class="isFifteen()">
                <p class="text-sm p-1 px-3">Set!</p>
              </button>
            </div>
              </div>
              <div class="flex flex-1 items-center justify-between">
                <h5 class="flex ">Set Compounding farm</h5>
                <button @click="resetCompounding()" :class="isFifteen()">
                  <p class="text-sm p-1 px-3">Reset!</p>
                </button> 
              </div>
             
               <div class="w-full"  v-for="(pool, index) in this.compoundableFarms0">
              
                <PoolHeader :pool="pool" :farmPair="this.validator.farmPair" :compActive="this.validator.isCompounding" :index="this.validator.index" :indice='index' :poolData="this.compoundableFarms0[index]" />

              </div>
               <div class="w-full pt-3">
              <h5 class="w-full">Set Reward Receiver</h5>
              <p class="text-sm text-oswapGreen-300">Set an other wallet to receive rewards to.</p>
               <div class="flex justify-between items-center">
              <input type="text" v-model="rewardTo" class="ring-black mt-2 ring-opacity-10 focus:ring-oswapGreen ring-1 focus:outline-none rounded-xl flex ss:w-full lg:w-9/12 z-20 bg-gray-100 py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" :placeholder="validator.rewardTo"/>
              <button @click="setRewardTo()" :class="isFifteen()">
                <p class="text-sm p-1 px-3">Set!</p>
              </button>

            </div>
              </div>
              <div class="w-full pt-3">
              <h5 class="w-full">Manage Rewards V4 Alpha</h5>
              <p class="text-sm text-oswapGreen-300">Manually compound or collect stuck rewards.</p>
               <div class="flex justify-between items-center">

              <button @click="this.collectRewardsVal(this.validator.index)" :class="isFifteen()">
                <p class="text-sm p-1 px-3">Collect!</p>
              </button>
              <button @click="this.compoundRewardsVal(this.validator.index)" :class="isFifteen()">
                <p class="text-sm p-1 px-3">Compound!</p>
              </button>
            </div>
              </div>
              <div class="w-full pt-3">
              <h5 class="w-full">Manage Rewards V4 Beta</h5>
              <p class="text-sm text-oswapGreen-300">Manually compound or collect stuck rewards.</p>
               <div class="flex justify-between items-center">

              <button @click="this.collectRewardsValBeta(this.validator.index)" :class="isFifteen()">
                <p class="text-sm p-1 px-3">Collect!</p>
              </button>
              <button @click="this.compoundRewardsValBeta(this.validator.index)" :class="isFifteen()">
                <p class="text-sm p-1 px-3">Compound!</p>
              </button>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import openswap from "@/shared/openswap.js";
import { parseEther } from "@ethersproject/units";
import { mapGetters } from 'vuex';
import PoolHeader from "@/components/farm/Validators/PoolHeader";
import InfoTab from "@/components/farm/Validators/InfoTab";


  const OXONE = 0 //
  const OXBUSD = 1 //
    const OXBNB = 11//
     const OXpMATIC = 30
  const OXADA = 12 //
  const OXIMMRTL = 31
   const OXUST = 32
  const OXLUNA = 33
  const OXBTC = 27


export default {
  name: "StakingInfoTabs",
  mixins:[openswap],
  components: {
    PoolHeader,
    InfoTab
  },
  props: {
    validator: Object,
  },
  data() {
    return {
      selFarm: "",
      openTab: 0,
      amount: "",
      rewardTo: "",
      watWallet: "",
      pids: [0,1,11,30,12,31,32,33,27],
      compoundableFarms: [],
      compoundableFarms0: [],
      isActive: [],
      myFarmApr: 0,
      sortedFarms: [],
      highest: 0,
      lowest:0,
      myAPY:0
    };
  },
  mounted(){
    let farms = this.getFarms()
    console.log(this.validator)
    let compoundableFarms = []
    


    for(let i in farms){
      let n = 0;
      while(n < this.pids.length){
        if(farms[i].pid == this.pids[n]){
          farms[i].index = n
          this.compoundableFarms0.push(farms[i])
          this.compoundableFarms.push(farms[i])
          
          
              if(this.validator.farmPair == farms[i].pairaddress){

              this.myFarmApr = farms[i].apr
              console.log(this.myFarmApr)
            }
        }
        n++
      }
  
    }
    let totalAPR = parseFloat(this.getApr())
     this.sortedFarms = this.compoundableFarms.sort((firstItem, secondItem) => firstItem.apr - secondItem.apr);
        this.highest = (totalAPR * ((1+this.sortedFarms[this.sortedFarms.length-1].apr/100/365)**365-1) + totalAPR).toFixed(2)
        if(this.validator.userDelegations >= 100)
        this.myAPY = (totalAPR * ((1+this.myFarmApr/100/365)**365-1) + totalAPR).toFixed(2)

        this.lowest =  (totalAPR * ((1+this.sortedFarms[0].apr/100/365)**365-1) + totalAPR).toFixed(2)
   
    console.log("lllll")
    console.log()
    console.log(this.sortedFarms)
    console.log(this.compoundableFarms0)
    console.log(this.compoundableFarms)

  },
  methods: {
     ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress', 'getWallet', 'getWalletType',  'getChainID']),
     ...mapGetters('farm/farmData', ['getFarms', 'getFarmPair']),
      getApr : function(){
        return (parseFloat(this.validator.apr) + this.validator.addedAPR).toFixed(2)
      },
     getApy : function(){
        let totalAPR = parseFloat(this.getApr)
        return (totalAPR * ((1+this.myFarmApr/100/365)**365-1) + totalAPR).toFixed(2)
      },

     collectRewardss:async function(){
      let n = await this.collectRewardsVal().catch(() => {
        return 1
      })
      if(n != 1)
      this.$emit("updateValData", null);
    },
    compoundRewardss:async function(){
      let n = await this.compoundRewardsVal().catch(() => {
        return 1
      })
      if(n != 1)
      this.$emit("updateValData", null);
    },

    delegateVal:async function(){
      let n = await this.delegateValidator(this.amount,this.validator.address, this.validator.index).catch(() => {
        return 1
      })
      if(n != 1)
      this.$emit("updateValData", null);
    },
    unDelegateVal:async function(){
      let n = await this.unDelegateValidator(this.amount,this.validator.address , this.validator.index).catch(() => {
        return 1
      })
      if(n != 1)
      this.$emit("updateValData", null);
    },
    setRatioVal:async function(){
      let n = await this.setRatioValidator(this.amount, this.validator.index).catch(() => {
        return 1
      })
      if(n != 1)
      this.$emit("updateValData", null);
    },
    setRewardTo:async function(){
      let n = await this.setValRewardTo(this.rewardTo, this.validator.index).catch(() => {
        return 1
      })
      if(n != 1)
      this.$emit("updateValData", null);
    },
    resetCompounding:async function(){
      let n = await this.setValCompounding(0, false , this.validator.index).catch(() => {
        return 1
      })
      if(n != 1)
      this.$emit("updateValData", null);
    },
    toggleTabs: function (tabNumber) {
        this.openTab = tabNumber;
    },
    isFifteen: function() {
      if(this.validator.name.includes('15%')){
        return 'disabled pointer-events-none bg-slightDark-400  flex lg:w-2/12 mt-2 items-right justify-center rounded-xl st5 text-white hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark';
      } else {
      return 'flex lg:w-2/12 mt-2 items-right justify-center rounded-xl border border-oswapGreen st5 text-oswapGreen hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark'
    }
  }
  },
};
</script>
