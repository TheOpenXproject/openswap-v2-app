<template>
  <div class="flex flex-col flex-wrap p-3 st5 st5-all group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray rounded-3xl border-l border-oswapGreen">
    <div class="flex flex-wrap justify-between items-center">
      <div class="relative flex h-12 items-center w-full">
        <div class="absolute items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-slightGray dark:border-slightDark">
          <img :src="pair.token0.imgSrc" class="h-8 w-8" />
        </div>

        <div class="absolute left-8 items-center justify-center flex w-12 h-12 overflow-hidden rounded-full bg-gray-50 border-4 border-slightGray dark:border-slightDark">
          <img :src="pair.token1.imgSrc" class="h-8 w-8" />
        </div>
        <div class="pl-24 items-center justify-center relative space-x-2">
          <p class="text-xs text-oswapBlue-light">
            <tooltip-me>
              <span>{{ pair.token1.Symbol }}</span
              >/<span>{{ pair.token0.Symbol }}</span>
              <tooltip-me-content :options="tooltip" class="flex ss:w-64 xs:w-80 rounded-lg shadow-xl p-0.5">
                <div class="flex w-full space-x-2 items-start bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300 rounded-md p-3">
                  <div class="flex flex-1 flex-col space-y-2">
                    <div class="flex items-center text-xs">
                      <p>{{ `${pair.token1.name} / ${pair.token0.name}` }}</p>
                    </div>
                  </div>
                </div>
              </tooltip-me-content>
            </tooltip-me>
          </p>
        </div>
      </div>
      <div class="flex gap-3 mb-2 pt-2 w-full">
        <svg @click="copyAddress(pair.pairaddress)" class="h-4 w-4 dark:text-oswapGreen-dark hover:opacity-50" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
        <p class="text-xs flex-none dark:text-oswapGreen-dark">Pair Address</p>
        <p class="text-xs flex gap-1 dark:text-gray-300">{{ shortenAddress(pair.pairaddress) }}</p>
      </div>
      <div class="flex gap-3 mb-2 pt-2 w-full">
        <svg @click="copyAddress(pair.token0.oneZeroxAddress)" class="h-4 w-4 dark:text-oswapGreen-dark hover:opacity-50" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
        <p class="text-xs flex-none dark:text-oswapGreen-dark">{{ pair.token0.Symbol }} One ZeroX Address</p>
        <p class="text-xs flex gap-1 dark:text-gray-300">{{ shortenAddress(pair.token0.oneZeroxAddress) }}</p>
      </div>
      <div class="flex gap-3 mb-2 pt-2 w-full">
        <svg @click="copyAddress(pair.token1.oneZeroxAddress)" class="h-4 w-4 dark:text-oswapGreen-dark hover:opacity-50" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
        <p class="text-xs flex-none dark:text-oswapGreen-dark">{{ pair.token1.Symbol }} One ZeroX Address</p>
        <p class="text-xs flex gap-1 dark:text-gray-300">{{ shortenAddress(pair.token1.oneZeroxAddress) }}</p>
      </div>
      <div class="flex gap-5 mb-2 pt-2 w-full items-center">
        <div class="w-half">
          <p class="text-xs flex-none dark:text-oswapGreen-dark mb-1"><i class="las la-coins text-lg dark:text-oswapGreen"></i><span class="relative -top-0.5"> Balance</span></p>
          <p class="text-xs flex gap-1 dark:text-gray-300">{{ pair.balance }}</p>
        </div>
        <div class="w-half">
          <p class="text-xs flex-none dark:text-oswapGreen-dark mb-1"><i class="las la-dice text-lg dark:text-oswapGreen"></i><span class="relative -top-0.5"> Staked</span></p>
          <p class="text-xs flex gap-1 dark:text-gray-300">{{ pair.staked }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toastMe } from "@/components/toaster/toaster.js";

export default {
  name: "Pair",
  props: { pair: Object },
  mounted() {},
  methods: {
    shortenAddress(address) {
      return address ? (address = `${address.slice(0, 3)}...${address.slice(address.length - 3, address.length)}`) : address;
    },
    async copyAddress(address) {
      console.log(`copying ${address}`);
      try {
        await navigator.clipboard.writeText(address);
        toastMe("success", {
          title: "Sucessfully Copied",
          link: false,
          href: "",
        });
      } catch ($e) {
        toastMe("warning", {
          title: "Error Copying",
          link: false,
          href: "",
        });
      }
    },
  },
};
</script>

<style></style>
