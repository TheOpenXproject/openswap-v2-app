<template>
  <div class="flex flex-wrap w-full">
  
    

    <div v-if="validator" class="flex gap-3 min-w-0 w-full text-gray-400 dark:text-gray-300">
      <div class="flex flex-col w-full rounded-2xl bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray py-3 px-4">
        <div class="flex">
          <ValidatorChart :validator="validator"/>
        </div>

        <!-- Open Details Button -->
    <div class="flex justify-end h-12">
      <div @click="selectValidator()" class="flex h-9 items-center space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-oswapDark-gray dark:hover:bg-gray-900 pl-3 cursor-pointer">
        <p class="text-sm text-gray-500 dark:text-oswapBlue-light">details</p>
        <i class="las la-arrow-down text-lg p-2 text-gray-500 dark:text-oswapBlue-light rounded-full bg-gray-100 dark:bg-oswapDark-gray group-hover:bg-oswapGreen dark:group-hover:text-oswapDark-gray group-hover:text-gray-100 border-2 border-gray-200 dark:border-gray-700"></i>
      </div>
    </div>
      </div>
    </div>

  </div>
</template>

<script>
  import openswap from "@/shared/openswap.js";
  import ValidatorChart from "@/components/farm/Validators/ValidatorChart"

  import { ethers } from 'ethers';

  export default {
    name: 'StakingInfo',
    mixins: [openswap],
    components: {
      ValidatorChart
    },
    props: {
      validator: Object,
    },
    data() {

    },
    async mounted() {
      
    },
    methods: {
      selectValidator: function(){
       this.$emit("selectValidator", null);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>