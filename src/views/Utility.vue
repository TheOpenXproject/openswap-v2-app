<template>
  <div id="utility" class="relative max-w-screen-xl mx-auto items-center flex flex-1 flex-col justify-start xl:px-0 px-3 pt-8 text-gray-500">
    <TabGroup :defaultIndex="activatedTab" v-if="activatedTab !== null">
      <TabList class="pb-4 justify-center items-center flex flex-wrap" :selectedIndex="activatedTab">
        <Tab  v-slot="{ selected }" as="template" class="p-1">
          <router-link :to="{path: '/utility', query: {utility:'networks'}}">
            <button 
              :class="selected ? 'dark:bg-slightDark bg-gray-300':''"
              class="p-3 dark:bg-oswapDark-gray bg-slightGray text-oswapGreen-dark dark:text-oswapGreen-light rounded-md hover:text-oswapBlue-light">Networks Setup</button>
          </router-link>
        </Tab>
        <Tab v-slot="{ selected }" as="template" class="p-1">
          <router-link :to="{path: '/utility', query: {utility:'revoker'}}">
            <button 
              :class="selected ? 'dark:bg-slightDark bg-gray-300':''"
              class="p-3 dark:bg-oswapDark-gray bg-slightGray text-oswapGreen-dark dark:text-oswapGreen-light rounded-md hover:text-oswapBlue-light">Revoker</button>
          </router-link>
        </Tab>
        <Tab v-slot="{ selected }" as="template" class="p-1">
          <router-link :to="{path: '/utility', query: {utility:'calculator'}}">
            <button 
              :class="selected ? 'dark:bg-slightDark bg-gray-300':''"
              class="p-3 dark:bg-oswapDark-gray bg-slightGray text-oswapGreen-dark dark:text-oswapGreen-light rounded-md hover:text-oswapBlue-light">Rewards Calculator</button>
          </router-link>
        </Tab>
        <Tab v-slot="{ selected }" as="template" class="p-1">
          <router-link :to="{path: '/utility', query: {utility:'counter'}}">
            <button 
              :class="selected ? 'dark:bg-slightDark bg-gray-300':''"
              class="p-3 dark:bg-oswapDark-gray bg-slightGray text-oswapGreen-dark dark:text-oswapGreen-light rounded-md hover:text-oswapBlue-light">Rewards Counter</button>
          </router-link>
        </Tab>
      </TabList>
      <TabPanels class="flex flex-1 w-full">
        <TabPanel class="flex flex-1 flex-col space-y-6">
          <OneAddress :oneAddress="getOneAddress" :oxAddress="get0xAddress" />
          <div class="grid md:grid-cols-2 ss:grid-cols-1 ss:mb-6 w-full gap-6">
            <MainNetContainer />
            <TestNetContainer />
          </div>
        </TabPanel>
        <TabPanel class="grid grid-cols-1 w-full gap-6">
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
import { mapGetters } from 'vuex';
import { toBech32 } from '@harmony-js/crypto'
export default {
  name: 'Utility',
  components: {MainNetContainer, TestNetContainer, OneAddress, RevokeAddress, Calculator, RewardsCounter, TabGroup, TabList, Tab, TabPanels, TabPanel},
  watch: {
    $route(to, from) {
      this.updateTab(to.query.utility)
    }
  },
  mounted: function () {
    this.updateTab(this.$route.query.utility)
  },
  computed: {
    get0xAddress() {
      return this.getUserAddress()
    },
    getOneAddress() {
      return toBech32(this.getUserAddress())
    },
  },
  methods: { 
    ...mapGetters('wallet', ['getUserAddress']),
    updateTab(utilityDesc) {
      switch (utilityDesc) {
        case 'networks':
          this.activatedTab = 0;
          break;
        case 'revoker':
          this.activatedTab = 1;
          break;
        case 'calculator':
          this.activatedTab = 2;
          break;
        case 'counter':
          this.activatedTab = 3;
          break;
        default:
          this.activatedTab = 0;
          break;
      }
    }
  },
  data() {
    return {
      activatedTab: null,
    }
  }
}
</script>

<style>

</style>