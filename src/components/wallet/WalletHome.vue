<template>
  <transition as="template" name="vertical" appear>
    <div v-if="this.getFarms() != null" class="flex flex-col w-full ">
      <div class="flex flex-none w-full space-x-4  mb-4">
        <div class="grid grid-cols-1 md:grid-cols-2 mdd:grid-cols-3 gap-4 w-full">
          <!-- Cards -->
          <div  v-for="card in cards">
        
          <CardWallet :class="card.class" :tokens="this.getTokens()" :styleData="card.style" :balanceData="card.balance">
            <svg class="h-10 w-10 fill-current" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm5.143 7c-2.124 0-3.857 1.738-3.913 3.869v4.317c-.392 0-.783.056-1.23.056-.447 0-.839 0-1.23.056v-4.43c0-2.13-1.789-3.868-3.969-3.812-2.068 0-3.745 1.738-3.801 3.813v10.317c.056 2.13 1.789 3.869 3.969 3.813 2.124-.056 3.801-1.738 3.801-3.813v-4.318c.391 0 .783-.056 1.23-.056.447 0 .838 0 1.23-.056v4.374c.056 2.13 1.789 3.869 3.969 3.813C23.323 24.887 25 23.204 25 21.13V10.869C25 8.739 23.267 7 21.143 7zM13.26 17.093l-.056 4.093a2.27 2.27 0 01-2.292 2.299 2.27 2.27 0 01-2.292-2.3v-1.008c0-.897.727-1.795 1.957-2.3.838-.392 1.733-.616 2.683-.784zm10.174-2.187v6.28a2.306 2.306 0 01-2.292 2.299 2.27 2.27 0 01-2.292-2.3v-4.54a13.844 13.844 0 003.298-.954c.447-.224.894-.449 1.286-.785zM10.913 8.57a2.27 2.27 0 012.292 2.299v4.542a13.845 13.845 0 00-3.298.953c-.447.224-.895.448-1.286.785v-6.28c0-1.234 1.006-2.299 2.292-2.299zm10.174 0a2.27 2.27 0 012.292 2.299v1.01c.056.952-.671 1.793-1.9 2.354-.84.393-1.734.617-2.684.785v-4.15a2.27 2.27 0 012.292-2.298z"/></svg>
          </CardWallet>
         
          </div>
        </div>
      </div>

      <div class="flex w-full pt-8 mb-4">
        <div class="grid grid-cols-8 mdd:grid-cols-8 ss:grid-cols-4 gap-4 w-full">
          <div class="flex items-center space-x-3 col-span-2">
            <div class="p-3 rounded-full bg-slightGray dark:bg-slightDark  ">
                <i class="las la-dollar-sign text-oswapGreen text-2xl"></i>
            </div>
            <div class="flex flex-col">
              <p class="ss:text-md xs:text-lg font-extrabold">${{this.getAvailableBalance().toFixed(2)}}</p>
              <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Available balance</p>
            </div>
          </div>
          <div class="flex items-center space-x-3 col-span-2">
            <div class="p-3 rounded-full bg-slightGray dark:bg-slightDark  ">
                <i class="las la-layer-group text-oswapGreen text-2xl"></i>
            </div>
            <div class="flex flex-col">
              <p class="ss:text-md xs:text-lg font-extrabold">${{this.prettify(this.getUserStake().toFixed(2))}}</p>
              <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Staked Balance</p>
            </div>
          </div>
           <div class="flex items-center space-x-3 col-span-2">
            <div class="p-3 rounded-full bg-slightGray dark:bg-slightDark  ">
                <i class="las la-layer-group text-oswapGreen text-2xl"></i>
            </div>
            <div class="flex flex-col">
              <p class="ss:text-md xs:text-lg font-extrabold">${{this.prettify(this.getTotalBalance)}}</p>
              <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Total Balance</p>
            </div>
          </div>
          <div class="flex items-center space-x-3 col-span-2">
            <div class="p-3 rounded-full bg-slightGray dark:bg-slightDark  ">
                <i class="las la-coins text-oswapGreen text-2xl"></i>
            </div>
            <div class="flex flex-col">
              <p class="ss:text-md xs:text-lg font-extrabold">{{this.getTokens().length}}</p>
              <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Total Assets</p>
            </div>
          </div>
        </div>
      </div>

      <TransactionList :tokens="this.getTokens()"/>

    </div>
  </transition>
</template>







