<template>
  <div id="farm" class="max-w-screen-xl mx-auto flex flex-1 flex-col oswap-layout xl:px-0 px-3 text-gray-500">
    <div v-if="!isLoaded" class="flex flex-1 items-center justify-center w-full h-full">
      <transition name="fade-in" appear>
        <svg class="animate-spin h-7 w-7 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </transition>
    </div>

    <transition name="fade-in" appear>
      <div v-if="isLoaded" class="flex flex-col w-full space-y-3 mt-8 text-gray-400 dark:text-gray-300">
        <div class="flex flex-col w-full space-y-4">
          <div class="grid grid-cols-3 gap-3 w-full h-auto ss:mt-3 mb-8 xs:mt-8">
            <div class="flex w-full col-span-1">
              <div class="flex flex-col">
        
                <div class="flex space-x-1 items-center mb-6">
                  <i class="las la-sitemap text-lg dark:text-oswapGreen"></i>
                  <p class="text-sm uppercase">{{validator.name}}</p>

                </div>

                <div class="flex flex-col space-x-1 text-gray-400 dark:text-gray-300 mb-3">
                  <p class="ss:text-2xl xs:text-5xl font-extrabold">{{validator.totalDelegated}}</p>
                  <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Total Staked</p>
                </div>


                <div class="flex flex-col space-x-1 text-gray-600 dark:text-gray-200">
                  <p class="ss:text-2xl xs:text-5xl font-extrabold">{{validator.apr}} %</p>
                  <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Expected Return</p>
                </div>

              </div>
            </div>
            <!-- chart -->
           

          </div>
           <div class="flex flex-col w-full rounded-2xl bg-gradient-to-l dark:from-slightDark from-darkGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray py-3 px-4">
              <apexchart type="line" class="w-full" height="250" :options="chart.chartOptions" :series="chart.series"></apexchart>
           </div>
          

         
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import VueApexCharts from "vue3-apexcharts";

  import openswap from "@/shared/openswap.js";
  import { ethers } from 'ethers';
  import Divider from "@/components/Divider"

  export default {
    name: 'Validator',
    mixins: [openswap],
    components: {
      Divider,
      apexchart: VueApexCharts
    },
    props: {
      validator: Object,
    },
    data() {
      return {
        loadedData: null,
        isLoaded: null,
        validatorData: {
        	totalDelegated: null,
        	delegators: null,
        	apr: null,
        	epochs: {
        		id: null,
        		apr: null
        	}
        },
        chart: {
          series: [{
            name: "APR",
            data: []
          }],
          chartOptions: {
            chart: {
              height: 250,
              group: 'sparks',
              type: 'line',
              sparkline: {
                enabled: true
              },
              dropShadow: {
                enabled: true,
                top: 2,
                left: 3,
                blur: 7,
                opacity: 0.1,
              },
            },
            stroke: {
              curve: 'smooth'
            },
            markers: {
              size: 0
            },
            colors: ['#18d5bb'],
            dataLabels: {
              enabled: false
            },
            grid: {
              padding: {
                top: 10,
                bottom: 10,
              }
            },
            xaxis: {
              type: 'epochs',
              categories: [],
              crosshairs: {
                width: 1
              },
            },
            tooltip: {
              theme: false,
              custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                return (
                  '<div class="flex p-3 rounded-md bg-gray-100 dark:bg-slightDark text-xs text-gray-500 dark:text-gray-200 border-l border-oswapGreen">' +
                  "<span>" + "Epoch " + w.globals.categoryLabels[dataPointIndex] + ": " + (series[seriesIndex][dataPointIndex] * 100 + "%") + "</span>" +
                  "</div>"
                );
              }
            }
          }
        }
      }
    },
    async mounted() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "method": "hmyv2_getValidatorInformation",
          "params": [
              this.validator.address
          ]
        }),
      };

      const response = await fetch("https://harmony-0-rpc.gateway.pokt.network", requestOptions);
      this.loadedData = await response.json();

      this.validatorData.totalDelegated = this.prettify((this.loadedData.result['total-delegation']/10**18).toFixed(2))
      this.validatorData.delegators = this.loadedData.result.validator.delegations
                    .filter(d => d.amount > 0)
                    .sort(function (a, b) { return a.amount - b.amount })
                    .reverse()
        this.validatorData.apr = (this.loadedData.result.lifetime.apr * 100).toFixed(2)
        this.validatorData.epochs.id = this.loadedData.result.lifetime['epoch-apr'].map(i => i.epoch)
        this.validatorData.epochs.apr = this.loadedData.result.lifetime['epoch-apr'].map(a => parseFloat(a.apr).toFixed(4))
        
      
        
      this.chart.series[0].data = this.validatorData.epochs.apr;
      this.chart.chartOptions.xaxis.categories = this.validatorData.epochs.id;
      this.isLoaded = true
    },
    methods: {
      prettify: function(number){
        return ethers.utils.commify(number)
      },
      formatToMillion(string) {
        let parsed = string.toLocaleString('fullwide', { useGrouping: false });
        return ethers.utils.commify(parsed)
                           .match(/^(\d{1,3})?[.,]?(\d{1,3})?[.,]?(\d{1,3})?[.]?(\d{1,2})/g)[0];
      },
      toPercent(data, amount) {
        let total = data.result['total-delegation']
        let value = amount * 100 / total
        return value
      }
    }
  }
</script>