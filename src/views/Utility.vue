<template>
  <div id="utility" class="relative max-w-screen-xl mx-auto items-center flex flex-1 flex-col justify-start xl:px-0 px-3 pt-8 text-gray-500">
    <TabGroup :defaultIndex="0">
      <TabList class="space-x-2 pb-4" :selectedIndex="activatedTab">
        <Tab  v-slot="{ selected }" as="template">
            <button 
              :class="selected ? 'bg-slightDark':''"
              class="p-3 bg-oswapDark-gray text-oswapGreen-light rounded-md hover:text-oswapBlue-light">Networks Setup</button>
        </Tab>
        <Tab v-slot="{ selected }" as="template">
            <button 
              :class="selected ? 'bg-slightDark':''"
              class="p-3 bg-oswapDark-gray text-oswapGreen-light rounded-md hover:text-oswapBlue-light">Revoker</button>
        </Tab>
        <Tab v-slot="{ selected }" as="template">
            <button 
              :class="selected ? 'bg-slightDark':''"
              class="p-3 bg-oswapDark-gray text-oswapGreen-light rounded-md hover:text-oswapBlue-light">Rewards Calculator</button>
        </Tab>
        <Tab v-slot="{ selected }" as="template">
            <button 
              :class="selected ? 'bg-slightDark':''"
              class="p-3 bg-oswapDark-gray text-oswapGreen-light rounded-md hover:text-oswapBlue-light">Rewards Counter</button>
        </Tab>
      </TabList>
      <TabPanels class="flex flex-1 w-full">
        <TabPanel class="grid md:grid-cols-2 ss:grid-cols-1 ss:mb-6 w-full gap-6">
          <MainNetContainer />
          <TestNetContainer />
        </TabPanel>
        <TabPanel class="grid grid-cols-1 w-full gap-6">
          <OneAddress :oneAddress="oneAddress" :oxAddress="oxAddress" />
          <RevokeAddress />
        </TabPanel>
        <TabPanel class="flex flex-1 justify-center">
          <Calculator/>
        </TabPanel>
        <TabPanel class="flex flex-1 justify-center items-center">
          <RewardsCounter/>
          </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script>
import MainNetContainer from '@/components/utility/MainNetContainer'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import TestNetContainer from '@/components/utility/TestNetContainer'
import OneAddress from '@/components/utility/OneAddress'
import RevokeAddress from '@/components/utility/RevokeAddress'
import Calculator from '@/components/utility/Calculator'
import RewardsCounter from '@/components/utility/RewardsCounter'
export default {
  name: 'Utility',
  components: {MainNetContainer, TestNetContainer, OneAddress, RevokeAddress, Calculator, RewardsCounter, TabGroup, TabList, Tab, TabPanels, TabPanel},
  mounted: function () {
  },
  methods: { 
  },
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