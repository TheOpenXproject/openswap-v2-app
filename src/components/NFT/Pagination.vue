<template>
  <nav class="border-t width-92 dark:border-gray-900 light:border-gray-100 mt-4 px-4 flex items-center justify-between sm:px-0">
    <div class="-mt-px w-0 flex-1 flex">
      <a @click="setPage(pageNum-1)" href="#" class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
        <i class="la las la-chevron-left"></i>
        Previous
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <a @click="setPage(i)" v-for="i in pages" href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"> {{i}} </a>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <a @click="setPage(pageNum+1)" href="#" class="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
        Next
      <i class="la las la-chevron-right"></i>

      </a>
    </div>
  </nav>
</template>

<script>

export default {
  components: {
  },
  props:{
  	pageCount: Number,
    pageNum: Number
  },
  data(){
  	return {
  		pages: []
  	}
  },
  mounted() {
  	var n = 1;
  	while(n <= this.pageCount){
  		this.pages.push(n)
  		n++
  	}
  },
  methods:{
  	setPage(pageNum){
      console.log(pageNum)
      console.log(this.pageCount)
      if(pageNum != 0 && pageNum <= this.pageCount)
  		this.$emit("setPage", pageNum)
  	}
  }
}
</script>