<template>
    <div class="flex flex-col md:w-72">
        <div class="flex flex-none rounded-t-lg bg-oswapGreen-light bg-opacity-20 px-4 py-2">
            <span class="text-oswapGreen">{{network}}</span>
        </div>
        <div class="flex flex-none space-y-4 flex-col justify-center items-center rounded-b-lg bg-oswapGreen-light bg-opacity-5 px-4 py-8">
            <span>My Wallet</span>
            <span class="text-oswapGreen-light ">{{shortenAddress(address)}}</span>
            <div class="flex flex-none space-x-2">
                <i @click="qrModal = !qrModal" class="las la-qrcode text-4xl text-oswapBlue-light cursor-pointer"></i>
                <i @click="copyAddress(address)" class="las la-copy text-4xl text-oswapBlue-light cursor-pointer"></i>
                <a :href="'https://explorer.harmony.one/address/'+ address" target="_blank">
                    <i class="las la-external-link-alt text-4xl text-oswapBlue-light"></i>
                </a>
            </div>
            <span class="text-3xl font-semibold">$ {{balance}}</span>
            <div v-if="qrModal">
                <Qr :address='address'/>
            </div>
        </div>
    </div>
</template>


<script>
import Qr from "@/components/Qr";
  export default {
    name: 'WalletCard',
    mixins: [],
    components: {
        Qr
    },
    props: {
        address: String,
        balance: String,
        network: {
            default() {
                return 'Mainnet'
            }
        },
    },
    data() {
      return {
          qrModal:false
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
        async copyAddress(address) {
            try {
                await navigator.clipboard.writeText(address)
                    toastMe('success', {
                    title: 'Sucessfully Copied',
                    link: false,
                    href: '',
                    })
            } catch ($e) {
                    toastMe('warning', {
                    title: 'Error Copying',
                    link: false,
                    href: '',
                    })
            }
        },
    }
  }
</script>