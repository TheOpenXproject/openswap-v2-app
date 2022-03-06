

<template>
    <div
        :class="stateClass" 
        class="text-slightGray rounded-lg py-2 px-4 flex flex-none space-x-2 items-center text-sm ">
        {{state}}
    </div>
</template>

<script>
  export default {
    name: 'StateTag',
    mixins: [],
    props: {
        state: String,
    },
    data() {
      return {
      }
    },
    mounted: async function(){
    },
    computed: {
        stateClass() {
            switch (this.state) {
                case 'DECLINED':
                    return 'bg-yellow-600'
                case 'PASSED':
                    return 'bg-oswapGreen-dark'
                case 'ACTIVE':
                    return 'bg-purple-600'
            }
        }
    },
    methods: {
    }
  }
</script>
