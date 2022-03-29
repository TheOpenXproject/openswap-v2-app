<template>
  <div id="contacts" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-start oswap-layout xl:px-0 px-3 text-gray-500 py-16" >
    <div class="flex flex-1 w-full flex-col">
        <div class="flex flex-none justify-between items-center">
            <span class="md:text-3xl text-xl">Contacts</span>
            <div class="flex flex-none flex-col space-y-4">
                <button class="flex flex-row items-center space-x-2 text-oswapGreen-dark dark:text-oswapGreen-light">
                    <i class="las la-sliders-h"></i>
                    <span>Manage List</span>
                </button>
                <Listbox v-model="addressMode">
                    <div class="relative mt-1 text-gray-400">
                        <ListboxButton
                            v-slot="{ open }"
                            class="flex flex-row items-center space-x-8 relative w-full py-3 px-4 justify-between bg-oswapGreen-light bg-opacity-10  rounded-lg cursor-pointer sm:text-sm"
                        >
                        <span class="block truncate">{{ addressMode.title }}</span>
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
                    <router-link class="relative" :to="{path: '/contacts', query: {contacts:'wallets'}}">
                    <button 
                        :class="selected ? 'text-oswapGreen-dark dark:text-oswapGreen':'opacity-80'"
                        class="hover:text-oswapGreen-dark dark:hover:text-oswapGreen font-semibold">
                        Contacts
                    </button>
                    <div v-if="selected" class="absolute w-10/12 mt-2 border-t-2 border-oswapGreen-dark dark:border-oswapGreen"></div>
                    </router-link>
                </Tab>
                <Tab v-slot="{ selected }" as="template">
                    <router-link class="relative" :to="{path: '/contacts', query: {contacts:'contracts'}}">
                    <button 
                        :class="selected ? 'text-oswapGreen-dark dark:text-oswapGreen':' opacity-80'"
                        class="hover:text-oswapGreen-dark dark:hover:text-oswapGreen font-semibold">
                        Trusted Contracts
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
import Table from "@/components/contacts/Table";
  export default {
    name: 'Contacts',
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
        Table
    },
    watch: {
        $route(to, from) {
            this.updateTab(to.query.contacts)
        }
    },
    methods: { 
        updateTab(contactsDesc) {
        switch (contactsDesc) {
            case 'wallets':
            this.activatedTab = 0;
            break;
            case 'contracts':
            this.activatedTab = 1;
            break;
            default:
            this.activatedTab = 0;
            break;
        }
        }
    },
    mounted: function () {
        this.updateTab(this.$route.query.contacts)
    },
    data() {
        return {
            activatedTab: null,
            addressMode: {
                    title: "0x (hex)",
                    value: 0
            },
            options: [
                {
                    title: "0x (hex)",
                    value: 0
                },
                {
                    title: "one (bench32)",
                    value: 1
                },
            ]
        };
    },
  }
</script>