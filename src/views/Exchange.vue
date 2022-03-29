<template>
  <div v-if="this.getFarms() != null"  id="exchange" class="relative max-w-screen-xl mx-auto items-center flex flex-1 justify-center xl:px-0 px-3 text-gray-500">
    <!-- Steps between Components -->

    <!-- Swap -->
    <transition name="horizontal" appear>
      <div v-if="this.getStepState('swap')">
        <Swap @triggerModal="triggerModal" />
      </div>
    </transition>

    <!-- Token Selection Modal -->
    <!-- Modal backdrop must be outside of transition tag otherwise it appears only when modal animation ends -->
    <div v-if="this.getStepState('swapmodal')" @click="goTo('swap')" style="backdrop-filter: blur(3px);" class="fixed w-screen h-screen inset-0 z-50"></div>
    <transition name="modal-fall" appear>
      <div v-if="this.getStepState('swapmodal')">
        <SwapModal :whichToken="whichToken" />
      </div>
    </transition>

    <!-- Swapper -->
    <!-- Modal backdrop must be outside of transition tag otherwise it appears only when modal animation ends -->
    <transition name="horizontal" appear>
      <div v-if="this.getStepState('swapper')">
        <Swapper :key="forceR" @reload="reload"/>
      </div>
    </transition>

  </div>
  <div v-else id="farm" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center justify-center oswap-layout xl:px-0 px-3 text-gray-500">
  <div class="flex h-full items-center mt-16">
      <svg class="animate-spin h-8 w-8 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    </div>
</template>

<script>

  import Swap from '@/components/exchange/Swap'
  import SwapModal from '@/components/exchange/SwapModal'
  import Swapper from '@/components/exchange/Swapper'

  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Exchange',
    components: {
      Swap,
      SwapModal,
      Swapper,
    },
    data() {
      return {
        whichToken: '',
        forceR: 0 
      }
    },
    metaInfo: {
       title: 'Foo Bar',
    
      charset: 'utf-8' ,
       name: 'viewport',
        content: 'width=device-width, initial-scale=1',
        title: 'Openswap Exchange',
        description: 'Openswap Decentralized Exchange on Harmony Blockchain. Harmony DEX',
        keywords: 'Dex, Decentralised Exchange, dex, blockchain, harmony, openswap, Uniswap Fork',
        robots: 'index, follow'
    },
    computed: {
      ...mapGetters('exchange', ['getStepState'])
    },
    methods: {
      ...mapActions('exchange', ['goTo','setToken', 'loadTokens']),
      ...mapGetters("farm/farmData", [ "getFarms"]),

      reload(value){
       this.forceR++
      },
      // Open the modal for token selection.
      // It sends info to the modal of which token is being
      // selected(token1 or token2) through :whichToken binding.
      triggerModal(token) {
        this.whichToken = token
        this.goTo('swapmodal')
      }
    },
    mounted: function () {
      const token1 = this.$route.query.token1
      const token2 = this.$route.query.token2
      if (token1 || token2) {
        this.loadTokens({token1, token2})
      }
      // 
    },
  }
</script>