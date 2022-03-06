<template>
  <div id="assets" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-start oswap-layout xl:px-0 px-3 text-gray-500 py-16" >
      <div class="flex flex-1 md:flex-row flex-col md:space-x-4 w-full ">
        <div class="flex flex-1 w-full flex-col md:order-1 order-2">
            <div class="flex flex-none justify-between items-center">
                <span class="md:text-3xl text-xl">Assets</span>
                <div class="flex flex-none flex-col space-y-4">
                    <button class="flex flex-row items-center space-x-2 text-oswapGreen-dark dark:text-oswapGreen-light">
                        <i class="las la-sliders-h"></i>
                        <span>Manage List</span>
                    </button>
                    <Listbox v-model="valueMode">
                        <div class="relative mt-1 text-gray-400">
                            <ListboxButton
                                v-slot="{ open }"
                                class="flex flex-row items-center space-x-8 relative w-full py-3 px-4 justify-between bg-oswapGreen-light bg-opacity-10  rounded-lg cursor-pointer sm:text-sm"
                            >
                            <span class="block truncate">{{ valueMode.title }}</span>
                            <i :class="[open? 'las la-angle-up':'las la-angle-down' , 'text-oswapBlue-light']"></i>
                            </ListboxButton>

                            <transition
                            leave-active-class="transition duration-100 ease-in"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                            >
                            <ListboxOptions
                                class="absolute w-full py-3 px-4 my-1 text-base bg-oswapGreen-light bg-opacity-10 flex-col flex  max-h-60 sm:text-sm"
                            >
                                <ListboxOption
                                class="py-3 px-4"
                                v-for="mode in options"
                                :key="mode.value"
                                :value="mode"
                                as="template"
                                >
                                    <div 
                                        class=" cursor-pointer hover:text-oswapBlue-light ">
                                        <span>{{ mode.title }}</span>
                                    </div>
                                </ListboxOption>
                            </ListboxOptions>
                            </transition>
                        </div>
                    </Listbox>
                </div>
            </div>
            <div class="flex flex-1 flex-col">
                <TabGroup :defaultIndex="activatedTab" v-if="activatedTab !== null" >
                    <TabList class="space-x-4 py-6 justify-start items-center flex " :selectedIndex="activatedTab">
                    <Tab  v-slot="{ selected }" as="template">
                        <router-link class="relative" :to="{path: '/assets', query: {assets:'available'}}">
                        <button 
                            :class="selected ? 'text-oswapGreen-dark dark:text-oswapGreen':'opacity-80'"
                            class="hover:text-oswapGreen-dark dark:hover:text-oswapGreen font-semibold">
                            Available
                        </button>
                        <div v-if="selected" class="absolute w-10/12 mt-2 border-t-2 border-oswapGreen-dark dark:border-oswapGreen"></div>
                        </router-link>
                    </Tab>
                    <Tab v-slot="{ selected }" as="template">
                        <router-link class="relative" :to="{path: '/assets', query: {assets:'staked'}}">
                        <button 
                            :class="selected ? 'text-oswapGreen-dark dark:text-oswapGreen':' opacity-80'"
                            class="hover:text-oswapGreen-dark dark:hover:text-oswapGreen font-semibold">
                            Staked
                        </button>
                        <div v-if="selected" class="absolute w-10/12 mt-2 border-t-2 border-oswapGreen-dark dark:border-oswapGreen"></div>
                        </router-link>
                    </Tab>
                    </TabList>
                    <TabPanels class="flex flex-1 mt-4">
                        <TabPanel class="flex flex-1 w-full">
                            <Table/>
                        </TabPanel>
                        <TabPanel class="flex flex-1 w-full">
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
        <div class="flex flex-none md:order-2 order-1 md:justify-start justify-center md:pb-0 pb-4">
            <WalletCard :address='address' :balance='balance'/>
        </div>
      </div>
  </div>
</template>

<script>
import { 
    TabGroup, 
    TabList, 
    Tab, 
    TabPanels, 
    TabPanel, 
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import Table from "@/components/assets/Table";
import WalletCard from "@/components/assets/WalletCard";
  export default {
    name: 'Assets',
    components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    Table,
    WalletCard,
},
    watch: {
        $route(to, from) {
            this.updateTab(to.query.assets)
        }
    },
    methods: { 
        updateTab(contactsDesc) {
        switch (contactsDesc) {
            case 'available':
                this.activatedTab = 0;
            break;
            case 'staked':
                this.activatedTab = 1;
            break;
            default:
                this.activatedTab = 0;
            break;
        }
        }
    },
    mounted: function () {
        this.updateTab(this.$route.query.assets)
    },
    data() {
        return {
            address: '0xddc50feb9103cae45aab9db86ed19d53ff5b7b40',
            balance: '2,304,622.90',
            activatedTab: null,
            valueMode: {
                    title: "$ USD (US Dollar)",
                    value: 0
            },
            options: [
                {
                    title: "$ USD (US Dollar)",
                    value: 0
                },
            ],
        };
    },
  }
</script>