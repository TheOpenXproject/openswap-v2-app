<template>
  <div id="pairs" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center oswap-layout xl:px-0 px-3 text-gray-500 pb-16" style="margin-top: 98px">
    <transition name="fall" appear>
      <div class="text-right" >
        
        <h3 v-if="!this.NFTs" class="mt-2 text-sm font-medium light:grey-900 dark:text-white">No Tokens</h3>
        <p v-if="!this.NFTs" class="mt-1 text-sm text-gray-500">Get started by adding a new token.</p>
        <div v-if="!addToken" class="mt-6">
          <button  @click="openAddToken()" type="button" class="inline-flex items-right px-4 py-2 text-gray-700 dark:text-gray-100 font-medium border border-grey-500 dark:border-grey-100 dark:border-gray-700 rounded-lg hover:text-gray-500">
            Add Tokens
            <i class="la las la-plus pt-1"></i>

          </button>
        </div>
        
      <div class="pt-5 text-center">
          <addTokenModal v-if="addToken" @added="refresh" ref="addTokenModal"/>
        <tokenList  v-if="this.NFTs[pageNumber] && !addToken" :nfts="NFTs[pageNumber]" :user="getUserAddress()" @toggleViewing="toggleViewing()"/>
        <Pagination class="pt-5" v-if="this.NFTs[pageNumber] && !viewing && !addToken" :pageCount="numberOfPages" :pageNum="pageNumber" @setPage="setPage" />
        </div>

      </div>

    </transition>
    
  </div>
</template>

<script>
import addTokenModal from "@/components/NFT/addTokenModal";
import tokenList from "@/components/NFT/tokenList";
import Pagination from "@/components/NFT/Pagination";


import { mapGetters, mapActions } from "vuex";
export default {
  name: "Pairs",
  mixins: [],
  components: { addTokenModal, tokenList, Pagination },
    computed: {
    ...mapGetters("addressConstants", ["oSWAPCHEF", "UNIROUTERV2", "hMULTICALL"]),
    
  },
  methods: {
    ...mapActions('pairs', ['setPairs']),
    ...mapGetters("pairs", ["getPairs"]),
    ...mapGetters("wallet", ["getUserSignedIn", "getChainID","getUserAddress"]),
    openAddToken(){
      this.addToken = !this.addToken
    },
    setPage(page){
      this.pageNumber = page
      console.log(page)
    },
    getNumOfPages(length){
      let totalPage = (length + 12 - 1) / 12;
      
      return totalPage.toFixed(0)
    },
    toggleViewing(){
      this.viewing = !this.viewing
    },
    refresh(){
      var nftData = localStorage.getItem("nftdata");
       nftData = JSON.parse(nftData)
     var i = 0;
      var r = 1
      var pageSize = 12
      this.numberOfPages = this.getNumOfPages(nftData.length)
      while (r <= this.numberOfPages){
        var end = i+pageSize
        if(nftData.length <= end){
          end = nftData.length
        }
        this.NFTs[r] = nftData.slice(i,end);
        i += pageSize
        r+=1;
      }
      this.addToken = !this.addToken
      console.log(this.NFTs)
      
    }
  },
  mounted: async function () {
    var nftData = localStorage.getItem("nftdata");
    nftData = JSON.parse(nftData)
     var i = 0;
      var r = 1
      var pageSize = 12
      this.numberOfPages = this.getNumOfPages(nftData.length)
      while (r <= this.numberOfPages){
        var end = i+pageSize
        if(nftData.length <= end){
          end = nftData.length
        }
        this.NFTs[r] = nftData.slice(i,end);
        i += pageSize
        r+=1;
      }
    this.loaded = true
  },
  data() {
    return {
      NFTs: [],
      loaded: false,
      pageNumber: 1,
      numberOfPages: 0,
      viewing: false,
      addToken: false
    };
  },
};
</script>