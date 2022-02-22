<template>
    <div class="flex flex-col flex-none w-full">
        <div class="flex flex-1 flex-col space-y-6">
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Token Origin</span>
            <div class="flex flex-wrap">
              <template v-for="(options, index) in origins">
                <label class="inline-flex items-center p-2">
                  <input 
                    :id="index" type="radio" v-model="origin" 
                    :value="options.value" 
                    class="hidden" 
                    >
                    <label :for="index" 
                      :class="origin === options.value? 'text-oswapBlue-light dark:text-oswapGreen':''"
                      class="flex items-center cursor-pointer "
                      >
                      <span 
                        :class="origin === options.value? 'border-oswapBlue-light dark:border-oswapGreen-light bg-oswapBlue-light dark:bg-oswapGreen ring-2 ring-slightGray':''"
                        class="w-6 h-6 inline-block mr-2 rounded-full border border-grey p-1 flex-no-shrink">
                      </span>
                      {{options.name}}
                    </label>
                </label>
              </template>
            </div>
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Token Name</span>
            <input 
              v-model="tokenName" 
              placeholder="Enter Token Name" 
              class="flex md:max-w-half ring-1 placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Symbol</span>
            <input 
              v-model="tokenSymbol" 
              placeholder="Enter Token Symbol" 
              class="flex md:max-w-half ring-1 placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Token's Native Address</span>
            <input 
              v-model="tokenNativeAddress" 
              placeholder="Enter Token's Native Address" 
              class="flex md:max-w-half ring-1 placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Token Address 0x</span>
            <input 
              v-model="token0xAddress" 
              placeholder="Enter 0x version address" 
              class="flex md:max-w-half ring-1 placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Token Address oneXXX</span>
            <input 
              v-model="tokenOneAddress" 
              placeholder="Enter one version address" 
              class="flex md:max-w-half ring-1 placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Image URL</span>
            <input 
              v-model="image" 
              placeholder="Enter URL Ex: https://tokensomethingsite.com/token.png" 
              class="flex md:max-w-half ring-1 placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Decimals</span>
            <input 
              v-model="decimals" 
              placeholder="Token Decimals Ex: 18" 
              class="flex md:max-w-half ring-1 placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
          </div>
        </div>
    </div>
  
</template>

<script>

  export default {
    name: 'ListingsForm',
    mixins: [],
    props: {
        origin: null,
        tokenName: '',
        tokenSymbol: '',
        tokenNativeAddress: '',
        token0xAddress: '',
        tokenOneAddress: '',
        image: '',
        decimals: '',
    },
    data() {
      return {
        origins: [
          {
            name: 'Harmony',
            value: 'Value probably chain id or something like that1'
          },
          {
            name: 'Ethereum',
            value: 'Value probably chain id or something like that2'
          },
          {
            name: 'Binance Smart Chain',
            value: 'Value probably chain id or something like that3'
          },
          {
            name: 'Polygon',
            value: 'Value probably chain id or something like that4'
          },
          {
            name: 'Terra',
            value: 'Value probably chain id or something like that5'
          },
        ]
      }
    },
    mounted: async function(){
    },
    computed: {
    },
    methods: {

    }
  }
</script>
