<template>
    <transition name="fall" appear>
        <div v-if="loaded" class="flex flex-1 justify-center flex-wrap text-center">
            <div class="flex flex-col text-gray-600 dark:text-gray-300 p-2">
                <p class="ss:text-md xs:text-lg font-extrabold">${{daily}}</p>
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Daily</p>
            </div>
            <div class="flex flex-col text-gray-600 dark:text-gray-300 p-2">
                <p class="ss:text-md xs:text-lg font-extrabold">${{weekly}}</p>
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Weekly</p>
            </div>
            <div class="flex flex-col text-gray-600 dark:text-gray-300 p-2">
                <p class="ss:text-md xs:text-lg font-extrabold">${{monthly}}</p>
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Monthly</p>
            </div>
            <div class="flex flex-col text-gray-600 dark:text-gray-300 p-2">
                <p class="ss:text-md xs:text-lg font-extrabold">${{yearly}}</p>
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Yearly</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Rewards",
    mixins: [],
    components: { 
        
     },
    computed: {
    },
    methods: {

    },
    props: {
        loaded: Boolean,
        daily: String,
        weekly: String,
        monthly: String,
        yearly: String,
    },
};
</script>
