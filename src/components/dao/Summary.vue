<template>
    <div class="flex flex-col md:w-72">
        <div class="flex flex-none rounded-t-lg bg-oswapGreen-light bg-opacity-20 px-4 py-2">
            <span class="text-oswapGreen">Details</span>
        </div>
        <div class="flex flex-none space-y-4 flex-col justify-between items-center rounded-b-lg bg-oswapGreen-light bg-opacity-5 px-4 py-4">
            <div class="flex flex-none w-full justify-between">
                <span>Identifer</span>
                <div class="flex flex-none items-center space-x-2 text-oswapGreen-dark">
                    <span >{{identifier}}</span>
                    <i class="las la-external-link-alt text-2xl"></i>
                </div>
            </div>
            <div class="flex flex-none w-full justify-between">
                <span>Creator</span>
                <div class="flex flex-none items-center space-x-2 text-oswapGreen-dark">
                    <span >{{shortenAddress(creator)}}</span>
                    <i class="las la-external-link-alt text-2xl"></i>
                </div>
            </div>
            <div class="flex flex-none w-full justify-between">
                <span>Start Date</span>
                <span class="text-oswapGreen-dark">{{start}}</span>
            </div>
            <div class="flex flex-none w-full justify-between">
                <span>End Date</span>
                <span class="text-oswapGreen-dark">{{end}}</span>
            </div>
            <div class="flex flex-none w-full justify-between">
                <span>Timings</span>
                <span class="text-oswapGreen-dark">{{timings}}</span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Summary',
    mixins: [],
    props: {
        identifier: String,
        creator: String,
        start: String,
        end: String,
        timings: String,
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
        shortenAddress(address) {
            return address ? (address = `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`) : address;
        },
    }
  }
</script>
