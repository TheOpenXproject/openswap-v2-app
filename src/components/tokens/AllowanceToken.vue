<template>
  <div ref="buttons" class="w-auto h-auto" >
      <button @click='allowToken()' v-if="!loading && !allow" :disabled='approving' class="flex items-center justify-center ml-3 rounded-full border border-oswapGreen st5 text-oswapGreen hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark">
          <p class="text-sm p-1 px-3">{{approving? 'Approving':'Approve'}}</p>
          <i v-if="approving" class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </button>
      <button @click='revokeToken()' :disabled='revoking' v-if="!loading && allow" class="flex items-center justify-center ml-3 rounded-full border border-oswapGreen st5 text-oswapGreen hover:bg-oswapGreen hover:text-gray-200 dark:hover:text-slightDark">
          <p class="text-sm p-1 px-3">{{revoking? 'Revoking':'Revoke'}}</p>
          <i v-if="revoking" class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen group-hover:text-gray-50 dark:group-hover:text-oswapDark-gray"></i>
      </button>
  </div>
</template>

<script>
  import { ethers } from "ethers";
  import { mapGetters } from 'vuex'
  import openswap from "@/shared/openswap.js"
  export default {
    name: 'AllowanceToken',
    mixins: [openswap],
    components: {
    },
    props: {
      address: String,
    },
    computed: {
      ...mapGetters('addressConstants', ['UNIROUTERV2']),
    },
    methods: {
      ...mapGetters('wallet', ['getChainID']),
      allowToken: async function() {
        this.approving = true;
        let routerAddr = this.UNIROUTERV2(this.getChainID());
        try {
          await this.approveSpending({oneZeroxAddress:this.address}, routerAddr);
          this.approving = false;
          await this.loadAllowance()
        } catch (error) {
          this.approving = false;
        }
      },
      revokeToken: async function() {
        this.revoking = true;
        let routerAddr = this.UNIROUTERV2(this.getChainID());
        try {
          await this.revokeSpending({oneZeroxAddress:this.address}, routerAddr);
          await this.loadAllowance()
        } catch (error) {
          this.revoking = false;
        }
      },
      loadAllowance: async function() {
        this.loading = true;
        try {
          let routerAddr = this.UNIROUTERV2(this.getChainID());
          this.allowanceNumber =  await this.checkAllowance({oneZeroxAddress:this.address}, routerAddr);
          this.allow = !this.allowanceNumber.isZero()
        } catch (error) {
        }
        this.loading = false;
      }
    },
    data() {
      return {
        allow: false,
        loading: true,
        approving: false,
        revoking: false,
        allowanceNumber: ethers.BigNumber.from('0'),
        observer: null,
      }
    },
    mounted: async function() {
    this.observer = new IntersectionObserver(async ([entry]) => {
      if (entry && entry.isIntersecting) {
        await this.loadAllowance();
      }
    });
    this.observer.observe(this.$refs.buttons);
    },
    destroyed() {
      this.observer.disconnect();
    },
  }
</script>