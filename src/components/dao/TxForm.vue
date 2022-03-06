<template>
    <div class="flex flex-col flex-none w-full">
        <div class="flex flex-1 flex-col space-y-6">
          <span class="md:text-3xl text-xl mb-4">{{pageTitle}}</span>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Transaction Type</span>
            <div class="flex flex-wrap">
              <template v-for="(options, index) in types">
                <label class="inline-flex items-center p-2">
                  <input 
                    :id="index" type="radio" v-model="txType" 
                    :value="options" 
                    class="hidden" 
                    >
                    <label :for="index" 
                      :class="txType === options? 'text-oswapBlue-light dark:text-oswapGreen':''"
                      class="flex items-center cursor-pointer "
                      >
                      <span 
                        :class="txType === options? 'border-oswapBlue-light dark:border-oswapGreen-light bg-oswapBlue-light dark:bg-oswapGreen ring-2 ring-slightGray':''"
                        class="w-6 h-6 inline-block mr-2 rounded-full border border-grey p-1 flex-no-shrink">
                      </span>
                      {{options}}
                    </label>
                </label>
              </template>
            </div>
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Token</span>
            <Listbox v-model="token">
                <div class="relative mt-1 text-gray-400">
                    <ListboxButton
                        v-slot="{ open }"
                        class="flex flex-row items-center space-x-8 relative w-full py-3 px-4 justify-between bg-oswapGreen-light bg-opacity-10  rounded-lg cursor-pointer sm:text-sm"
                    >
                    <span class="block truncate">{{ token || 'Select Token' }}</span>
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
                        v-for="token in tokens"
                        :key="token.id"
                        :value="token.id"
                        as="template"
                        >
                            <div 
                                class=" cursor-pointer hover:text-oswapBlue-light ">
                                <span>{{ token.symbol }}</span>
                            </div>
                        </ListboxOption>
                    </ListboxOptions>
                    </transition>
                </div>
            </Listbox>
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Amount</span>
            <input 
              v-model="amount" 
              placeholder="Enter Amount" 
              class="flex ring-1 placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
          </div>
          <div class="flex flex-none justify-end">
            <DarkButton class="py-2 px-6">
              <span>Submit</span>
            </DarkButton>
          </div>
        </div>
    </div>
</template>

<script>
import { 
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import DarkButton from "@/components/dao/DarkButton";
  export default {
    name: 'ListingsForm',
    mixins: [],
    components: {
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        DarkButton
    },
    props: {
        txType: String,
        token: String,
        amount: String,
        pageTitle: String
    },
    data() {
      return {
        types: ['Transfer','Add Liquidity', 'Remove Liquidity', 'Delegate', 'Edit DAO', 'Other'],
        tokens: [],
      }
    },
    mounted: async function(){
    },
    computed: {
    },
    methods: {
    }
  }
</script>
