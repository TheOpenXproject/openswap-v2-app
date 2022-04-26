<template>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="relative inline-block align-bottom light:bg-white dark:bg-grey-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div>
              
              <div class="mt-3 text-center sm:mt-5">
                      <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-4">
            <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-200"> Token Address </label>
            
          <div class="mt-1">
              <input type="text" v-model="tokenAddress" name="address" id="address" class="shadow-sm focus:ring-indigo-500 dark:bg-grey-700 focus:border-indigo-500 block h-10 border border-oswapGreen-dark w-full sm:text-sm rounded-md" />
            </div>
          </div>

          <div class="sm:col-span-1">
            <label for="region" class="block text-sm font-medium text-gray-700 dark:text-gray-200"> Token Id </label>
            <div class="mt-1">
              <input type="text"  @input="lazyCaller" name="region" id="region" autocomplete="address-level1" class="shadow-sm dark:bg-grey-700 focus:ring-indigo-500 h-10 border border-oswapGreen-dark focus:border-indigo-500 block w-full sm:text-sm rounded-md" />
            </div>
          </div>
                    <div v-if="!loading" class="col-span-1 items-center mt-7">

          <button @click="close()" type="button" class="inline-flex items-right px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-100 font-medium border border-grey-500 dark:border-grey-100 dark:border-gray-700 rounded-br-lg hover:text-gray-500">
            Cancel
              </button>
            </div>
          <div v-if="loading" class="sm:col-span-1 items-center mt-7">
          <svg class="animate-spin h-8 w-8 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      		</div>
              </div>
            </div>
            <nftOverviewSmall v-if="nft != null" :nft="nft"/>
			
            <div v-if="this.nft" class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button type="button" class="w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm" @click="AddToken()">Add</button>
            </div>
          </div>
</template>

<script>
import { ref } from 'vue'
import nft from "@/shared/nft.js";
import nftOverviewSmall from "@/components/NFT/nftOverviewSmall";

export default {
	mixins:[nft],
  components: {
    nftOverviewSmall
  },
  data(){
  	return{
  		tokenId: 0,
  		tokenAddress: "",
		  nft: null,
      loading: false
  	}
  },
  methods:{
  	openModal(){
  		this.open = true;
  	},
    close(){
      this.$emit("added");
    },
  	AddToken: async function(){
  		var nftData = localStorage.getItem("nftdata");
  		
  		if(!nftData){
  			nftData = []
        nftData.push(this.nft)
  		}else{
  			nftData = JSON.parse(nftData)
        nftData.push(this.nft)
  		}
  		
        localStorage.setItem("nftdata", JSON.stringify(nftData));
        this.$emit("added");
        this.open = false
  	},
  	lazyCaller: async function(event, time = 500) {
      clearTimeout(this.timeout);
      this.loading = true
      this.timeout = await setTimeout(async() => {
        this.tokenId = event.target.value
        this.nft = await this.loadERC721(this.tokenId, this.tokenAddress) 
        this.loading = false
      }, time)
    },
  },
  setup() {
    const open = ref(false)
    return {
      open,
    }
  },
}
</script>