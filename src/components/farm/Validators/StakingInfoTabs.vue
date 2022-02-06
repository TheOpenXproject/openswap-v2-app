<template>
  <div class="flex w-full flex-wrap lg:pl-8" v-if="validator ">
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap py-2 flex-row">
        <li v-if="watWallet == 'metamask'" class="-mb-px lg:mr-2 last:mr-0 ss:mb-2 flex-auto lg:w-max text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{ 'bg-gray-500 hover:bg-gray-500 dark:bg-oswapDark-gray-500 dark:hover:bg-gray-500 ': openTab !== 1, 'text-white bg-gray-100': openTab === 1 }"> Staking </a>
        </li>
        <li v-if="watWallet == 'metamask'" class="-mb-px lg:mr-2 last:mr-0 ss:mb-2 flex-auto ml-1 lg:w-max text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{ 'bg-gray-500 hover:bg-gray-500 dark:bg-oswapDark-gray-500 dark:hover:bg-gray-500 ': openTab !== 2, 'text-white bg-gray-100': openTab === 2 }"> Unstaking </a>
        </li>
        <!-- ---------------------------  -->
        <li v-if="watWallet != 'metamask'" class="-mb-px lg:mr-2 last:mr-0 ss:mb-2 flex-auto lg:w-max text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(1)" v-bind:class="{ 'bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 ': openTab !== 1, 'text-white bg-oswapGreen': openTab === 1 }"> Staking </a>
        </li>
        <li v-if="watWallet != 'metamask'" class="-mb-px lg:mr-2 last:mr-0 ss:mb-2 flex-auto ml-1 lg:w-max text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{ 'bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 ': openTab !== 2, 'text-white bg-oswapGreen': openTab === 2 }"> Unstaking </a>
        </li>
        <li class="-mb-px lg:mr-2 last:mr-0 ss:mb-2 flex-auto ml-1 lg:w-max text-center">
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{ 'bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 ': openTab !== 3, 'text-white bg-oswapGreen': openTab === 3 }">Settings</a>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words bg-gray-200 dark:bg-oswapDark-gray w-full rounded mb-2">
        <div class="p-3 flex-auto">
          <div class="tab-content tab-space">
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
              <h5 class="flex ">Set Compounding farm</h5>
              <button @click="resetCompounding()" :class="isFifteen()">
                <p class="text-sm p-1 px-3">Reset!</p>
              </button> 
               <div class="w-full"  v-for="(pool, index) in this.compoundableFarms">
              
                <PoolHeader :pool="pool" :poolData="this.compoundableFarms0[index]" />

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




export default {
  name: "StakingInfoTabs",
  mixins:[openswap],
  components: {
    PoolHeader
  },
  props: {
    validator: Object,
  },
  data() {
    return {
      selFarm: "",
      openTab: 1,
      amount: "",
      rewardTo: "",
      watWallet: "",
      pids: [0,1,11,10,12],
      compoundableFarms: [],
      compoundableFarms0: []
    };
  },
  mounted(){
    let farms = this.getFarmData()
    let farms0 = this.getFarmPair()
    console.log(farms0)
    let compoundableFarms = []
    let compoundableFarms0 = []
    for(let i in farms){
      let n = 0;
      while(n < this.pids.length){
        if(farms[i].pool.pid == this.pids[n]){
          this.compoundableFarms.push(farms[i].pool)
          farms0[i].index = n
          this.compoundableFarms0.push(farms0[i])
        }

        n++
      }
      
    }
    console.log(this.compoundableFarms)
    console.log(this.compoundableFarms0)
    this.watWallet = this.getWalletType()
    if(this.watWallet == 'metamask'){
      this.openTab = 3
    }
  },
  methods: {
     ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress', 'getWallet', 'getWalletType',  'getChainID']),
     ...mapGetters('farm/farmData', ['getFarmData', 'getFarmPair']),
    delegateVal:async function(){
      await this.delegateValidator(this.amount,this.validator.address)
    },
    unDelegateVal:async function(){
      await this.unDelegateValidator(this.amount,this.validator.address)
    },
    setRatioVal:async function(){
      await this.setRatioValidator(this.amount)
    },
    setRewardTo:async function(){
      await this.setValRewardTo(this.rewardTo)
    },
    resetCompounding:async function(){
      await this.setValCompounding(0, false)
    },
    toggleTabs: function (tabNumber) {
      if(this.watWallet == 'oneWallet'){
        this.openTab = tabNumber;
      }
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
