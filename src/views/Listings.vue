<template>
  <div id="listings" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-start oswap-layout xl:px-0 px-3 text-gray-500 py-16" >
    <div class="flex flex-1 w-full flex-col">
        <div class="flex flex-none flex-col space-y-2">
            <span class="text-3xl">Token Listings</span>
            <span class="text-base opacity-70">Add or review token listings on OpenSwap</span>
        </div>
      <TabGroup :defaultIndex="activatedTab" v-if="activatedTab !== null">
        <TabList class="space-x-4 py-6 justify-start items-center flex " :selectedIndex="activatedTab">
          <Tab  v-slot="{ selected }" as="template">
            <router-link class="relative" :to="{path: '/listings', query: {listings:'pending'}}">
              <button 
                :class="selected ? 'text-oswapGreen-dark dark:text-oswapGreen':'opacity-80'"
                class="hover:text-oswapGreen-dark dark:hover:text-oswapGreen font-semibold">
                Pending
              </button>
              <div v-if="selected" class="absolute w-10/12 mt-2 border-t-2 border-oswapGreen-dark dark:border-oswapGreen"></div>
            </router-link>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <router-link class="relative" :to="{path: '/listings', query: {listings:'all'}}">
              <button 
                :class="selected ? 'text-oswapGreen-dark dark:text-oswapGreen':' opacity-80'"
                class="hover:text-oswapGreen-dark dark:hover:text-oswapGreen font-semibold">
                All
              </button>
              <div v-if="selected" class="absolute w-10/12 mt-2 border-t-2 border-oswapGreen-dark dark:border-oswapGreen"></div>
            </router-link>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <router-link class="relative" :to="{path: '/listings', query: {listings:'new'}}">
              <button 
                :class="selected ? 'text-oswapGreen-dark dark:text-oswapGreen':'opacity-80'"
                class="hover:text-oswapGreen-dark dark:hover:text-oswapGreen font-semibold">
                Submition
              </button>
              <div v-if="selected" class="absolute w-10/12 mt-2 border-t-2 border-oswapGreen-dark dark:border-oswapGreen"></div>
            </router-link>
          </Tab>
        </TabList>
        <TabPanels class="flex flex-1 w-full mt-4">
          <TabPanel class="flex flex-1">
            <PendingListing/>
          </TabPanel>
          <TabPanel class="flex flex-1">
          </TabPanel>
          <TabPanel class="flex flex-1" >
            <NewListing/>
          </TabPanel>
        </TabPanels>
      </TabGroup>
        
    </div>
  </div>
</template>

<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import NewListing from "@/components/listings/NewListing";
import PendingListing from "@/components/listings/PendingListing";

export default {
  name: "Listings",
  mixins: [],
  components: { 
    NewListing,
    PendingListing,
    TabGroup, 
    TabList, 
    Tab, 
    TabPanels, 
    TabPanel
  },
  computed: {
  },
  watch: {
    $route(to, from) {
      this.updateTab(to.query.listings)
    }
  },
  methods: { 
    updateTab(listingsDesc) {
      switch (listingsDesc) {
        case 'pending':
          this.activatedTab = 0;
          break;
        case 'all':
          this.activatedTab = 1;
          break;
        case 'new':
          this.activatedTab = 2;
          break;
        default:
          this.activatedTab = 0;
          break;
      }
    }
  },
  mounted: function () {
    this.updateTab(this.$route.query.listings)
  },
  data() {
    return {
      activatedTab: null,
    };
  },
};
</script>
