<template>
  <div class="flex flex-wrap w-full">
     <div class="flex space-x-2 items-center mb-6">
      <i class="las la-layer-group text-lg dark:text-oswapGreen"></i>
      <p class="text-oswapGreen-dark dark:text-oswapBlue-light text-sm uppercase">OpenSwap Validators :</p>
    </div>
     <transition name="fall" appear>
      <div class="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 ma-2 w-full">
      <div v-if="validators" v-for="validator in validators" :key='validator'>
        <StakingInfoClosed v-if="this.selectedValidator != validator.address" :validator="validator" @selectValidator="selectValidator" class="flex w-full" />
      </div>
        <div v-if="validators" v-for="validator in validators" :key='validator'>
        <StakingInfoOpen v-if="this.selectedValidator == validator.address" :validator="validator" @selectValidator="selectValidator" class="flex w-full"/>
      </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import { ethers } from 'ethers';
  import StakingInfoOpen from "@/components/farm/Validators/StakingInfoOpen"
  import StakingInfoClosed from "@/components/farm/Validators/StakingInfoClosed"
  export default {
    name: 'StakingInfo',
    mixins: [openswap],
    components: {
      StakingInfoClosed,
      StakingInfoOpen
    },
    data() {
      return {
        validators: null,
        selectedValidator: null
      }
    },
    async mounted() {
      const requestOptions = (addr) => {
        return {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "hmy_getValidatorInformation",
            "params": [
                addr   
            ]
          }),
        }
      };

      // 15% node
      // one1p2e0a0806jv8tqr37k7c8k67zgfjwtzpf9apv2
      // 100% node
      // "one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0"

      const response100 = await fetch("https://harmony-0-rpc.gateway.pokt.network", requestOptions("one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0"));
      var data100 = await response100.json();

      const response15 = await fetch("https://harmony-0-rpc.gateway.pokt.network", requestOptions("one1p2e0a0806jv8tqr37k7c8k67zgfjwtzpf9apv2"));
      var data15 = await response15.json();
      
      this.validators = {
        oneHundred: {
          name: data100.result.validator.name,
          address: "one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0",
          totalDelegated: this.prettify((data100.result['total-delegation']/10**18).toFixed(2)),
          apr: (data100.result.lifetime.apr * 100).toFixed(2)
        },
        fifteen: {
          name: data15.result.validator.name,
          address: "one1p2e0a0806jv8tqr37k7c8k67zgfjwtzpf9apv2",
          totalDelegated: this.prettify((data15.result['total-delegation']/10**18).toFixed(2)),
          apr: (data15.result.lifetime.apr * 100).toFixed(2)
        }
      }
    },
    methods: {
      selectValidator: function(val){
        console.log(val)
        this.selectedValidator = val
      },
      prettify: function(number){
        return ethers.utils.commify(number)
      },
      formatToMillion(string) {
        let parsed = string.toLocaleString('fullwide', { useGrouping: false }).replace(/0+$/, '');
        return ethers.utils.commify(parsed)
                           .match(/^(\d{1,3})?[.,]?(\d{1,3})?[.,]?(\d{1,3})?[.]?(\d{1,2})/g)[0];
      },
      formatToBillion(string) {
        let parsed = string.toLocaleString('fullwide', { useGrouping: false }).replace(/0+$/, '');
        return ethers.utils.commify(parsed)
                           .match(/^(\d{1,3})?[.,]?(\d{1,3})?[.,]?(\d{1,3})?[.,]?(\d{1,3})?[.]?(\d{1,2})/g)[0];
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>