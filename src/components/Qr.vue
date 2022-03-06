<template>
  <vue-qrcode
    :value="address"
    :color="{ dark: '#109dbb', light: '#1bf2ba33' }"
  ></vue-qrcode>
</template>


<script>
import VueQrcode from 'vue-qrcode'
  export default {
    name: 'Qr',
    mixins: [],
    components: {
      VueQrcode
    },
    props: {
        address: String,
    },
    watch: {
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