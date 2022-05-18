<template>
    <lottie-player
        :src="Loader"
        background="transparent"
        speed="1"
        style="width: 125px; height: 125px;"
        loop
        autoplay
    ></lottie-player>
</template>

<script  >
import Loader from '../assets/loading.json'
  export default {
    name: 'Loading',
    data() {
      return {
          Loader
      }
    }
  }
</script>