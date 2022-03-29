<template>
    <div class="flex flex-col flex-none w-full">
        <div class="flex flex-1 flex-col space-y-6">
          <span class="md:text-3xl text-xl mb-4">{{pageTitle}}</span>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">DAO Name</span>
            <input 
              v-model="name" 
              placeholder="Enter DAO Name" 
              class="flex ring-1 placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Vote Token Name</span>
            <input 
              v-model="voteTokenName" 
              placeholder="Enter Vote Token Name" 
              class="flex ring-1 placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
          </div>
          <div class="flex flex-col space-y-2 flex-none w-full">
            <span class="text-oswapGreen font-semibold">Internal NFT Name</span>
            <input 
              v-model="nftName" 
              placeholder="Enter Internal NFT Name" 
              class="flex ring-1 placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
          </div>
          <div class="flex flex-none space-x-2">
              <div class="flex flex-1 flex-col space-y-2">
                <span class="text-oswapGreen font-semibold">Supply Percentage to Propose</span>
                <div class="flex flex-none w-full relative items-center">
                    <input 
                        v-model="supply" 
                        placeholder="" 
                        type="number"
                        class="flex ring-1 w-full placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
                    <i class="las la-percentage text-3xl text-oswapGreen-dark absolute right-2"></i>
                </div>
              </div>
              <div class="flex flex-1 flex-col space-y-2">
                <span class="text-oswapGreen font-semibold">Minimum Vote Ratio to Propose</span>
                <div class="flex flex-none items-center ">
                    <div class="flex flex-1">
                        <input 
                            v-model="propVoteRatioFrom" 
                            placeholder="" 
                            type="number"
                            class="flex ring-1 w-full placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
                    </div>
                    <span class="mx-2">:</span>
                    <div class="flex flex-1">
                        <input 
                            v-model="propVoteRatioTo" 
                            placeholder="" 
                            type="number"
                            class="flex ring-1 w-full placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
                    </div>
                </div>
              </div>
          </div>
          <div class="flex flex-none space-x-2">
              <div class="flex flex-1 flex-col space-y-2">
                <span class="text-oswapGreen font-semibold">Minimum Vote Ratio to Pass</span>
                <div class="flex flex-none items-center">
                    <div class="flex flex-1">
                        <input 
                            v-model="passVoteRatioFrom" 
                            placeholder="" 
                            type="number"
                            class="flex ring-1 w-full placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
                    </div>
                    <span class="mx-2">:</span>
                    <div class="flex flex-1">
                        <input 
                            v-model="passRatioTo" 
                            placeholder="" 
                            type="number"
                            class="flex ring-1 w-full placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
                    </div>
                </div>
              </div>
              <div class="flex flex-1 flex-col space-y-2">
                <span class="text-oswapGreen font-semibold">Minimum Quorum to Pass</span>
                <input 
                    v-model="quorum" 
                    placeholder="" 
                    type="number"
                    class="flex ring-1 w-full placeholder-opacity-80 focus:outline-none  ring-black focus:ring-oswapGreen ring-opacity-5 rounded-xl py-2 items-center pl-10 from-gray-300 bg-gradient-to-r to-slightGray dark:from-oswapDark dark:to-oswapDark-gray dark:placeholder-gray-600 placeholder-oswapDark">
              </div>
          </div>
          <div class="flex flex-none justify-end">
            <DarkButton class="py-2 px-6">
              <span>Next</span>
            </DarkButton>
          </div>
        </div>
    </div>
</template>

<script>
import DarkButton from "@/components/dao/DarkButton";
  export default {
    name: 'ListingsForm',
    mixins: [],
    components: {
        DarkButton
    },
    props: {
        name: String,
        voteTokenName: String,
        nftName: String,
        supply: {
            Type: Number,
            default() {
                return 0
            }
        },
        propVoteRatioFrom: {
            Type: Number,
            default() {
                return 1
            }
        },
        propVoteRatioTo: {
            Type: Number,
            default() {
                return 1
            }
        },
        passVoteRatioFrom: {
            Type: Number,
            default() {
                return 1
            }
        },
        passRatioTo: {
            Type: Number,
            default() {
                return 1
            }
        },
        quorum: {
            Type: Number,
            default() {
                return 1
            }
        },
        pageTitle: String
    },
    data() {
      return {
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
