<template>  
  <div
    class="flex h-9 items-center bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent rounded-full p-1 duration-300 cursor-pointer"
    :class="{ '': getWalletType != 'metamask' }"
    :aria-checked="(getWalletType != 'metamask').toString()"
    @click="setWalletType()"
  >
    <div
      class="flex space-x-2 items-center justify-center "
    >
        <div class="flex flex-none p-2 rounded-full" :class="getWalletType != 'metamask'? 'dark:shadow-dark-depth shadow-light-depth':''">
          <img  src="@/assets/Harmony.png" alt="" class="h-5">
        </div>
        <i class="text-oswapBlue-light dark:text-oswapGreen-light las la-exchange-alt"></i>
        <div class="flex flex-none p-2 rounded-full" :class="getWalletType != 'oneWallet'? 'dark:shadow-dark-depth shadow-light-depth':''">
          <img  src="@/assets/Metamask.png" alt="" class="h-5">
        </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import wallet from '@/shared/wallet.js';

  import { toastMe } from '@/components/toaster/toaster.js'

  export default {
    name: 'walletMode',
    mixins: [wallet],
    computed: {
      ...mapGetters('wallet', ['getWalletType'])
    },
    mounted(){

    },
    methods: {
      ...mapActions('wallet', ['switchWalletType']),
      setWalletType(){
          this.disconnectWallet()
          this.switchWalletType()
        if(this.getWalletType == 'oneWallet'){
           localStorage.setItem("walletmode", '1');
          var walletString = 'Harmony One Wallet'

        }else{
          var walletString = "Metamask Wallet"
          localStorage.setItem("walletmode", '0');
        }
      
        toastMe('success', {
          title: 'Switched Wallet Mode',
          msg: "Wallet mode : " + walletString,
          link: false,
          href: ""
        })

      }
    },

  }
</script>