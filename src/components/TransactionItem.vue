<template>
  <div class="lg:grid lg:grid-cols-12 flex flex-col gap-4 mt-8">
    <div class="flex col-span-2 space-x-0 space-y-2 lg:space-y-0 lg:space-x-2 items-center justify-center lg:justify-start lg:flex-row flex-col">
      <div class="flex w-12 h-12 rounded-full shadow-xl bg-slightGray dark:bg-slightDark items-center justify-center">
        <div class="p-3 rounded-full bg-slightGray dark:bg-slightDark   ">
              <img alt="oSwap" :src="token.image" class="h-6 ">
        </div>
      </div>
      <div class="flex text-oswapGreen flex-col">
        <p class="text-base font-bold">{{token.symbol}}</p>
      </div>
    </div>

    <div class="flex col-span-3 justify-center lg:justify-start">
      <div class="flex flex-col text-gray-600 dark:text-gray-300 items-center lg:items-start">
        <p class="ss:text-md xs:text-md font-extrabold">{{token.balance}}</p>
        <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Balance</p>
      </div>
    </div>

    <div class="flex col-span-3 justify-center lg:justify-start">
      <div class="flex flex-col text-gray-600 dark:text-gray-300 items-center lg:items-start">
        <p class="ss:text-md xs:text-md font-extrabold">{{token.tokenPriceUsd}}</p>
        <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Price</p>
      </div>
    </div>

    <div class="flex flex-col lg:items-end  col-span-4 items-center ">
      <div class="flex flex-none lg:items-end items-center flex-col text-gray-600 dark:text-gray-300">
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