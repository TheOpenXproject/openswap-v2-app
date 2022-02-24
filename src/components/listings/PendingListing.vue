<template>
  <div class="flex flex-col w-full space-y-4">
    <template v-for="token in tokens">
        <TokenCard 
            :name='token.name' 
            :image='token.image' 
            :symbol='token.symbol' 
            :decimals='token.decimals' 
            :address='token.address'
            :website='token.website'
            :origin='token.origin'
        />
    </template>
  </div>
</template>


<script>
import TokenCard from "@/components/listings/TokenCard";
  export default {
    name: 'PendingListing',
    mixins: [],
    components: { 
        TokenCard
    },
    data() {
      return {
          tokens: [
              {
                  name: 'EOS',
                  image: 'https://app.openswap.one/img/one_logo.5d2fb88a.png',
                  symbol: 'EOS',
                  decimals: '18',
                  address: '0x72cb10c6bfa5624dd07ef608027e366bd690048f',
                  website: 'https://EOS.com',
                  origin: 'Binance Smart Chain',
              },
              {
                  name: 'ZEC',
                  image: 'https://app.openswap.one/img/one_logo.5d2fb88a.png',
                  symbol: 'ZEC',
                  decimals: '18',
                  address: '0x72cb10c6bfa5624dd07ef608027e366bd690048f',
                  website: 'https://ZEC.com',
                  origin: 'Binance Smart Chain',
              },
              {
                  name: 'LIGMA',
                  image: 'https://app.openswap.one/img/one_logo.5d2fb88a.png',
                  symbol: 'LIGMA',
                  decimals: '18',
                  address: '0x72cb10c6bfa5624dd07ef608027e366bd690048f',
                  website: 'https://LIGMA.com',
                  origin: 'Ethereum',
              },
          ]
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
