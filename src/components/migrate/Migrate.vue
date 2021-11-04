<template>
  <div class="flex flex-col st5-all p-4 bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent text-gray-500 dark:text-gray-300 ss:w-80 xs:w-96 rounded-3xl border-l border-oswapGreen">
    <div class="flex items-center space-x-2 mb-3">
      <i class="las la-route text-xl dark:text-gray-200"></i>
      <p class="text-sm dark:text-gray-200">Migrate</p>
    </div>
    <div class="flex flex-col space-y-3">
      <MigrateTokenSelect :token="this.oSWAP" />
      <div class="flex flex-1 items-center space-x-3">

        <InputWithValidationMigrate :input="amount" :errors="errors" @catchInput="inputAmount" :rounded="'rounded-xl'" :placeholder="'Amount...'" :errorTop="'pt-10'">
          <p class="flex items-center justify-center text-xs z-30 right-0 absolute bg-gray-100 dark:bg-oswapDark-gray rounded-xl px-3 h-10">{{this.oSWAP.Symbol}}</p>
        </InputWithValidationMigrate>

        <div class="flex flex-1 items-center justify-end group-scope">
          <div @click="setMax()" class="flex h-10 items-center group-scope-hover:bg-oswapGreen text-oswapGreen-dark dark:text-oswapGreen border border-oswapGreen-dark dark:border-oswapGreen cursor-pointer px-3 rounded-xl space-x-2">
            <i class="las la-wallet text-xl dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100"></i>
            <p class="dark:group-scope-hover:text-oswapDark-gray group-scope-hover:text-gray-100">MAX</p>
          </div>
        </div>
      </div>

      <Warning :warnings="warnings" />

      <div class="flex w-full pl-2">
        <p class="text-xs dark:text-gray-400">Available: {{parseFloat(getBalanceToken(0)).toFixed(8)}}</p>
      </div>
      <div class="flex items-center justify-between" style="height: 34px;">
        <div class="flex h-full w-28 relative">
          <MigrateApproveButton :buttonState="ApproveButtonState" @approve="approve"/>
        </div>
        <div class="flex h-full w-28 relative">
          <MigrateButton :buttonState="MigrateButtonState" @migrate="migrateTokens"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MigrateTokenSelect from '@/components/migrate/MigrateTokenSelect';
  
  import MigrateButton from '@/components/migrate/MigrateButton';
  import MigrateApproveButton from '@/components/migrate/MigrateApproveButton';

  import InputWithValidationMigrate from '@/components/InputWithValidationMigrate';
  import Warning from '@/components/exchange/Warning'
  import openswap from "@/shared/openswap.js";

  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'Migrate',
    mixins: [openswap],
    components: {
      MigrateTokenSelect,
      MigrateButton,
      MigrateApproveButton,
      InputWithValidationMigrate,
      Warning
    },
    data() {
      return {
        //0x93e07A8226b646d1C93314AB9f3b87fAfC753906
        whichToken: 'token1',
        oSWAP: {
          Symbol: "oSWAP",
          name: "OpenSwap",
          //oneAddress: "one1cpp3mhxq6gfm7flvaj5vyd3vp5pq33kuch2zg8",
          oneZeroxAddress: "0xc0431Ddcc0D213Bf27EcEcA8C2362c0d0208c6DC",
          decimals: 18,
          imgSrc: "https://openfi.dev/tokens/default/oSWAP.png"
        },

        amount: '0.0',
        balance: 0,
        errors: {},
        warnings: {},
        MigrateButtonState: 'disabled',
        ApproveButtonState: 'disabled'
      }
    },
    beforeMount() {
      this.setToken({ tokenRef: this.whichToken, token: this.oSWAP });
    },
    mounted: async function() {
      await setTimeout(function(){return}, 2000);
      this.balance = await this.getTokenBalance(this.oSWAP)

      this.setBalanceToken({ 0: this.balance })

      this.ApproveButtonState = 'active'
      this.MigrateButtonState = 'disabled'
    },
    computed: {
      ...mapGetters('migrate', ['getBalanceToken']),
    },
    methods: {
      ...mapGetters('migrate', ['getToken']),
      ...mapActions('migrate', ['setToken']),
      ...mapGetters('wallet', ['getUserAddress', 'getWalletType']),
      ...mapActions('migrate', ['setBalanceToken']),

      setMax(){
        this.amount = this.balance
      },
      approve:async function() {
        await this.approveV1(this.oSWAP);
        this.ApproveButtonState = 'finished'
        this.MigrateButtonState = 'active'
      },
      migrateTokens:async function() {
        await this.migrateV2(this.amount);
        this.MigrateButtonState = "finished"
        this.balance = await this.getTokenBalance(this.oSWAP);
        let theme = localStorage.getItem("oSwap\_theme");

        localStorage.setItem("firstmigration", false);
        this.setBalanceToken({ 0: this.balance })

      },

      inputAmount(value){
        this.amount = value
        if(this.ApproveButtonState == "finished"){
        // Checking if the input is in the right format.
        // parseFloat seems to behave like this regex rule.
        if (!value.match(/^\d*\.?\d*$/)) {
          this.MigrateButtonState = 'disabled'
          this.errors['format'] = 'Invalid format! e.g: 12345.678';
        } else {
          delete this.errors['format'];
          
          this.MigrateButtonState = 'active'
        }
        if (value == '0.0') {
          this.errors['null'] = 'Amount can\'t be 0';
          this.MigrateButtonState = 'disabled'
        } else {
          delete this.errors['null']
                  
           this.MigrateButtonState = 'active'
        }
        if (value == '') {
          this.errors['blank'] = 'Amount can\'t be blank';
          this.MigrateButtonState = 'disabled'
        } else {
          delete this.errors['blank']
           this.MigrateButtonState = 'active'
           
       }
        if (parseFloat(value) > parseFloat(this.balance)) {
          this.MigrateButtonState = 'disabled'
          this.errors['exceed'] = 'Your input exceeds the amount available in your balance!';
        } else {
          delete this.errors['exceed'];
          this.MigrateButtonState = 'active'
          
        }
        }
      },
    }
  }
</script>
