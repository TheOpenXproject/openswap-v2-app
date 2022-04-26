<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <ul v-if="!viewing" role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <li v-for="nft in nfts" class="col-span-1 flex flex-col text-center border border-grey-500 dark:border-grey-100 dark:border-gray-700 bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-800">
      <div class="flex-1 flex flex-col p-8">
        <img v-if="nft.metadata.image != '' && nft.metadata.image" class="w-full overflow-none " :src="nft.metadata.image" alt="" />
        <video autoplay loop v-if="nft.metadata.animation_url" width="600" height="600">
      <source :src="nft.metadata.animation_url" type="video/mp4">
      Your browser does not support the video tag.
    </video> 
        <h3 class="mt-6 text-gray-900 dark:text-gray-100 text-sm font-medium">{{ nft.metadata.name }}</h3>
        <dl v-if="this.sendNFT != nft" class="mt-1 flex-grow flex flex-col rounded-lg justify-between">
          <dt v-if="nft.metadata.description">
            <div class="relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
              </div>
              <div class="relative flex justify-center">
                <span class="px-2 text-sm text-gray-500 dark:text-gray-100"> Description </span>
              </div>
            </div>
          </dt>
          <dd v-if="nft.metadata.description" class="text-gray-500 dark:text-gray-100 text-sm">{{ nft.metadata.description }}</dd>
          <dt v-if="nft.metadata.id">
            <div class="relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
              </div>
              <div class="relative flex justify-center">
                <span class="px-2 text-sm text-gray-500 dark:text-gray-100"> ID </span>
              </div>
            </div>
          </dt>
          <dd class="mt-3 mb-5">
            <span v-if="nft.metadata.id" class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 w-15 h-8 overflow-hidden rounded-full">{{ nft.metadata.id }}</span>
          </dd>
          <dt>
            <div class="relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
              </div>
              <div class="relative flex justify-center">
                <span class="px-2 text-sm text-gray-500 dark:text-gray-100"> Owner </span>
              </div>
            </div>
          </dt>
          <dd class="mt-3 mb-5">
            <span v-if="nft.owner == user" class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 h-10 rounded-full">You own this token </span>
            <span v-if="nft.owner != user" class="px-2 py-1 text-red-800 text-xs font-medium bg-red-100 h-10 rounded-full">You don't own this token</span>
          </dd>
           <dt>
            <div class="relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
              </div>
              <div class="relative flex justify-center">
                <span class="px-2 text-sm text-gray-500 dark:text-gray-100"> Circ. Supply </span>
              </div>
            </div>
          </dt>
          <dd class="mt-3 mb-5">
            <span>{{ nft.totalSupply}} </span>
          </dd>
        </dl>
        <div v-if="this.sendNFT == nft">
          <sendNFTModal :nft="nf" :open="sending" @input0="inputAddr" @close="close()"/>
        </div>
      </div>
      <div>
        <div v-if="this.sendNFT == nft" class="-mt-px flex divide-x divide-gray-200 dark:divide-gray-700">
          <div class="w-0 flex-1 flex">
            <button @click="close()" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 dark:text-gray-100 font-medium border border-grey-500 dark:border-grey-100 dark:border-gray-700 rounded-bl-lg hover:text-gray-500">
              <span class="ml-3">Cancel</span>
            </button>
          </div>
          <div class="-ml-px w-0 flex-1 flex">
            <button @click="sendNFTwallet(nft)" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 dark:text-gray-100 font-medium border border-grey-500 dark:border-grey-100 dark:border-gray-700 rounded-br-lg hover:text-gray-500">
              <span class="ml-3">Send</span>
            </button>
          </div>
        </div>
        <div v-if="this.sendNFT != nft" class="-mt-px flex divide-x divide-gray-200 dark:divide-gray-700">
          <div class="w-0 flex-1 flex">
            <button @click="setView(nft)" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 dark:text-gray-100 font-medium border border-grey-500 dark:border-grey-100 dark:border-gray-700 rounded-bl-lg hover:text-gray-500">
              <span class="ml-3">View</span>
            </button>
          </div>
          <div class="-ml-px w-0 flex-1 flex">
            <button @click="sendNFTf(nft)" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 dark:text-gray-100 font-medium border border-grey-500 dark:border-grey-100 dark:border-gray-700 rounded-br-lg hover:text-gray-500">
              <span class="ml-3">Send</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>

  <div v-if="viewing">
  <nftOverviewLarge :nft="viewNFT" @unsetView="unsetView()"/>
  </div>

   
</template>

<script>
import nftOverviewLarge from "@/components/NFT/nftOverviewLarge";
import sendNFTModal from "@/components/NFT/sendNFTModal";
  import openswap from "@/shared/openswap.js";

//v-if="nft.owner==user" 
export default {
  mixins:[openswap],
  components: {
  	nftOverviewLarge,
  	sendNFTModal
  },
  props:{
  	nfts: Object,
  	user: String
  },
  methods:{
  	sendNFTf(nft){
  		this.sending = true
      this.sendNFT = nft
  	},
  	close(){
  		this.sending = false
       this.sendNFT = null
  	},
    sendNFTwallet(nft){
      console.log(this.sendAddr)
      this.sendNft(nft, this.sendAddr)
    },
    inputAddr(addr){
      this.sendAddr = addr
    },
  	setView(id){
  		this.viewing = true
      this.$emit('toggleViewing')

  		this.viewNFT = id
    },
    unsetView(){
  		this.viewing = false
      this.$emit('toggleViewing')
    }
  },
  data(){
  	return{
  		viewing: false,
  		viewNFT: null,
  		sending: false,
      sendNFT: null,
      sendAddr: "",
  	}
  },
  setup() {
    return {

    }
  },
}
</script>

