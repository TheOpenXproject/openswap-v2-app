

<template>
    <div class="flex flex-col flex-1">
        <div class="overflow-x-auto">
            <div class="inline-block min-w-full">
                <div
                    class="overflow-hidden  rounded-lg"
                >
                    <table class="min-w-full md:text-base text-xs
                    ">
                        <thead
                        >
                            <tr
                                class=" font-bold text-oswapGreen-dark text-center bg-oswapGreen-light bg-opacity-10"
                            >
                                <th
                                    scope="col"
                                    class="py-3 md:px-6 px-2"
                                >
                                    <div
                                        class="flex flex-none items-center justify-start select-none "
                                    >
                                        Asset
                                    </div>
                                </th>

                                <th scope="col" class="py-3 md:px-6 px-2">
                                    <div
                                        class="flex flex-none items-center justify-center select-none "
                                    >
                                        Balance
                                    </div>
                                </th>
                                <th scope="col" class="py-3 md:px-6 px-2">
                                    <div
                                        class="flex flex-none items-center justify-center select-none "
                                    >
                                        Value
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- This is for loading animation might be useful when this is loaded from somewhere -->
                            <!-- <tr
                                v-if="getLoading"
                                class="border-b from-slightGray dark:from-oswapDark-gray dark:to-slightDark bg-gradient-to-r dark:border-gray-700 font-semibold text-center"
                            >
                                <td colspan="100%">
                                    <div class="flex flex-1 justify-center py-4">
                                        <LoadingOpenSwap />
                                    </div>
                                </td>
                            </tr> -->
                            <tr
                                
                                class="text-center"
                                v-for="(asset, index) in getPaginated"
                                :key="index"
                            >
                                <td
                                    class="py-3 md:px-6 px-2"
                                >
                                    <div
                                        class="flex flex-none space-x-4 justify-start items-center"
                                    >
                                        <img :src="asset.imgSrc" class="w-7 h-7 rounded-full">
                                       <span>{{asset.name}}</span>
                                    </div>
                                </td>
                                <td
                                    class="py-3 md:px-6 px-2 "
                                >
                                    {{asset.balance}} {{asset.symbol}}
                                </td>
                                <td
                                    class="py-3 md:px-6 px-2 "
                                >$ {{asset.value}}</td>
                            </tr>
                            <tr
                                class="border-t border-opacity-40 border-oswapGreen-dark "
                            >
                                <td
                                    colspan="100%"
                                    class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                        <Pagination
                                        :total-items="this.assets.length"
                                        :current-page="this.page"
                                        :per-page="this.limit"
                                        @page-changed="changePage"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Pagination from "@/components/Pagination";
  export default {
    name: 'AssetsTable',
    mixins: [],
    components: {
        Pagination
    },
    props: {
    },
    data() {
      return {
          limit: 10,
          page: 1,
          // Might wanna get this from the store instead
          assets: [
              {
                  symbol: 'bBUSD',
                  name: 'Binance BUSD Token',
                  imgSrc: 'https://openfi.dev/tokens/default/BUSD.png',
                  balance: '3,000',
                  value: '3,000',
              },
              {
                  symbol: 'bMATIC',
                  name: 'Binance Matic/Polygon',
                  imgSrc: 'https://openfi.dev/tokens/default/MATIC.png',
                  balance: '3,000',
                  value: '4,500',
              },
              {
                  symbol: 'bBNB',
                  name: 'Binance Coin',
                  imgSrc: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png',
                  balance: '1,000',
                  value: '500,000',
              },
              {
                  symbol: 'bBUSD',
                  name: 'Binance BUSD Token',
                  imgSrc: 'https://openfi.dev/tokens/default/BUSD.png',
                  balance: '3,000',
                  value: '3,000',
              },
              {
                  symbol: 'bMATIC',
                  name: 'Binance Matic/Polygon',
                  imgSrc: 'https://openfi.dev/tokens/default/MATIC.png',
                  balance: '3,000',
                  value: '4,500',
              },
              {
                  symbol: 'bBNB',
                  name: 'Binance Coin',
                  imgSrc: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png',
                  balance: '1,000',
                  value: '500,000',
              },
              {
                  symbol: 'bBUSD',
                  name: 'Binance BUSD Token',
                  imgSrc: 'https://openfi.dev/tokens/default/BUSD.png',
                  balance: '3,000',
                  value: '3,000',
              },
              {
                  symbol: 'bMATIC',
                  name: 'Binance Matic/Polygon',
                  imgSrc: 'https://openfi.dev/tokens/default/MATIC.png',
                  balance: '3,000',
                  value: '4,500',
              },
              {
                  symbol: 'bBNB',
                  name: 'Binance Coin',
                  imgSrc: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png',
                  balance: '1,000',
                  value: '500,000',
              },
              {
                  symbol: 'bBUSD',
                  name: 'Binance BUSD Token',
                  imgSrc: 'https://openfi.dev/tokens/default/BUSD.png',
                  balance: '3,000',
                  value: '3,000',
              },
              {
                  symbol: 'bMATIC',
                  name: 'Binance Matic/Polygon',
                  imgSrc: 'https://openfi.dev/tokens/default/MATIC.png',
                  balance: '3,000',
                  value: '4,500',
              },
              {
                  symbol: 'bBNB',
                  name: 'Binance Coin',
                  imgSrc: 'https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png',
                  balance: '1,000',
                  value: '500,000',
              },
          ]
      }
    },
    mounted: async function(){
    },
    computed: {
        getPaginated() {
            return this.assets.slice(this.limit * (this.page - 1), this.limit * this.page )
        },
        amountPages() {
            return Math.ceil(this.assets.length / this.limit) || 1
        }
    },
    methods: {
        changePage(event) {
            this.page = event
        }
    }
  }
</script>
