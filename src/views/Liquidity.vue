<template>
  <div v-if="this.getFarms() != null" id="liquidity" class="relative max-w-screen-xl mx-auto flex flex-1 items-center justify-center xl:px-0 px-3 text-gray-500">
    <!-- Select Tokens -->
    <transition name="horizontal" appear>
      <div v-if="this.getStepState('settokens')">
        <LiquidityTokens @triggerModal="triggerModal" />
      </div>
    </transition>
    <!-- Token Selection Modal -->
    <!-- Modal backdrop must be outside of transition tag otherwise it appears only when modal animation ends -->
    <div v-if="this.getStepState('selectmodal')" @click="goTo('settokens')" style="backdrop-filter: blur(3px);" class="fixed w-screen h-screen inset-0 z-50"></div>
    <transition name="modal-fall" appear>
      <div v-if="this.getStepState('selectmodal')">
        <LiquidityModal :whichToken="whichToken" />
      </div>
    </transition>
    <!-- Add/Remove Liquidity -->
    <transition name="horizontal" appear>
      <div v-if="this.getStepState('addremoveliquidity')">
        <AddRemoveLiquidity />
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
  import LiquidityTokens from '@/components/liquidity/LiquidityTokens';
  import LiquidityModal from '@/components/liquidity/LiquidityModal';
  import AddRemoveLiquidity from '@/components/liquidity/AddRemoveLiquidity';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Liquidity',
    components: {
      LiquidityTokens,
      LiquidityModal,
      AddRemoveLiquidity
    },
    data() {
      return {
        whichToken: ''
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
    computed: {
      ...mapGetters('liquidity/buttons', ['getStepState'])
    },
    methods: {
      ...mapActions('exchange', ['loadTokens']),
      ...mapActions('liquidity/buttons', ['goTo']),
        ...mapGetters("farm/farmData", [ "getFarms"]),

      // Open the modal for token selection.
      // It sends info to the modal of which token is being
      // selected(token1 or token2) through :whichToken binding.
      triggerModal(token) {
        this.whichToken = token
        this.goTo('selectmodal')
      }
    }
  }
</script>
