<template>
  <div class="grid grid-cols-12 gap-4 mt-8">
    <div class="flex col-span-2 space-x-2">
      <div class="flex w-12 h-12 rounded-xl shadow-xl bg-slightGray dark:bg-slightDark items-center justify-center">
        <img alt="oSwap" :src="token.image" class="h-12 rounded">

      </div>
      <div class="flex text-oswapGreen flex-col">
        <p class="text-base font-bold">{{token.symbol}}</p>
      </div>
    </div>

    <div class="flex flex-col col-span-2">
      <p class="text-base text-oswapGreen font-bold">Balance</p>
      <p class="text-sm"> {{token.balance}}</p>
    </div>

     <div class="flex flex-col col-span-2">
      <p class="text-base text-oswapGreen font-bold">Price:</p>
      <p class="text-sm"> {{token.tokenPriceUsd}}</p>
    </div>

    <div class="flex flex-col col-span-6 items-end pr-3">
      <p class="text-base text-oswapGreen font-bold">Token Address</p>
      <div class="flex items-center space-x-2">
        <a class="text-sm text-el hover:text-oswapGreen" target="_blank" :href="`https://explorer.harmony.one/address/${token.address}`">
          {{token.address}}
        </a>
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