<template>
  <header class="max-w-screen-xl mx-auto w-full flex justify-between h-14 py-9 xl:px-0 px-3 items-center">
    <div class="ss:hidden xs:flex flex-none">
      <img alt="OpenSwap" src="@/assets/oswap_logo.png" class="ss:h-6 xs:h-10">
    </div>
    <div class="ss:flex xs:hidden flex-none">
      <img alt="OpenSwap" src="@/assets/oswap_logo_icon.png" class="ss:h-6">
    </div>
   
    <div class="flex items-center lg:space-x-0 space-x-1 text-gray-500 dark:text-oswapGreen st5"> 
      <!--
       <router-link to="/wallet" class="flex items-center space-x-2 p-2 px-1 md:px-3 rounded-lg group focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
        <i class="las la-wallet text-xl group-hover:text-oswapGreen "></i>
        <p class="text-sm hidden md:block group-hover:text-oswapBlue-light">Portfolio</p>
      </router-link>
      -->

      <a href="https://openxswap.app" target="_blank" class="flex items-center space-x-2 p-2 px-1 md:px-3 rounded-lg group focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
        <i class="las la-road text-xl group-hover:text-oswapGreen "></i>
        <p class="text-sm hidden md:block group-hover:text-oswapBlue-light">Aggregator</p>
      </a>
      <router-link to="/" class="flex items-center space-x-2 p-2 px-1 md:px-3 rounded-lg group focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
        <i class="las la-random text-xl group-hover:text-oswapGreen "></i>
        <p class="text-sm hidden md:block group-hover:text-oswapBlue-light">Exchange</p>
      </router-link>

      <router-link to="/liquidity" class="flex items-center space-x-2 p-2 px-1 md:px-3 rounded-lg group focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
        <i class="las la-tint text-xl group-hover:text-oswapGreen"></i>
        <p class="text-sm hidden md:block group-hover:text-oswapBlue-light">Liquidity</p>
      </router-link>

      <router-link to="/farm" class="flex items-center space-x-2 p-2 px-1 md:px-3 rounded-lg group focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
        <i class="las la-tractor text-xl group-hover:text-oswapGreen"></i>
        <p class="text-sm hidden md:block group-hover:text-oswapBlue-light">Farm</p>
      </router-link>

      <router-link to="/Bridge" class="flex items-center space-x-2 p-2 px-1 md:px-3 rounded-lg group focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-20">
        <i class="las la-pallet text-xl group-hover:text-oswapGreen"></i>
        <p class="text-sm hidden md:block group-hover:text-oswapBlue-light">Bridge</p>
      </router-link>

      <!-- Menu 'More' (dropdown) -->

      <MoreButton />
      <Oswap v-if="this.getFarms() != null" />
      <!-- Wallet Button  -->
      <WalletButton/>
    </div>
    <!-- Navigation End -->
  </header>
</template>

<script>
  
  import WalletButton from '@/components/header/WalletButton'
  import Oswap from '@/components/header/OswapPrice'
  import MoreButton from '@/components/header/MoreButton'
    import { mapGetters } from "vuex";


  export default {
    name: 'Header',
    components: {
      WalletButton,
      MoreButton,
      Oswap
    },
    methods: {
      ...mapGetters('farm/farmData', ['getFarms']),

    }
  }
</script>