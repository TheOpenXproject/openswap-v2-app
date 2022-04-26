<template>
	<div class="text-lg pb-2">Attributes:</div>
  <ul role="list" class="grid gap-6 grid-cols-2 lg:grid-cols-3 xl-grid-cols-4 pb-2">
    <li v-for="attribute in attributes" class="col-span-1 bg-white dark:bg-slightDark  border border-grey-500 rounded-lg dark:border-grey-100 dark:border-gray-700 gap-3 shadow divide-y divide-gray-200 dark:divide-gray-700">
      <div class="w-full flex items-center justify-between p-1 space-x-6">
        <div class="flex-1 truncate">
          <p class="mt-1 text-oswapBlue dark:text-oswapGreen text-sm truncate">{{attribute.trait_type}}</p>
        </div>
      </div>
      <div class="w-full flex items-center justify-between p-2 space-x-6">
        <div class="flex-1 truncate">
          <p class="mt-1 text-gray-500 dark:text-gray-100 text-sm truncate">{{attribute.value}}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  components: {
  },
  props: {
  	attributes: Object
  },

}
</script>