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
          <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal" v-on:click="toggleTabs(3)" v-bind:class="{ 'bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 ': openTab !== 3, 'text-white bg-oswapGreen': openTab === 3 }">Set Ratio</a>
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
              <h5 class="w-full">Set Reward Ratio Openx:One</h5>
              <p class="text-sm text-red-300">Note: 30% is the lowest ratio available.</p>
              <input type="text" v-model="amount" class="ring-black mt-2 ring-opacity-10 focus:ring-oswapGreen ring-1 focus:outline-none rounded-xl flex ss:w-full lg:w-9/12 z-20 bg-gray-100 py-2 items-center pl-3 dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-gray-300" placeholder="Percent in OpenX" />
              <button @click="setRatioVal()" :class="isFifteen()">
                <p class="text-sm p-1 px-3">Set!</p>
              </button>
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

/*import { Directive, StakingTransactionRequest } from "@/shared/harmony-ethers-sdk/src/types";
import Wallet from "@/shared/harmony-ethers-sdk/src/wallet";
*/
export default {
  name: "StakingInfoTabs",
  mixins:[openswap],
  props: {
    validator: Object,
  },
  data() {
    return {
      openTab: 1,
      amount: "",
      watWallet: ""
    };
  },
  mounted(){
    
    this.watWallet = this.getWalletType()
    if(this.watWallet == 'metamask'){
      this.openTab = 3
    }
  },
  methods: {
     ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress', 'getWallet', 'getWalletType',  'getChainID']),
    delegateVal:async function(){
      await this.delegateValidator(this.amount,this.validator.address)
    },
    unDelegateVal:async function(){
      await this.unDelegateValidator(this.amount,this.validator.address)
    },
    setRatioVal:async function(){
      await this.setRatioValidator(100- this.amount)
    },
    toggleTabs: function (tabNumber) {
      if(this.watWallet == 'oneWallet'){
        this.openTab = tabNumber;
      }
    },
    isFifteen: function() {
      if(this.validator.name.includes('15%')){
        return 'disabled pointer-events-none bg-red-400  flex w-full lg:w-2/12 mt-2 items-center justify-center rounded-xl st5 text-white hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark';
      } else {
      return 'flex w-full lg:w-2/12 mt-2 items-center justify-center rounded-xl border border-oswapGreen st5 text-oswapGreen hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark'
    }
  }
  },
};
</script>
