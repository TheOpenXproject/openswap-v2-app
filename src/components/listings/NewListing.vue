<template>
  <div class="flex flex-col w-full">
    <!-- Could use store to get the form's values just in case we need to use the same component for editing the listing -->
    <!-- Will leave the logic of how to retrieve the data from the comp to alex -->
    <ListingsForm/>
    <div class="flex flex-1 justify-end md:max-w-half mt-8">
      <button class="p-3 bg-oswapBlue-light rounded-3xl text-slightGray">Pay 300 one review fee</button>
    </div>
  </div>
</template>

<script>
import ListingsForm from "@/components/listings/Form";
  export default {
    name: 'Form',
    mixins: [],
    components: { 
      ListingsForm
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
