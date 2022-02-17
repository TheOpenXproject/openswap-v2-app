<template>
    <transition name="fall" appear>
        <div v-if="loaded" class="flex flex-1 justify-start flex-col space-y-2">
            <span>Daily: ${{daily}}</span>
            <span>Weekly: ${{weekly}}</span>
            <span>Monthly: ${{monthly}}</span>
            <span>Yearly: ${{yearly}}</span>
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
