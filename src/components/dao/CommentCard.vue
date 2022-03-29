

<template>
    <div class="flex flex-none flex-col space-y-2">
        <div class="flex flex-1 justify-between">
            <div class="flex flex-none items-center space-x-4">
                <a class="text-oswapBlue-light" :href="'https://explorer.harmony.one/address/'+ address" >
                    <span class="text-lg">{{shortenAddress(address)}}</span>
                    <i class="las la-external-link-alt text-2xl"></i>
                </a>
                
                <div
                    :class="voteClass" 
                    class="text-slightGray rounded-lg py-2 px-4 flex flex-none space-x-2 items-center text-sm bg-opacity-60">
                    {{vote}}
                </div>
            </div>
            <div>
                <i class="las la-ellipsis-h text-2xl"></i>
            </div>
        </div>
        <div class="flex flex-none">
            <span>{{value}}</span>
        </div>
        <div class="flex flex-none items-center space-x-4 opacity-80 text-center">
            <span class="text-oswapBlue-light">Reply</span>
            <i class="las la-dot-circle"></i>     
            <span>{{timeDiff}}</span>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs"

  export default {
    name: 'CommentCard',
    mixins: [],
    components: {
    },
    props: {
        value: String,
        vote: String,
        address: String,
        time: String,
    },
    data() {
      return {
      }
    },
    mounted: async function(){
    },
    computed: {
        timeDiff() {
            const now = dayjs()
            const commentDate = dayjs(this.time * 1000)
            const minutes = now.diff(commentDate, 'minute')
            const hours = now.diff(commentDate, 'hour')
            const days = now.diff(commentDate, 'day')
            if (minutes < 60) {
                return `${minutes} mins ago`
            }
            if (hours < 24) {
                return `${hours} hrs ago`
            }
            return `${days} days ago`
        },
        voteClass() {
            if (this.vote === 'Agree') {
                return 'bg-yellow-600'
            } else {
                return 'bg-purple-600'
            }
        }
    },
    methods: {
      shortenAddress(address) {
        return address ? (address = `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`) : address;
      },
    }
  }
</script>
