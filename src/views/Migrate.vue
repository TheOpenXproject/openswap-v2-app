<template>
  <div id="migrate" class="relative max-w-screen-xl mx-auto items-center flex flex-1 justify-center xl:px-0 px-3 text-gray-500">

    <transition name="horizontal" appear>
      <Migrate :key="whichToken" />
    </transition>

  </div>
</template>

<script>
  import Migrate from '@/components/migrate/Migrate';
  
  export default {
    name: 'MigratePage',
    components: {
      Migrate,
    },
    data() {
      return {
        whichToken: ''
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>