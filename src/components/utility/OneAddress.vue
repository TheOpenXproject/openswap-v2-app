<template>
  <div class="flex flex-none space-x-8 items-center justify-center flex-row p-4 rounded-3xl bg-opaqueDark-light dark:bg-opaqueDark-dark gap">
    <span>
      <p class="dark:text-oswapGreen">One Address</p>
      <p>{{ shortenAddress(this.oneAddress) }}
      <tooltip-me>
        <svg @click="copyAddress(this.oneAddress)" class="h-4 w-4 dark:text-oswapGreen-dark hover:opacity-50 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
        <tooltip-me-content :options="tooltip" class="flex ss:w-64 xs:w-88 rounded-lg shadow-xl p-0.5">
          <div class="flex w-full space-x-2 items-start bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300 rounded-md p-3">
            <svg class="h-6 w-6  relative top-2 dark:text-oswapGreen-dark" width="36" height="36" viewBox="0 0 36 36" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x="8" y="8" width="12" height="12" rx="2" />
              <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
            </svg>
            <div class="flex flex-1 flex-col space-y-2">
              <div class="flex items-center text-xs">
                <p>Copy One Address : <span class="flex md:hidden">{{shortenAddress(this.oneAddress)}}</span><span class="hidden md:flex">{{this.oneAddress}}</span></p>
              </div>
            </div>
          </div>
        </tooltip-me-content>
      </tooltip-me>
      </p>
    </span>
    <span>
      <p class="dark:text-oswapGreen">0x Address</p>
      <p>{{ shortenAddress(this.oxAddress) }}
      <tooltip-me>
        <svg @click="copyAddress(this.oxAddress)" class="h-4 w-4 dark:text-oswapGreen-dark hover:opacity-50 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
        <tooltip-me-content :options="tooltip" class="flex ss:w-64 xs:w-88 rounded-lg shadow-xl p-0.5">
          <div class="flex w-full space-x-2 items-start bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300 rounded-md p-3">
            <svg class="h-6 w-6  relative top-2 dark:text-oswapGreen-dark" width="36" height="36" viewBox="0 0 36 36" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x="8" y="8" width="12" height="12" rx="2" />
              <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
            </svg>
            <div class="flex flex-1 flex-col space-y-2">
              <div class="flex items-center text-xs">
                 <p>Copy Ox Address : <span class="flex md:hidden">{{shortenAddress(this.oxAddress)}}</span><span class="hidden md:flex">{{this.oxAddress}}</span></p>
              </div>
            </div>
          </div>
        </tooltip-me-content>
      </tooltip-me>
      </p>
    </span>
  </div>
</template>

<script>
import { toastMe } from '@/components/toaster/toaster.js'

export default {
  name: 'OneAddress',
  props: {
    oneAddress: String,
    oxAddress: String
  },
  methods: {
    shortenAddress(address) {
      return address ? (address = `${address.slice(0, 8)}...${address.slice(address.length - 3, address.length)}`) : address
    },
    async copyAddress(address) {
      try {
        await navigator.clipboard.writeText(address)
        toastMe('success', {
          title: 'Sucessfully Copied',
          link: false,
          href: '',
        })
      } catch ($e) {
        toastMe('warning', {
          title: 'Error Copying',
          link: false,
          href: '',
        })
      }
    },
  }
}
</script>

<style>

</style>