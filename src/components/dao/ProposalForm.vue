<template>
    <div class="flex flex-col flex-none w-full">
        <div class="flex flex-1 flex-col space-y-6">
          <span class="md:text-3xl text-xl mb-4">{{pageTitle}}</span>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Proposal Type</span>
            <div class="flex flex-wrap">
              <template v-for="(options, index) in types">
                <label class="inline-flex items-center p-2">
                  <input 
                    :id="index" type="radio" v-model="type" 
                    :value="options" 
                    class="hidden" 
                    >
                    <label :for="index" 
                      :class="type === options? 'text-oswapBlue-light dark:text-oswapGreen':''"
                      class="flex items-center cursor-pointer "
                      >
                      <span 
                        :class="type === options? 'border-oswapBlue-light dark:border-oswapGreen-light bg-oswapBlue-light dark:bg-oswapGreen ring-2 ring-slightGray':''"
                        class="w-6 h-6 inline-block mr-2 rounded-full border border-grey p-1 flex-no-shrink">
                      </span>
                      {{options}}
                    </label>
                </label>
              </template>
            </div>
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Title</span>
            <input 
              v-model="title" 
              placeholder="Enter Title" 
              class="flex ring-1 placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Content</span>
            <QuillEditor theme="snow" v-model="content" />
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <div class="flex flex-1 justify-between">
              <span class="text-oswapGreen font-semibold">Parameters</span>
              <button @click="addParameter()" class="flex flex-none space-x-4 items-center text-oswapGreen-dark">
                <i class="las la-plus text-2xl"></i>
                <span>Add Parameter</span>
              </button>
            </div>
              <template v-for="(param,index) in parameters">
                <Listbox v-model="parameters[index]">
                  <div class="relative mt-1 text-gray-400">
                      <ListboxButton
                          v-slot="{ open }"
                          class="flex flex-row items-center space-x-8 relative w-full py-3 px-4 justify-between bg-oswapGreen-light bg-opacity-10  rounded-lg cursor-pointer sm:text-sm"
                      >
                      <span class="block truncate">{{ param || 'Select Parameter' }}</span>
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
                          v-for="mode in parametersOptions"
                          :key="mode"
                          :value="mode"
                          as="template"
                          >
                              <div 
                                  class=" cursor-pointer hover:text-oswapBlue-light ">
                                  <span>{{ mode }}</span>
                              </div>
                          </ListboxOption>
                      </ListboxOptions>
                      </transition>
                  </div>
                </Listbox>
              </template>
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
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
  export default {
    name: 'ListingsForm',
    mixins: [],
    components: {
        QuillEditor,
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        DarkButton
    },
    props: {
        type: {
            default() {
                return 'External'
            }
        },
        title: String,
        content: String,
        parameters: {
            default() {
                return []
            }
        },
        pageTitle: String
    },
    data() {
      return {
        types: ['External','Internal'],
        parametersOptions: ['a','b'],
        parameters: []
      }
    },
    mounted: async function(){
    },
    computed: {
    },
    methods: {
      addParameter() {
        this.parameters.push('')
      }
    }
  }
</script>
