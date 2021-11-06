<template>
  <div id="tokens" class="relative max-w-screen-xl mx-auto items-center flex flex-1 justify-center xl:px-0 px-3 text-gray-500">
    <transition name="horizontal" appear>
      <div id="tokenList" class="flex z-30 w-full rounded-b-3xl overflow-x-hidden" style="margin-top: 98px">
        <perfect-scrollbar class="flex flex-col flex-1 divide-y divide-black divide-opacity-10 w-full overflow-hidden">
          <div class="flex text-gray-500 dark:text-gray-300" v-for="(network, index) in this.retrieveTokens(search, 1666600000)" :key="index">
            <div class="flex w-full flex-wrap gap-1 justify-between">
              <!-- network name -->
              <div class="flex w-full px-2 py-4 rounded-b-2xl items-center space-x-2">
                <img :src="network.icon" class="h-4" alt="" />
                <p class="flex text-sm items-center dark:text-gray-300">{{ network.name }}</p>
              </div>
              <!-- icons table -->
              <div v-for="(token, idx) in network.tokens[1666600000]" :key="idx" class="w-1/3 p-2 bg-gradient-to-l flex flex-wrap from-slightGray dark:from-slightDark to-transparent text-gray-500 dark:text-gray-300 ss:w-80 xs:w-96 rounded-3xl border-l border-oswapGreen mb-4 flex flex-col space-y-2 h-32 rounded-xl">
                <div class="w-9/12">
                  <img :src="token.imgSrc" alt="" class="h-8 w-8 rounded-full flex items-center justify-center" />
                  <p class="text-xs text-oswapBlue-light">
                    {{ token.name }}
                    <span class="text-xs dark:text-gray-300">
                      {{ token.Symbol }}
                    </span>
                  </p>
                  <p class="text-xs flex-none dark:text-oswapGreen-dark">One Address</p>
                  <p class="text-xs flex gap-1 dark:text-gray-300">
                    {{ shortenAddress(token.oneAddress) }}
                    <tooltip-me>
                      <svg class="h-4 w-4 dark:text-oswapGreen-dark" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x="8" y="8" width="12" height="12" rx="2" />
                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                      </svg>
                      <tooltip-me-content :options="tooltip" class="flex ss:w-64 xs:w-80 rounded-lg shadow-xl p-0.5">
                        <div class="flex w-full space-x-2 items-start bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300 rounded-md p-3">
                          <svg class="h-4 w-4 dark:text-oswapGreen-dark" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                  <p class="text-xs flex-none dark:text-oswapGreen-dark">Bsc Address</p>
                  <p class="text-xs flex gap-1 dark:text-gray-300">
                    {{ shortenAddress(token.bscAddress) }}
                    <svg class="h-4 w-4 dark:text-oswapGreen-dark" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <rect x="8" y="8" width="12" height="12" rx="2" />
                      <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                    </svg>
                  </p>
                </div>
                <div class="w-3/12">
                  <button class="flex items-center justify-center ml-3 rounded-full border border-oswapGreen st5 text-oswapGreen hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark">
                    <p class="text-sm p-1 px-3">Add to wallet</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </perfect-scrollbar>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
    console.log(tokens)
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

    doCommand(e) {
      if (e.code == 'Escape') {
        this.goTo('swap')
      }
    },

    selectToken(token) {
      this.setToken({ tokenRef: this.whichToken, token: token })
      // Resets search field
      this.search = ''
      // closes the modal
      this.goTo('swap')
    },

    shortenAddress(address) {
      return address ? (address = `${address.slice(0, 3)}...${address.slice(address.length - 3, address.length)}`) : address
    },
  },
}
</script>
