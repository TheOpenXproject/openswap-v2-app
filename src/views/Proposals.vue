<template>
  <div id="proposals" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-start oswap-layout xl:px-0 px-3 text-gray-500 py-16" >
    <div class="flex flex-1 w-full flex-col">
        <div class="flex flex-none relative py-8 px-2 flex-col bg-oswapGreen-light bg-opacity-10 space-y-4 rounded-md">
            <span class="md:text-3xl text-xl">Proposals</span>
            <span class="text-sm text-gray-400 dark:text-gray-500 ">Add your valuable input to the future of DAO</span>
            <DarkButton class="w-44 p-2">
                <i class="las la-user-edit"></i>
                <span class="whitespace-nowrap">Create a Proposal</span>
            </DarkButton>
            <img class="absolute w-28 h-36 right-10 opacity-20" src="@/assets/proposal-bg.png">
        </div>
        <div class="flex flex-1 flex-col">
            <TabGroup :defaultIndex="activatedTab" v-if="activatedTab !== null" >
                <div class="flex flex-none md:flex-row flex-col justify-between items-center">
                    <TabList class="space-x-4 py-6 justify-start items-center flex " :selectedIndex="activatedTab">
                        <Tab  v-slot="{ selected }" as="template">
                            <router-link class="relative" :to="{path: '/proposals', query: {proposals:'all'}}">
                            <button 
                                :class="selected ? 'text-oswapGreen-dark dark:text-oswapGreen':'opacity-80'"
                                class="hover:text-oswapGreen-dark dark:hover:text-oswapGreen font-semibold">
                                All Proposals
                            </button>
                            <div v-if="selected" class="absolute w-10/12 mt-2 border-t-2 border-oswapGreen-dark dark:border-oswapGreen"></div>
                            </router-link>
                        </Tab>
                        <Tab v-slot="{ selected }" as="template">
                            <router-link class="relative" :to="{path: '/proposals', query: {proposals:'active'}}">
                            <button 
                                :class="selected ? 'text-oswapGreen-dark dark:text-oswapGreen':' opacity-80'"
                                class="hover:text-oswapGreen-dark dark:hover:text-oswapGreen font-semibold">
                                Active
                            </button>
                            <div v-if="selected" class="absolute w-10/12 mt-2 border-t-2 border-oswapGreen-dark dark:border-oswapGreen"></div>
                            </router-link>
                        </Tab>
                        <Tab v-slot="{ selected }" as="template">
                            <router-link class="relative" :to="{path: '/proposals', query: {proposals:'passed'}}">
                            <button 
                                :class="selected ? 'text-oswapGreen-dark dark:text-oswapGreen':' opacity-80'"
                                class="hover:text-oswapGreen-dark dark:hover:text-oswapGreen font-semibold">
                                Passed
                            </button>
                            <div v-if="selected" class="absolute w-10/12 mt-2 border-t-2 border-oswapGreen-dark dark:border-oswapGreen"></div>
                            </router-link>
                        </Tab>
                        <Tab v-slot="{ selected }" as="template">
                            <router-link class="relative" :to="{path: '/proposals', query: {proposals:'declined'}}">
                            <button 
                                :class="selected ? 'text-oswapGreen-dark dark:text-oswapGreen':' opacity-80'"
                                class="hover:text-oswapGreen-dark dark:hover:text-oswapGreen font-semibold">
                                Declined
                            </button>
                            <div v-if="selected" class="absolute w-10/12 mt-2 border-t-2 border-oswapGreen-dark dark:border-oswapGreen"></div>
                            </router-link>
                        </Tab>
                    </TabList>
                    <div class="flex flex-none relative items-center w-auto md:w-72 ">
                        <div class="absolute left-0 pl-3 flex items-center pointer-events-none">
                            <i class="las la-search text-oswapGreen-dark"></i>
                        </div>
                        <input 
                            v-model="search" 
                            placeholder="Search for proposals..." 
                            class="flex w-full ring-1 placeholder-opacity-40 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 bg-oswapGreen-dark bg-opacity-10 dark:placeholder-gray-600 placeholder-oswapDark">
                    </div>
                </div>

                <TabPanels class="flex flex-1 mt-4">
                    <TabPanel class="flex flex-1 w-full">
                        <div class="flex flex-col space-y-4 w-full">
                            <template v-for="proposal in proposals">
                                <MainCard 
                                    :title="proposal.title" 
                                    :state="proposal.state" 
                                    :limitDate="proposal.limitDate" 
                                    :address="proposal.address"
                                    :type="proposal.type"/>
                            </template>
                        </div>
                    </TabPanel>
                    <TabPanel class="flex flex-1 w-full">
                    </TabPanel>
                </TabPanels>
            </TabGroup>
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
import DarkButton from "@/components/dao/DarkButton";
import MainCard from "@/components/dao/MainCard";
  export default {
    name: 'Proposals',
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
        MainCard,
        DarkButton
    },
    watch: {
        $route(to, from) {
            this.updateTab(to.query.proposals)
        }
    },
    methods: { 
        updateTab(proposalsDesc) {
        switch (proposalsDesc) {
            case 'all':
            this.activatedTab = 0;
            break;
            case 'active':
            this.activatedTab = 1;
            break;
            case 'passed':
            this.activatedTab = 2;
            break;
            case 'declined':
            this.activatedTab = 3;
            break;
            default:
            this.activatedTab = 0;
            break;
        }
        },
    },
    mounted: function () {
        this.updateTab(this.$route.query.proposals)
    },
    data() {
        return {
            activatedTab: null,
            search: '',
            proposals: [
                {
                    title: 'Deduct pool emissions to zero lead to Deflation, we need cake to be deflation',
                    state: 'ACTIVE',
                    limitDate: '1635446405',
                    address: '0x87e9c993d819e9654aea50607f319e72d2815fc2',
                    type: 'INTERNAL',
                },
                {
                    title: 'Which Garden should we launch next?',
                    state: 'DECLINED',
                    limitDate: '1635446405',
                    address: '0x87e9c993d819e9654aea50607f319e72d2815fc2',
                    type: 'INTERNAL',
                },
                {
                    title: 'Deduct pool emissions to zero lead to Deflation, we need cake to be deflation',
                    state: 'PASSED',
                    limitDate: '1635446405',
                    address: '0x87e9c993d819e9654aea50607f319e72d2815fc2',
                    type: 'EXTERNAL',
                },
            ]
        };
    },
  }
</script>