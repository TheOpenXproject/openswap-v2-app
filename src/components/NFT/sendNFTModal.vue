
<!-- This example requires Tailwind CSS v2.0+ -->
<template>
 
        <!-- This element is to trick the browser into centering the modal contents. -->
              <div class="w-full justify-center items:center mt-10 flex flex-col text-center border border-grey-500 dark:border-grey-100 dark:border-gray-700 bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent  rounded-lg dark:hover:bg-slightDark hover:bg-slightGray rounded-t-lg shadow divide-y divide-gray-200cdark:divide-gray-700">
      <div class="flex-1 flex flex-col p-2 ">
                  <form class="sm:flex">
                    <input @input="setInput" class="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white sm:max-w-xs rounded-md" placeholder="Receiver Address" />
                  </form>
                </div>
              </div>
              <div>
        </div>
</template>

<script>
import { ref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  props:{
    open: Boolean
  },
  methods: {
    close(){
      this.$emit("close")
    },
    setInput(value){
      console.log(value)
      this.$emit("input0", event.target.value)
    }
  }
}
</script>