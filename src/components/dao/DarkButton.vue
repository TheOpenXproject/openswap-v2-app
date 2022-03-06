            



<template>
    <button 
        :class="class"
        class="bg-oswapBlue-light  text-slightGray rounded-3xl">
        <div class="flex flex-none items-center flex-row space-x-2 justify-center">
            <slot></slot>
        </div>
    </button>
</template>

<script>

  export default {
    name: 'DarkButton',
    mixins: [],
    props: {
        class: String
    },
    data() {
      return {
      }
    },
    mounted: async function(){
    },
    computed: {

    },
    methods: {

    }
  }
</script>
