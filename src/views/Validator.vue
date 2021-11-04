<template>
  <div id="farm" class="max-w-screen-xl mx-auto flex flex-1 flex-col oswap-layout xl:px-0 px-3 text-gray-500 pb-16">
    <div v-if="!validator" class="flex flex-1 items-center justify-center w-full h-full">
      <transition name="fade-in" appear>
        <svg class="animate-spin h-7 w-7 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </transition>
    </div>

    <transition name="fade-in" appear>
      <div v-if="validator" class="flex flex-col w-full space-y-3 mt-8 text-gray-600 dark:text-gray-300">
        <div class="flex flex-col w-full space-y-4">
          <div class="grid grid-cols-8 gap-3 w-full h-auto ss:mt-3 mb-8 xs:mt-8">
            <div class="flex w-full col-span-2">
              <div class="flex flex-col">
        
                <div class="flex space-x-2 items-center mb-6">
                  <i class="las la-sitemap text-2xl dark:text-oswapGreen"></i>
                  <p class="text-sm uppercase">{{validator.name}}</p>

                </div>

                <div class="flex flex-col space-y-2 text-gray-600 dark:text-gray-300 mb-3">
                  <p class="ss:text-2xl xs:text-5xl font-extrabold">{{validator.totalDelegated}}</p>
                  <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Total Staked</p>
                </div>


                <div class="flex flex-col space-y-2 text-gray-600 dark:text-gray-300">
                  <p class="ss:text-2xl xs:text-5xl font-extrabold">{{validator.apr}} %</p>
                  <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Expected Return</p>
                </div>

              </div>
            </div>
            <!-- chart -->
            <div class="flex col-span-6">
              <apexchart type="line" class="w-full" height="250" :options="chart.chartOptions" :series="chart.series"></apexchart>
            </div>

          </div>

          <Divider :title="validator.delegators.length + ' Delegators'" class="w-full text-sm py-3" />

          <div class="grid grid-cols-8 gap-3">
            <div v-for="(delegator, index) in validator.delegators" :key="index" class="flex flex-col rounded-xl space-y-1 st5 rounded-2xl bg-gradient-to-l dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray border-l border-oswapGreen py-3 px-4 shadow">
              <div class="flex flex-col space-y-1">
                <p class="text-xs text-oswapBlue-light">Address:</p>
                <p class="text-xs text-el">{{delegator['delegator-address']}}</p>
                <p class="text-xs text-oswapBlue-light">Amount:</p>
                <p class="text-xs text-el">{{prettify((delegator.amount/10**18).toFixed(2))}}</p>
                <p class="text-xs text-oswapBlue-light">Weigth:</p>
                <p class="text-xl text-el font-bold">{{toPercent(loadedData, delegator.amount).toFixed(4)}}%</p>
              </div>
            </div>
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
    data() {
      return {
        address: this.$route.params.address,
        validator: null,
        loadedData: null,
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
              this.address
          ]
        }),
      };

      const response = await fetch("https://harmony-0-rpc.gateway.pokt.network", requestOptions);
      this.loadedData = await response.json();

      this.validator = {
        name: this.loadedData.result.validator.name,
         totalDelegated: this.prettify((this.loadedData.result['total-delegation']/10**18).toFixed(2)),
        delegators: this.loadedData.result.validator.delegations
                    .filter(d => d.amount > 0)
                    .sort(function (a, b) { return a.amount - b.amount })
                    .reverse(),
        apr: (this.loadedData.result.lifetime.apr * 100).toFixed(2),
        epochs: {
          id: this.loadedData.result.lifetime['epoch-apr'].map(i => i.epoch),
          apr: this.loadedData.result.lifetime['epoch-apr'].map(a => parseFloat(a.apr).toFixed(4))
        }
      }

      this.chart.series[0].data = this.validator.epochs.apr;
      this.chart.chartOptions.xaxis.categories = this.validator.epochs.id;
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