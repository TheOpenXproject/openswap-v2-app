<template>
  <div class="relative flex flex-col w-full h-full px-4 py-5 justify-start rounded-3xl bg-opaqueDark-light dark:bg-opaqueDark-dark">
    <h1 class="w-full dark:text-oswapGreen mb-4">Revoke Address</h1>
    <div class="w-full flex flex-wrap gap-x-3">
      <input type="text" v-model="address" class="flex w-8/12 h-8 rounded-full items-center ring-black st-5 ring-opacity-10 focus:ring-oswapGreen ring-1 focus:outline-none bg-slightGray dark:bg-slightDark pl-4" placeholder="Enter your wallet address">
      <button class="h-8 border mr-2 px-6 ss:mt-4 md:mt-0 bg-opaqueDark-light dark:bg-opaqueDark-dark hover:border-red-700 dark:hover:text-red-700 border-red-500 transition rounded-xl dark:text-red-500" @click="revokeAddress()">Revoke Address</button>
    </div>
  </div>
</template>

<script>
import { toastMe } from '@/components/toaster/toaster.js'

export default {
  name: 'RevokeAddress',
  data() {
    return {
      address: ''
    }
  },
  methods: {
    revokeAddress() {
      if(this.address.length == 0) {
        toastMe('error', {
          title: 'Please enter an address.',
          link: false,
        })  
      }
    }
  }
}
</script>