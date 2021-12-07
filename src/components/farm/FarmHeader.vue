<template>
  <div class="flex w-full h-auto ss:mt-3 ss:mb-6 xs:mt-8 xs:mb-12">
    <div class="flex flex-col ss:w-full xs:w-auto mdd:flex-row bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent p-3 rounded-3xl">

      <div class="flex flex-1 pr-5 items-center">
        <Total :TVL="data.TVL" :TAPR="data.APRs.tAPR" />
         <!--<Chart :data="data" />-->
      </div>

      <div class="flex items-center pt-3 pr-3 pl-5">
        <div class="mdd:flex hidden mdd:divide-x mdd:divide-oswapGreen ml-5"></div>
        <Personal :TVL="data.PVL" :PAPR="data.APRs.pAPR" :REWARDS="data.rewardsPending" />
      </div>
      <div class="flex pt-3 pr-3 flex-2 items-start">
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