<script>
  import TokenList from '@/components/TokenList'
  import TransactionList from '@/components/TransactionList'
  import CardWallet from '@/components/wallet/CardWallet'
  import RadialChart from '@/components/wallet/RadialChart'
  import {mapGetters } from 'vuex';
  import { ethers } from "ethers";

  export default {
    name: 'WalletHome',
    components: {
      TokenList,
      TransactionList,
      CardWallet,
      RadialChart
    },
    mounted: function(){

    },
    methods: {
      ...mapGetters("farm/farmData", ["getUserStake", "getFarms", "getTokens"]),
      prettify: function(number){
        return ethers.utils.commify(number)
      },
      getAvailableBalance: function(){
        let tokens = this.getTokens()
        let bal = 0;
        for(var i in tokens){
          bal += (tokens[i].balance * tokens[i].tokenPriceUsd )
        }
        return bal
      }

    },
    computed: {

    getTotalBalance: function(){
      let ret = (parseFloat(this.getAvailableBalance())+parseFloat(this.getUserStake())).toFixed(2)
        return ret
      },
    },
    data() {
      return {
        availableUSD: 0,
        cards: {
        AvailableBal: {
          class: "from-oswapGreen to-oswapBlue-light relative",
          style: {

            from: "#edeff2",
            to: "#edeff2",
            size: 90,
            stroke: 8
          },
          balance: {
           balanceName: 'Available Balance',
           type: 'Available',
            value: '9,145.39',
            valuePercentage: 59,
            assets: [
              {
                icon: "https://openfi.dev/tokens/default/ONE.png",
              },
              {
                icon: "https://openfi.dev/tokens/default/oSWAP.png",
              },
              {
                icon: "https://miro.medium.com/fit/c/56/56/1*6X4n2JzQweFbOjpneSWiOw.png",
              },
              {
                icon: "https://d1xrz6ki9z98vb.cloudfront.net/venomswap/tokens/VINCI.png",
              },
              {
                icon: "https://s3-us-west-1.amazonaws.com/tokens.mochiswap.io/images/hMOCHI-token-logo.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/LMA.png",
              },
              {
                icon: "https://freyala.com/images/logo.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/1SEED.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/ARANK.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/EUSK.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/SEE.png",
              }
            ]
          }
        },
        StakedBal: {
          class: "from-purple-700 to-purple-800 relative",
          style: {
            from: "#edeff2",
            to: "#edeff2",
            size: 90,
            stroke: 8
          },
          balance: {
          balanceName: 'Staked Balance',
           type: 'Staked',
            value: this.personalStake,
            valuePercentage: 11,
            assets: [
              {
                icon: "https://openfi.dev/tokens/default/WBTC.png",
              },
              {
                icon: "https://openfi.dev/tokens/default/USDC.png",
              },
            ]
          }
        },
        TotalBal: {
          class: "from-yellow-500 to-yellow-400",
          style: {
            from: "#edeff2",
            to: "#edeff2",
            size: 90,
            stroke: 8
          },
          balance: {
          balanceName: 'Total Balance',
           type: 'Total',
            value: '4,145.39',
            valuePercentage: 30,
            assets: [
              {
                icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
              },
              {
                icon: "https://openfi.dev/tokens/default/MATIC.png",
              },
              {
                icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/2010.png",
              },
              {
                icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/7186.png",
              },
            ]
          }
        }
        },
        testData: [
          { 
            amount: 20,
            from: '#3492eb',
            to: '#3492eb'
          },
          { 
            amount: 59,
            from: '#34eb89',
            to: '#34eb89'
          },
          { 
            amount: 11,
            from: '#eb4034',
            to: '#eb4034'
          },
          { 
            amount: 5,
            from: '#3492eb',
            to: '#3492eb'
          },
          { 
            amount: 5,
            from: '#34eb89',
            to: '#34eb89'
          },
        ],
        // DUMMY DATA - ERASE WHEN REAL DATA IS BEING FETCHED...
        cardDataHarmony: {
          style: {
            from: "#edeff2",
            to: "#edeff2",
            size: 90,
            stroke: 8
          },
          balance: {
            networkName: 'Available Balance',
            value: '9,145.39',
            valuePercentage: 59,
            assets: [
              {
                icon: "https://openfi.dev/tokens/default/ONE.png",
              },
              {
                icon: "https://openfi.dev/tokens/default/oSWAP.png",
              },
              {
                icon: "https://miro.medium.com/fit/c/56/56/1*6X4n2JzQweFbOjpneSWiOw.png",
              },
              {
                icon: "https://d1xrz6ki9z98vb.cloudfront.net/venomswap/tokens/VINCI.png",
              },
              {
                icon: "https://s3-us-west-1.amazonaws.com/tokens.mochiswap.io/images/hMOCHI-token-logo.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/LMA.png",
              },
              {
                icon: "https://freyala.com/images/logo.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/1SEED.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/ARANK.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/EUSK.png",
              },
              {
                icon: "https://swoop-exchange.s3-us-west-1.amazonaws.com/tokens/SEE.png",
              }
            ]
          }
        },
        cardDataEthereum: {
          style: {
            from: "#edeff2",
            to: "#edeff2",
            size: 90,
            stroke: 8
          },
          balance: {
            networkName: 'Staked Balance',
            value: '1,145.39',
            valuePercentage: 11,
            assets: [
              {
                icon: "https://openfi.dev/tokens/default/WBTC.png",
              },
              {
                icon: "https://openfi.dev/tokens/default/USDC.png",
              },
            ]
          }
        },
        cardDataBinance: {
          style: {
            from: "#edeff2",
            to: "#edeff2",
            size: 90,
            stroke: 8
          },
          balance: {
            networkName: 'Total Balance',
            value: '4,145.39',
            valuePercentage: 30,
            assets: [
              {
                icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
              },
              {
                icon: "https://openfi.dev/tokens/default/MATIC.png",
              },
              {
                icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/2010.png",
              },
              {
                icon: "https://s2.coinmarketcap.com/static/img/coins/128x128/7186.png",
              },
            ]
          }
        }
      }
    }
  }
</script>