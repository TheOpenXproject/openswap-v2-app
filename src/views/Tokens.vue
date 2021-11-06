<template>
  <div id="tokens" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center justify-center oswap-layout xl:px-0 px-3 text-gray-500 pb-16">
    <transition name="horizontal" appear>
      <div id="tokenList" class="flex z-30 w-full rounded-b-3xl" style="margin-top: 98px">
        <div class="flex flex-col flex-1 divide-y divide-black divide-opacity-10 w-full">
          <div class="flex flex-wrap text-gray-500 dark:text-gray-300" v-for="(network, index) in this.retrieveTokens(search, 1666600000)" :key="index">
            <!-- network name -->
            <div class="flex w-full px-2 py-4 rounded-b-2xl items-center space-x-2">
              <img :src="network.icon" class="h-4" alt="" />
              <p class="flex text-sm items-center dark:text-gray-300">{{ network.name }}</p>
            </div>
            <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
              <!-- icons table -->
              <div v-for="(token, idx) in network.tokens[1666600000]" :key="idx" class="flex flex-col p-3 st5 st5-all group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray border-l border-oswapGreen rounded-3xl">
                <div class="w-full flex flex-wrap">
                  <div class="w-full relative flex gap-5 h-12 items-center">
                    <img :src="token.imgSrc" alt="" class="h-8 w-8 rounded-full flex items-center justify-center" />
                    <p class="text-xs text-oswapBlue-light">
                      {{ token.name }}
                      <span class="text-xs dark:text-gray-300">
                        {{ token.Symbol }}
                      </span>
                    </p>
                  </div>
                  <div class="flex w-8/12 flex-col h-full mt-1 relative" v-if="token.oneAddress">
                    <div class="flex gap-5 mb-2 w-6/12">
                      <p class="text-xs flex-none dark:text-oswapGreen-dark">One Address</p>
                      <p class="text-xs flex gap-1 dark:text-gray-300">
                        {{ shortenAddress(token.oneAddress) }}
                        <tooltip-me>
                          <svg @click="copyAddress(token.oneAddress)" class="h-4 w-4 dark:text-oswapGreen-dark hover:opacity-50" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x="8" y="8" width="12" height="12" rx="2" />
                            <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                          </svg>
                          <tooltip-me-content :options="tooltip" class="flex ss:w-64 xs:w-80 rounded-lg shadow-xl p-0.5">
                            <div class="flex w-full space-x-2 items-start bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300 rounded-md p-3">
                              <svg class="h-6 w-6 dark:text-oswapGreen-dark" width="36" height="36" viewBox="0 0 36 36" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <rect x="8" y="8" width="12" height="12" rx="2" />
                                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                              </svg>
                              <div class="flex flex-1 flex-col space-y-2">
                                <div class="flex items-center text-xs">
                                  <p>Copy One Address</p>
                                </div>
                              </div>
                            </div>
                          </tooltip-me-content>
                        </tooltip-me>
                      </p>
                    </div>
                    <div class="flex gap-5 mt-1 mb-2 w-6/12" v-if="token.bscAddress">
                      <p class="text-xs flex-none dark:text-oswapGreen-dark">Bsc Address</p>
                      <p class="text-xs flex gap-1 dark:text-gray-300">
                        {{ shortenAddress(token.bscAddress) }}
                        <tooltip-me>
                          <svg @click="copyAddress(token.bscAddress)" class="h-4 w-4 dark:text-oswapGreen-dark hover:opacity-50" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x="8" y="8" width="12" height="12" rx="2" />
                            <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                          </svg>
                          <tooltip-me-content :options="tooltip" class="flex ss:w-64 xs:w-80 rounded-lg shadow-xl p-0.5">
                            <div class="flex w-full space-x-2 items-start bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300 rounded-md p-3">
                              <svg class="h-6 w-6 dark:text-oswapGreen-dark" width="36" height="36" viewBox="0 0 36 36" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <rect x="8" y="8" width="12" height="12" rx="2" />
                                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                              </svg>
                              <div class="flex flex-1 flex-col space-y-2">
                                <div class="flex items-center text-xs">
                                  <p>Copy Bsc Address</p>
                                </div>
                              </div>
                            </div>
                          </tooltip-me-content>
                        </tooltip-me>
                      </p>
                    </div>
                  </div>
                  <div class="w-4/12">
                    <button class="flex items-center justify-center ml-3 rounded-full border border-oswapGreen st5 text-oswapGreen hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark">
                      <p class="text-sm p-1 px-3">Add to wallet</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { toastMe } from '@/components/toaster/toaster.js'

export default {
  name: 'Tokens',
  data() {
    return {
      search: '',
    }
  },
  created() {
    window.addEventListener('keyup', this.doCommand)
    const tokens = this.retrieveTokens(this.search, 1666600000)
  },
  unmounted() {
    window.removeEventListener('keyup', this.doCommand)
  },
  props: {
    whichToken: String,
  },
  computed: {
    ...mapGetters('bridge', ['retrieveTokens']),
    ...mapGetters('wallet', ['getChainID']),
  },
  methods: {
    ...mapActions('bridge', ['setToken', 'goTo']),
    ...mapGetters('bridge', ['getToken']),

    shortenAddress(address) {
      return address ? (address = `${address.slice(0, 3)}...${address.slice(address.length - 3, address.length)}`) : address
    },

    async copyAddress(address) {
      console.log(`copying ${address}`)
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
  },
}
</script>
