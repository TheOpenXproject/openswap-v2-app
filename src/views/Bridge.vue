<template>
  <div id="bridge" class="relative max-w-screen-xl mx-auto items-center flex flex-1 justify-center xl:px-0 px-3 text-gray-500">

    <transition name="horizontal" appear>
      <div v-if="this.getStepState('swap')">
        <Bridge :key="whichToken" @triggerModal="triggerModal" />
      </div>
    </transition>


    <div v-if="this.getStepState('swapmodal')" @click="goTo('swap')" style="backdrop-filter: blur(3px);" class="fixed w-screen h-screen inset-0 z-50"></div>
    <transition name="modal-fall" appear>
      <div v-if="this.getStepState('swapmodal')">
        <BridgeModal :whichToken="whichToken" />
      </div>
    </transition>


  </div>
</template>

<script>
  import Bridge from '@/components/bridge/Bridge';
  import BridgeModal from '@/components/bridge/BridgeModal'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'BridgePage',
    components: {
      Bridge,
      BridgeModal
    },
    data() {
      return {
        whichToken: ''
      }
    },
    computed: {
      ...mapGetters('bridge', ['getStepState'])
    },
    methods: {
      ...mapActions('bridge', ['goTo']),
      triggerModal(token) {
        console.log(token)
        this.whichToken = token
        this.goTo('swapmodal')
      }
    }
  }
</script>