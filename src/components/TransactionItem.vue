<template>
  <div v-if="token.balance > 0" class="grid ss:grid-cols-2 lg:grid-cols-9 ss:border ss:rounded-lg lg:border-none ss:border-oswapGreen flex flex-col gap-4 mt-8 ss:pt-4 lg:pt-0 ss:pb-4 lg:pb-0">
    <div class="flex ss:col-span-2 lg:col-span-2 space-x-0 space-y-2 lg:space-y-0 lg:space-x-2 items-center justify-center lg:justify-start lg:flex-row flex-col">
      <div class="flex w-18 h-18 rounded-full shadow-xl bg-slightGray dark:bg-slightDark items-center justify-center">
        <div class="p-3 rounded-full bg-slightGray dark:bg-slightDark   ">
              <img alt="oSwap" :src="token.image" class="h-10 rounded-xl">
        </div>
      </div>
      <div class="flex text-oswapGreen flex-col">
        <p class="text-base font-bold">{{token.symbol}}</p>
      </div>
    </div>

    <div class="flex col-span-1 justify-center lg:justify-start">
      <div class="flex flex-col ss:pt-0 lg:pt-4 text-gray-600 dark:text-gray-300 items-center lg:items-start">
        <p class="ss:text-md xs:text-md font-extrabold">{{token.balance.toFixed(8)}}</p>
        <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Balance</p>
      </div>
    </div>

    
    <div class="flex col-span-1 justify-center lg:justify-start">
      <div class="flex flex-col ss:pt-0 lg:pt-4 text-gray-600 dark:text-gray-300 items-center lg:items-start">
        <p class="ss:text-md xs:text-md font-extrabold">${{( token.balance * token.tokenPriceUsd).toFixed(8)}}</p>
        <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Balance Value Usd</p>
      </div>
    </div>

    <div class="flex col-span-1 justify-center lg:justify-start">
      <div class="flex flex-col ss:pt-0 lg:pt-4 text-gray-600 dark:text-gray-300 items-center lg:items-start">
        <p class="ss:text-md xs:text-md font-extrabold">{{token.stakedBal.toFixed(8)}}</p>
        <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Balance Staked</p>
      </div>
    </div>


     <div class="flex col-span-1 justify-center lg:justify-start">
      <div class="flex flex-col ss:pt-0 lg:pt-4 text-gray-600 dark:text-gray-300 items-center lg:items-start">
        <p class="ss:text-md xs:text-md font-extrabold">${{( token.stakedBal.toFixed(8) * token.tokenPriceUsd).toFixed(8)}}</p>
        <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Staked Value Usd</p>
      </div>
    </div>

    <div class="flex col-span-1 justify-center lg:justify-start">
      <div class="flex flex-col ss:pt-0 lg:pt-4 text-gray-600 dark:text-gray-300 items-center lg:items-start">
        <p class="ss:text-md xs:text-md font-extrabold">${{token.tokenPriceUsd.toFixed(8)}}</p>
        <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Price</p>
      </div>
    </div>

    <div class="flex flex-col lg:items-end ss:col-span-1 lg:col-span-1 items-center ">
      <div class="flex flex-none ss:pt-0 lg:pt-4 lg:items-end items-center flex-col text-gray-600 dark:text-gray-300">
        <a class="ss:text-md xs:text-md font-extrabold" target="_blank" :href="`https://explorer.harmony.one/address/${token.address}`">
          {{token.address && token.address.slice(0, 6) + '...' + token.address.slice(38, 42)}}
        </a>
        <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Token Address</p>
      </div>
    </div>
    

  </div>
</template>

<script>
  export default {
    name: 'TransactionItem',
    props: {
      token: Object
    }
  }
</script>