import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TooltipMe from 'tooltip-me'
import mitt from 'mitt'
import VueApexCharts from 'vue3-apexcharts'

import Toast from "vue-toastification";
const options = {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true
};

import VueGtag from "vue-gtag-next";
import dayjs from 'dayjs'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import "./assets/style/app.scss"

import "@fontsource/alata"
import "@fontsource/libre-franklin"
import "@fontsource/nunito"
import "@fontsource/montserrat"

import 'animate.css';

const app = createApp(App)
const emitter = mitt();
app.config.globalProperties.oswapEmit = emitter;
app.config.globalProperties.$dayjs = dayjs
app.use(router);
app.use(store);
app.use(PerfectScrollbar);
app.use(Toast, options);
app.use(TooltipMe);
app.use(VueApexCharts);
app.use(VueGtag, { 
  property: { 
    id: "G-HYPSP2E5Q0" 
  },
  property: { 
    id: "AW-1020864225" 
  }
})
app.mount('#oswapApp')
