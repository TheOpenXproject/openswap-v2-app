<template>
  <div id="utility" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center justify-center oswap-layout xl:px-0 px-3 text-gray-500 pb-16 mt-8">
    <transition name="horizontal">
      <div class="md:w-8/12 mt-6">
        <div class="grid md:grid-cols-2 ss:grid-cols-1 ss:mb-6 w-full gap-6">
          <MainNetContainer />
          <TestNetContainer />
        </div>
        <div class="grid grid-cols-1 w-full gap-6">
          <OneAddress :oneAddress="oneAddress" :oxAddress="oxAddress" />
          <RevokeAddress />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import MainNetContainer from '@/components/utility/MainNetContainer'
import TestNetContainer from '@/components/utility/TestNetContainer'
import OneAddress from '@/components/utility/OneAddress'
import RevokeAddress from '@/components/utility/RevokeAddress'

export default {
  name: 'Utility',
  components: {MainNetContainer, TestNetContainer, OneAddress, RevokeAddress},
  data() {
    return {
      oneAddress: '0xC794D74E042126A6FB4333AA7430C9192198EDD0',
      oxAddress: '0xC794D74E042126A6FB4333AA7430C9192198EDD0'
    }
  }
}
</script>

<style>

</style>