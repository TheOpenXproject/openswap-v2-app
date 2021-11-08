<template>
  <div class="flex flex-wrap w-full h-auto ss:mt-3 ss:mb-6 xs:mt-8 xs:mb-12">
    <div class="grid  xs:grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-3 w-auto">
      <div class="flex flex-1 items-start">
        <Total :TVL="data.TVL" :TAPR="data.APRs.tAPR" />
      </div>
      <div class="flex flex-1 items-center">
        <Chart :data="data" />
      </div>
      
      <div class="flex flex-2 items-start">
        <Personal :TVL="data.PVL" :PAPR="data.APRs.pAPR" :REWARDS="data.rewardsPending" />
      </div>
      <div class="flex flex-2 items-start">
        <PersonalRewards :rewardsPerTime="rewardsPerTime" :REWARDS="data.rewardsPending" />
      </div>

      

    </div>
  </div>
</template>

<script>
  import Chart from "@/components/farm/FarmHeader/Chart";
  import Total from "@/components/farm/FarmHeader/Total";
  import Personal from "@/components/farm/FarmHeader/Personal";
  import PersonalRewards from "@/components/farm/FarmHeader/PersonalRewards";

  export default {
    name: 'FarmHeader',
    components: {
      Chart,
      Total,
      Personal,
      PersonalRewards
    },
    props: {
      data: Object,
      rewardsPerTime: Object
    },
    mounted: function() {
      setInterval(
        async function() {
          this.$emit("updateData")
        }.bind(this), 5000
      )
    }
  }
</script>