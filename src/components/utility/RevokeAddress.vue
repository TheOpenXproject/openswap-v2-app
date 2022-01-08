<template>
  <div class="relative flex flex-col w-full h-full px-4 py-5 justify-start rounded-3xl bg-opaqueDark-light dark:bg-opaqueDark-dark">
    <h1 class="w-full dark:text-oswapGreen mb-4">Revoke Address</h1>
    <div class="w-full flex flex-wrap gap-x-3">
      <input type="text" v-model="address" class="flex ss:w-7/12 md:w-5/12 h-8 rounded-xl items-center ring-black st-5 ring-opacity-10 focus:ring-oswapGreen ring-1 focus:outline-none bg-slightGray dark:bg-slightDark pl-2" placeholder="Enter your wallet address">
      <div class="ss:w-7/12 md:w-full">
        <v-select placeholder="Choose a Token" :options="options" label="title" v-model="selectToken"  :on-change="checkSelectValue" class="ss:7/12 md:w-5/12 my-4 rounded-xl ring-black st-5 ring-opacity-10 focus:ring-oswapGreen ring-1 focus:outline-none bg-slightGray dark:bg-slightDark">
          <template v-slot:option="option" class="flex items-center my-2 bg-pink-600" :value="option.title" >
            <span :class="option.icon"></span>
            <p class="flex flex-wrap">
              <img v-if="option.cardImage" :src="option.cardImage" class="w-6"/>
                  <span class="pl-2">{{ option.title }}</span>
              </p>
          </template>
        </v-select>
      </div>
      <input v-if="showField" type="text" v-model="inputToken" class="flex md:w-5/12 ss:w-full h-8 rounded-xl items-center ring-black st-5 ring-opacity-10 focus:ring-oswapGreen ring-1 focus:outline-none bg-slightGray dark:bg-slightDark pl-4" placeholder="Enter a custom token">
      <span class="w-full">
        <button class="h-8 border mr-2 px-6 ss:mt-4 bg-opaqueDark-light dark:bg-opaqueDark-dark hover:border-red-700 dark:hover:text-red-700 border-red-500 transition rounded-xl dark:text-red-500" @click="revokeAddress()">Revoke Address</button>
      </span>
    </div>
  </div>
</template>

<script>
import { toastMe } from '@/components/toaster/toaster.js'
import vSelect from "vue-select"
import 'vue-select/dist/vue-select.css';
import {tokens} from "./../../store/modules/exchange_tokens/tokens"

export default {
  name: 'RevokeAddress',
  components: { vSelect },
  data() {
    return {
      address: '',
      selectToken: '', 
      inputToken: '',
      showField: false,
      options: [
        {
          title: "Binance Cardano",
          cardImage: "https://openfi.dev/tokens/default/AAVE.png"
        },
        {
          title: "Binance Cardano",
          cardImage: "https://openfi.dev/tokens/default/AAVE.png"
        },
        {
          title: "Custom"
        }
      ]
    }
  },
  watch:{
      'selectToken'  : function (val, oldval) {
        if(val.title == 'custom' || val.title == 'Custom') {
          this.showField = !this.showField
          this.inputToken = val.title
        } else {
          this.showField = false
          this.inputToken = val.title
        }
      }
    },
  methods: {
    checkSelectValue() {
      console.log('changed')
      console.log(this.selectToken)
      if(this.selectToken == 'custom') {
        this.showField = !this.showField
      } else {
        this.showField = false
      }
    },
    revokeAddress() {
      if(this.address.length == 0) {
        toastMe('error', {
          title: 'Please enter an address.',
          link: false,
        })  
      }
      if(this.inputToken.length == 0) {
        toastMe('error', {
          title: 'Please select a token.',
          link: false,
        })  
      }
    }
  }
}
</script>

<style>

.vs__selected,
.vs__dropdown-option  {
  color: #8b929e !important;
}

.vs__open-indicator path {
  fill: #9ca3af !important;
}

.vs__clear {
  display: none;
}

.vs__dropdown-toggle {
  border: none !important;
}

.vs__dropdown-option--highlight {
  background: rgba(0, 0, 0, 0.1);
}

</style>