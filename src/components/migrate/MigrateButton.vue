<template>
  <!-- Migrate -->
  <div class="flex items-center w-28 h-full relative">
    <!-- Migrated Disabled -->
    <transition tag="div" name="approve-btn" class="inline-block absolute">
      <div v-if="buttonState == 'disabled'" class="flex w-28 h-9 justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group-scope select-none">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-gray-300 dark:text-gray-600">Migrate</p>
        </div>
        <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
      </div>
    </transition>

    <!-- Migrate -->
    <transition tag="div" name="approve-btn" class="inline-block absolute">
      <div @click="migrate()" v-if="buttonState == 'active'" class="flex w-28 group-scope">
        <div class="grab-attention-glowing"></div>
        <div class="grab-attention cursor-pointer">
          <div class="flex flex-1 items-center justify-center">
            <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray">Migrate</p>
          </div>
          <i class="las las la-route text-xl text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray"></i>
        </div>
      </div>
    </transition> 

    <!-- Migrating -->
    <transition tag="div" name="swap-btn" class="inline-block absolute">
      <div v-if="buttonState == 'executing'" class="flex w-28 group-scope">
        <div class="grab-attention-glowing"></div>
        <div class="grab-attention cursor-wait">
          <div class="flex flex-1 items-center justify-right">
            <p class="text-sm text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray">Migrating</p>
          </div>
          <i class="las la-sync text-xl animate-spin text-oswapGreen-dark dark:text-oswapGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-oswapDark-gray"></i>
        </div>
      </div>
    </transition>

    <!-- Migrated -->
    <transition tag="div" name="approve-btn" class="inline-block absolute">
      <div v-if="buttonState == 'finished'" class="flex w-28 justify-between items-center border border-oswapGreen glow-oswapGreen-light-md space-x-1 p-2 pl-3 rounded-full cursor-default">
        <div class="flex flex-1 items-center justify-right">
          <p class="text-sm text-oswapGreen">Done !</p>
        </div>
        <i class="las la-check-circle text-xl text-oswapGreen"></i>
      </div> 
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'MigrateButton',
    props: {
      buttonState: String
    },
    mounted(){},
    methods: {
      migrate: function() {
        this.$emit('migrate');
      } 
    }
  }
</script>