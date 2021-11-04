<template>
  <div class="flex h-24 z-10 px-2 rounded-xl ring-1 ring-black border border-oswapGreen dark:ring-gray-600 ring-opacity-10 hover:bg-gray-100 dark:hover:bg-oswapDark-gray bg-opacity-100 hover:bg-opacity-30 cursor-pointer overflow-hidden">    
    <div class="flex flex-1 items-center animate__animated animate__fadeInLeft animate__faster">
      <div class="flex items-center">
        <img :src="token.imgSrc" class="h-12 w-12 rounded-full flex items-center justify-center  m-3" alt="">            
      </div>
      <div class="flex flex-1 flex-col items-start justify-center">
        <p class="dark:text-gray-300">{{token.Symbol}}</p>
        <p class="text-gray-400">{{token.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TokenSelect',
    props: {
      token: Object
    }
  }
</script>