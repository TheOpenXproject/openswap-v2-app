

<template>
    <div class="flex flex-none flex-col md:items-start items-center space-y-4 st5 st5-all py-6 px-4 group bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray rounded-3xl border-l border-oswapGreen">
        <div class="flex flex-none">
            <span class="text-oswapGreen-dark">{{title}}</span>
        </div>
        <div class="flex flex-none md:flex-row flex-col space-x-0 space-y-2 md:space-y-0 md:space-x-2 items-center">
            <i class="las la-clock"></i>
            <span>Ends {{returnNormalDate(limitDate)}}</span>
            <i class="las la-dot-circle"></i>
            <span>{{shortenAddress(address)}}</span>
            <div class="bg-gray-300 dark:bg-slightDark dark:text-slightGray rounded-2xl py-1 px-2 flex flex-none space-x-2 items-center text-sm">
                <i :class="type === 'EXTERNAL'? 'las la-users':'las la-user-alt'"></i>
                <span>{{type}}</span>
            </div>
        </div>
        <div class="flex flex-none w-full justify-between">
            <StateTag :state="state"/>
            <button class="flex  bg-gray-100 dark:bg-oswapDark rounded-full p-2 items-center shadow-lg ">
                <i class="las la-arrow-right text-xl"></i>
            </button>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import StateTag from "@/components/dao/StateTag";
  export default {
    name: 'MainCard',
    mixins: [],
    components: {
        StateTag
    },
    props: {
        title: String,
        state: String,
        limitDate: String,
        address: String,
        type: String,
    },
    data() {
      return {
      }
    },
    mounted: async function(){
    },
    computed: {
        stateClass() {
            switch (this.state) {
                case 'DECLINED':
                    return 'bg-yellow-600'
                case 'PASSED':
                    return 'bg-oswapGreen-dark'
                case 'ACTIVE':
                    return 'bg-purple-600'
            }
        }
    },
    methods: {
        returnNormalDate(blocktimestamp) {
            const date = dayjs(blocktimestamp * 1000)
            return date.format('MMM D, YYYY HH:mm')
        },
        shortenAddress(address) {
            return address ? (address = `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`) : address;
        },
    }
  }
</script>
