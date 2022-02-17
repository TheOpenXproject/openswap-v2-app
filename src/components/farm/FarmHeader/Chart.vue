<template>
  <div class="flex items-center">
    <div class="flex">
      <apexchart type="donut" width="250" height="300" :options="chartOptions" :series="this.series"></apexchart>
    </div>
    <div class="flex flex-col z-20 items-center text-gray-500 dark:text-gray-300 center-component">
      <p class="ss:text-5xl xs:text-7xl">{{totalPools}}</p>
      <p class="text-xs">Weight Distribution</p>
    </div>
  </div>
</template>

<script>
  import VueApexCharts from "vue3-apexcharts";
  import { ethers } from 'ethers'; 
  import {mapGetters } from 'vuex';

  export default {
    name: 'Chart',
    components: {
      apexchart: VueApexCharts
    },
    props: {
    },
    mounted() {

        const data = this.getData()
        this.series = data.value
        //console.log(amounts)
        this.chartOptions.labels = data.tokens
        this.totalPools = data.value.length
    },
    methods: {
      ...mapGetters("farm/farmData", ["getTokens"]),
      prettify: function(number){
        return  ethers.utils.commify(number)
      },
      getData: function(){
        var data = {
          tokens: [],
          value: []
        }
        var tokens = this.getTokens()
        var usdValue = []
        var names = []
        for(var n in tokens){
          if(tokens[n].stakedBal > 0){
          data.value.push((tokens[n].stakedBal.toFixed(5) * tokens[n].tokenPriceUsd.toFixed(5)).toFixed(2))
          data.tokens.push(tokens[n].symbol)
          }
        }

        return data
      }
    },
    data() {
      return {
        totalPools: 0 ,
        series: [],
        chartOptions: {
          chart: {
            type: 'donut'
          },
          responsive: [{
            breakpoint: 540,
            options: {
              chart: {
                width: 150,
                height: 150
              }
            }
          }],
          labels: [],
          plotOptions: {
            pie: {
              expandOnClick: false,
              donut: {
                size: '100%'
              }
            }
          },
          colors: [
            '#1bf2ba', '#18d5bb', '#13b4ba', '#109dbb',
            '#1bf2ba', '#18d5bb', '#13b4ba', '#109dbb',
            '#1bf2ba', '#18d5bb', '#13b4ba', '#109dbb',
            '#1bf2ba', '#18d5bb', '#13b4ba', '#109dbb',
            '#1bf2ba', '#18d5bb', '#13b4ba', '#109dbb',
            '#1bf2ba', '#18d5bb', '#13b4ba', '#109dbb'
          ],
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false,
          },
          stroke: {
            show: false,
            curve: 'smooth',
            lineCap: 'round',
            colors: 'rgba(49, 53, 71, 1)',
            width: 1,      
          },
          states: {
            normal: {
              filter: {
                type: 'none',
                value: 0,
              }
            },
            hover: {
              filter: {
                type: 'none',
                value: 0.15,
              }
            },
            active: {
              allowMultipleDataPointsSelection: true,
              filter: {
                type: 'none',
                value: 0.45,
              }
            },
          },
          tooltip: {
            theme: false,
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
              return (
                '<div class="flex p-3 rounded-full bg-gray-100 dark:bg-slightDark text-xs text-gray-500 dark:text-gray-200 border-2 border-oswapGreen">' +
                "<span>" + w.globals.labels[seriesIndex] + ": " + "$ " + this.prettify(parseFloat(series[seriesIndex]).toFixed(2)) + "</span>" +
                "</div>"
              );
            }
          }
        },
      };
    },
  }
</script>