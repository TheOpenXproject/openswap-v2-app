<template>
    <div class="flex flex-col md:w-72">
        <div class="flex flex-none rounded-t-lg bg-oswapGreen-light bg-opacity-20 px-4 py-2">
            <span class="text-oswapGreen">Results</span>
        </div>
        <div class="flex flex-none space-y-4 flex-col justify-between items-center rounded-b-lg bg-oswapGreen-light bg-opacity-5 px-4 py-4">
            <div class="flex flex-none w-full flex-col space-y-2">
                <div class="justify-between flex flex-1">
                    <span class="text-oswapBlue-light">Agree</span>
                    <span class="text-oswapGreen-dark text-lg">{{agree}} Votes</span>
                </div>
                <div class="w-full bg-oswapBlue-light bg-opacity-10 rounded-full h-2.5 ">
                    <div class="bg-oswapBlue-light h-2.5 rounded-full" :style="`width: ${agreePorcentual}%`"></div>
                </div>
            </div>
            <div class="flex flex-none w-full flex-col space-y-2">
                <div class="justify-between flex flex-1">
                    <span class="text-oswapBlue-light">Disagree</span>
                    <span class="text-oswapGreen-dark text-lg">{{disagree}} Votes</span>
                </div>
                <div class="w-full bg-oswapBlue-light bg-opacity-10 rounded-full h-2.5 ">
                    <div class="bg-oswapBlue-light h-2.5 rounded-full" :style="`width: ${disagreePorcentual}%`"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Summary',
    mixins: [],
    props: {
        agree: Number,
        disagree: Number,
    },
    data() {
      return {
      }
    },
    mounted: async function(){
    },
    computed: {
        disagreePorcentual() {
            return (100 * this.disagree) / (this.agree + this.disagree);
        },
        agreePorcentual() {
            return (100 * this.agree) / (this.agree + this.disagree);
        }
    },
    methods: {
    }
  }
</script>
