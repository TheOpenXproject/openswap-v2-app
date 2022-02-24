<template>
  <div class="relative flex flex-col w-full h-full px-4 py-5 justify-start rounded-3xl bg-opaqueDark-light dark:bg-opaqueDark-dark space-y-4">
    <h1 class="w-full dark:text-oswapGreen mb-4">Revoke Address</h1>

    <div class="flex flex-none space-x-4">
      <button class="p-3 text-sm dark:bg-oswapDark-purple bg-slightGray text-oswapGreen-dark dark:text-oswapGreen-light rounded-md" @click="openTokensModal()">OpenSwap's Tokens</button>
      <button class="p-3 text-sm dark:bg-oswapDark-purple bg-slightGray text-oswapGreen-dark dark:text-oswapGreen-light rounded-md" @click="clear()">Clear</button>
    </div>
    <div class="flex flex-col flex-none space-y-4">
      <input v-model="tokenAddress" placeholder="Token Address" class="flex md:max-w-half ring-1 focus:outline-none focus:ring-1 ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 bg-slightGray dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
      <span v-if="tokenEmpty" class="text-xs text-red-500">Please complete a token address</span>
      <input v-model="contractAddress" placeholder="Contract Address" class="flex md:max-w-half ring-1 focus:outline-none focus:ring-1 ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 bg-slightGray dark:bg-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
      <span v-if="contractEmpty" class="text-xs text-red-500">Please complete a contract address</span>
    </div>
    <div v-if="checkingAllowance" class="flex flex-col space-y-2 md:max-w-half items-center justify-center">
      <span class="text-xs font-semibold">Checking Allowance</span>
      <svg class="animate-spin h-8 w-8 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <div v-if="revoking" class="flex flex-col space-y-2 md:max-w-half items-center justify-center">
      <span class="text-xs font-semibold">Revoking</span>
      <svg class="animate-spin h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <div v-if="!checkingAllowance" class="flex flex-none justify-center items-center  md:max-w-half " >
        <span 
          v-if="isAllowed === false" 
          class="text-base text-oswapGreen-dark dark:text-oswapGreen-light">
          This contract is not allowed to use your tokens
        </span>
        <button 
          @click="revoke()"
          v-if="isAllowed === true && !revoking"
          class="border-2 py-2 px-3 dark:bg-opaqueDark-dark hover:border-red-700 dark:hover:text-red-700 border-red-500 transition rounded-xl dark:text-red-500">
          Revoke
        </button>
    </div>
    <div v-if="!checkingAllowance && !isAllowed" class="flex flex-none justify-center items-center  md:max-w-half space-x-4">
        <button class="p-3 text-sm dark:bg-oswapDark-purple bg-slightGray text-oswapGreen-dark dark:text-oswapGreen-light rounded-md" @click="check()">Check Allowance</button>
    </div>
    <transition name="modal-fall" appear>
        <div v-if="tokenModalOpen" class="absolute w-full h-full">
          <TokensModal @close='tokenModalOpen = false' @selectedToken='selectedToken($event)'/>
        </div>
    </transition>
    
  </div>

</template>

<script>
import { toastMe } from '@/components/toaster/toaster.js'
import TokensModal from '@/components/utility/TokensModal'
import vSelect from "vue-select"
import 'vue-select/dist/vue-select.css';
import { mapGetters } from 'vuex';
import openswap from "@/shared/openswap.js"
export default {
  name: 'RevokeAddress',
  components: { 
    vSelect,
    TokensModal,
  },
  mixins: [openswap],
  data() {
    return {
      contractAddress: '',
      tokenAddress: '',
      selectToken: '', 
      inputToken: '',
      showField: false,
      tokenModalOpen: false,
      checkingAllowance: false,
      isAllowed: null,
      tokenEmpty: false,
      contractEmpty: false,
      revoking: false,
    }
  },
  watch:{

  },
  computed: {
    ...mapGetters('addressConstants', ['UNIROUTERV2']),
  },
  methods: {
    ...mapGetters('wallet', ['getChainID']),
    openTokensModal() {
      this.tokenModalOpen = true;
    },
    selectedToken(token) {
      this.tokenModalOpen = false
      this.tokenAddress = token.oneZeroxAddress;
      this.contractAddress = this.UNIROUTERV2(this.getChainID())
      this.check();
    },
    clear() {
      this.contractAddress = '';
      this.tokenAddress = '';
      this.checkingAllowance = false;
      this.isAllowed = null;
      this.tokenEmpty = false;
      this.contractEmpty = false;
      this.revoking = false;
    },
    async revoke() {
      this.revoking = true;
      try {
        await this.revokeSpending({oneZeroxAddress: this.tokenAddress}, this.contractAddress);
        toastMe("success", {
          msg: "Sucessfully revoked allowance",
          link: false,
          href: "",
        });
        this.clear()
      } catch (error) {
        toastMe("error", {
            title: 'Error :',
            msg: error.message,
            link: false,
            href: "",
        });
        this.revoking = false;
      }

    },
    async check() {
      this.tokenEmpty = false;
      this.contractEmpty = false;
      if (this.tokenAddress && this.contractAddress) {
        this.checkingAllowance = true;
        try {
          let allowance = await this.checkAllowance({oneZeroxAddress: this.tokenAddress}, this.contractAddress);
          this.isAllowed = allowance.gt(0)
        } catch (error) {
          toastMe("error", {
            title: 'Error :',
            msg: error.message,
            link: false,
            href: "",
          });
        }
        this.checkingAllowance = false;
      } else {
        if (!this.tokenAddress) {
          this.tokenEmpty = true;
        }
        if (!this.contractAddress) {
          this.contractEmpty = true;
        }
      }

    }
  }
}
</script>

<style>

</style>