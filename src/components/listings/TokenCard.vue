

<template>
    <div class="flex flex-1 md:space-x-4 md:flex-row flex-col items-center md:space-y-0 space-y-4 p-3 st5 st5-all group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray rounded-3xl border-l border-oswapGreen">
        <div class="flex flex-none w-24 h-24 p-2 rounded-full bg-oswapBlue-light bg-opacity-10">
            <img alt="oSwap" :src="image" class="h-full w-full ">
        </div>
        <div class="flex flex-1 flex-col">
          <div class="flex flex-none items-center justify-start space-x-4">
            <span class="text-oswapBlue-light dark:text-oswapGreen">Name</span>
            <span>{{name}}</span>
          </div>
          <div class="flex flex-none items-center justify-start space-x-4">
            <span class="text-oswapBlue-light dark:text-oswapGreen">Symbol</span>
            <span>{{symbol}}</span>
          </div>
          <div class="flex flex-none items-center justify-start space-x-4">
            <span class="text-oswapBlue-light dark:text-oswapGreen">Decimals</span>
            <span>{{decimals}}</span>
          </div>
          <div class="flex flex-none items-center justify-start space-x-4">
            <span class="text-oswapBlue-light dark:text-oswapGreen">Address</span>
            <span class="md:hidden">{{shortenAddress(address)}}</span>
            <span class="hidden md:flex">{{address}}</span>
          </div>
          <div class="flex flex-none items-center justify-start space-x-4">
            <span class="text-oswapBlue-light dark:text-oswapGreen">Website</span>
            <span>{{website}}</span>
          </div>
          <div class="flex flex-none items-center justify-start space-x-4">
            <span class="text-oswapBlue-light dark:text-oswapGreen">Origin</span>
            <span>{{origin}}</span>
          </div>
        </div>
        <div class="flex flex-none flex-col space-y-2 text-slightGray">
          <!-- In case you will use this component on All Tokens section too -->
          <!-- we can use v-slot and instead of doing the oppose sponsor buttons in here do them on PendingListing-->
          <!-- <v-slot></v-slot> -->
          <button class="flex items-center rounded-3xl  bg-oswapBlue-light dark:bg-oswapGreen py-2 px-4 space-x-4">
            <i class="las la-thumbs-up text-3xl "></i>
            <div class="flex items-center flex-col text-center">
              <span>Sponsor Listing</span>
              <span>(15 ONEs Fee)</span>
            </div>
          </button>
          <button class="flex items-center rounded-3xl  bg-red-500 py-2 px-4 space-x-4 ">
            <i class="las la-thumbs-down text-3xl "></i>
            <div class="flex items-center flex-col text-center">
              <span>Oppose Listing</span>
              <span>(15 ONEs Fee)</span>
            </div>
          </button>
        </div>
        <div class="flex flex-none md:h-full pb-1 items-end justify-end">
          <button class="flex  bg-gray-100 dark:bg-oswapDark rounded-full p-3 items-center shadow-lg">
            <i class="las la-arrow-right text-xl"></i>
          </button>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'TokenCard',
    mixins: [],
    props: {
        name: '',
        image: '',
        symbol: '',
        decimals: '',
        address: '',
        website: '',
        origin: '',
    },
    data() {
      return {
      }
    },
    mounted: async function(){
    },
    computed: {
    },
    methods: {
      shortenAddress(address) {
        return address ? (address = `${address.slice(0, 3)}...${address.slice(address.length - 3, address.length)}`) : address;
      },
    }
  }
</script>
