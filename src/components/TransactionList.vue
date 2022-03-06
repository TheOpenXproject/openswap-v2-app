<template>
  <div class="flex flex-col ">
    <div class="grid grid-cols-6 w-full gap-3 h-12">
      <div class="flex h-12 col-span-4">
        <Divider title="Tokens Available" class="w-full text-lg text-oswapGreen " />
      </div>
      <!-- search field 
      <div class="flex h-12 col-span-2 item">
        <div class="flex w-full relative st5-all focus-within:text-oswapGreen-dark dark:focus-within:text-oswapGreen">
          <i class="las la-search text-lg center-y-component pl-3"></i>
          <input type="text" v-model="find" @input="findTx" class="flex w-full rounded-full items-center ring-black st-5 ring-opacity-10 focus:ring-oswapGreen ring-1 focus:outline-none bg-slightGray dark:bg-slightDark pl-10" placeholder="find by | type, token, date, amount or tx | ...">
        </div>
      </div>
      -->
    </div>
    
    <!-- transaction item -->
    <transition-group as="template" name="vertical" appear>
      <TransactionItem v-for="(token, index) in tokens" :token="token" > 
        <Divider class="w-full md:hidden text-lg text-oswapGreen " />
      </TransactionItem>
    </transition-group>

    <!-- observer for infinite scroll -->
    <Observer @intersect="intersected"/>
    
    <!-- loading animation -->
    <div v-if="this.loadingChunk" class="flex w-full py-16 items-center justify-center">
      <svg class="animate-spin h-8 w-8 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
</template>

<script>
  import Divider from '@/components/Divider'
  import TransactionItem from '@/components/TransactionItem'
  import Observer from '@/components/Observer'

  export default {
    name: 'TransactionList',
    components: {
      Divider,
      TransactionItem,
      Observer
    },
    props:{
      tokens:Object
    },
    data() {
      return {
        find: '',
        loadingChunk: false,
        items: []
      }
    },
    mounted() {
  
    },
    methods: {
      async intersected() { 
        let prevChunk = this.items.length;
        let newChunk = this.tokens.slice(prevChunk, prevChunk * 2)

        if (this.items.length < this.tokens.length) {
          this.loadingChunk = true;
          await this.sleep(1000);
          this.loadingChunk = false;
          this.items = [...this.items, ...newChunk];
        }

      },
      dynamicSort(property) {
          var sortOrder = 1;
          if(property[0] === "-") {
              sortOrder = -1;
              property = property.substr(1);
          }
          return function (a,b) {
              /* next line works with strings and numbers, 
               * and you may want to customize it to your needs
               */
              var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
              return result * sortOrder;
          }
      },
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    }
  }
</script>