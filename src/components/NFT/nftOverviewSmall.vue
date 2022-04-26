
<template>
  <ul role="list" class="w-full">
    
    <li class="flex flex-col text-center rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
     
      <div class="flex-1 flex flex-col items-center">
        <h1 class="mt-5 mb-5 text-gray-800 dark:text-gray-100 text-lg">{{nft.name}}</h1>
        <img v-if="nft.metadata.image != '' && nft.metadata.image" width="500" class="overflow-none pa-2 rounded-lg" :src="nft.metadata.image" alt="" />
        <video v-if="nft.metadata.animation_url" autoplay loop width="600" height="600">
      <source :src="nft.metadata.animation_url" type="video/mp4">
      Your browser does not support the video tag.
    </video> 
        <h3 class="text-gray-900 dark:text-gray-100 text-sm font-medium">{{nft.metadata.name}}</h3>
        <dl class="mt-1 flex-grow flex flex-col justify-between rounded-lg">
  
          <dd class="text-gray-500 dark:text-gray-100 text-sm">{{nft.token}}</dd>
          <dd class="mt-3 mb-5">
            <span class="px-2 py-1 text-green-800 text-lg w-24 font-medium bg-green-100 rounded-full overflow-hidden">ID # {{nft.tokenId}}</span>
          </dd>
          <dd class="mt-3 mb-5">
            <span v-if="nft.owner == user" class="px-2 py-1 text-green-800 text-md font-medium bg-green-100 h-10 rounded-full">You own this token </span>
            <span v-if="nft.owner != user" class="px-2 py-1 text-red-800 text-md font-medium bg-red-100 h-10 rounded-full">You don't own this token</span>
          </dd>
        </dl>
        <nftAttributes :attributes="nft.metadata.attributes"/>
      </div>
    </li>
  </ul>
</template>

<script>
import nftAttributes from "@/components/NFT/nftAttributes";


export default {
  components: {
    nftAttributes
  },
  props:{
    nft: Object
  },
  methods:{
    unsetView(){
      this.$emit('unsetView')
    }
  }
}
</script>