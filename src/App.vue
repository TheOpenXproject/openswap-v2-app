<template>
  <div id="root" :class="getColorTheme" class="antialiased pt-18">
    <div id="header" :class="getIsScrolled ? 'shadow-xl' : ''" class="flex flex-1 fixed inset-x-0 top-0 st5 bg-gradient-to-r dark:from-oswapDark-gray dark:to-slightDark from-gray-300 to-slightGray z-50">
      <Header />
    </div>

    <div id="body" class="flex w-full oswap-layout z-20 st5 bg-gradient-to-r from-gray-300 to-slightGray dark:from-oswapDark-gray dark:to-slightDark">
      <router-view />
    </div>

    <div id="footer" class="w-full h-full z-40 st5 bg-gradient-to-r from-gray-300 to-slightGray dark:from-oswapDark-gray dark:to-slightDark">
      <Footer />
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header';
  import Footer from '@/components/Footer';
  import { mapActions, mapGetters } from 'vuex';
  import openswap from "@/shared/openswap.js";
  import Snowflakes from 'magic-snowflakes';


  export default {
    name: 'OpenSwap',
    mixins: [openswap],
    components: {
      Header,
      Footer,
    },
    created() {
      window.addEventListener('scroll', this.handleScroll);
    },
    mounted: async function() {
      //location.reload(true);
      const snowflakes = new Snowflakes({
            color: '#5ECDEF', // Default: "#5ECDEF"
             // Default: document.body
            count: 100, // 100 snowflakes. Default: 50
            minOpacity: 0.1, // From 0 to 1. Default: 0.6
            maxOpacity: 0.95, // From 0 to 1. Default: 1
            minSize: 3, // Default: 10
            maxSize: 15, // Default: 25
            rotation: true, // Default: true
            speed: 0.5, // The property affects the speed of falling. Default: 1
            wind: false, // Without wind. Default: true
            zIndex: 100 // Default: 9999
        });
// ...
snowflakes.stop();
// ...
snowflakes.start();
      
      // Color Mode!
      let theme = localStorage.getItem("oSwap\_theme");

      if (theme) {
        this.setTheme(theme);
      } else {
        localStorage.setItem("oSwap\_theme", 'dark');
      }

    },

    computed: {
      ...mapGetters('user', ['getIsScrolled', 'getColorTheme']),
    },
    
    methods: {
      ...mapActions('user', ['setIsScrolled', 'setTheme']),
      ...mapActions('wallet', ['switchWalletType']),


      handleScroll() {
        this.setIsScrolled(window.scrollY > 0)
      }
    },
  };
</script>