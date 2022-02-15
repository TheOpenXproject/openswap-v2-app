<template>
  <div class="flex lg:max-w-none h-auto ss:mt-3 ss:mb-6 xs:mt-8 xs:mb-12">
    <div class="flex flex-col ss:w-full xs:w-auto mdd:flex-row bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent p-3 rounded-3xl">
      <div class="flex flex-1 pt-3 pr-5 items-start">
        <Total/>
        </div>

      <div class="flex items-center pt-3 pr-3 lg:pl-5">
        <div class="mdd:flex hidden mdd:divide-x mdd:divide-oswapGreen ml-5"></div>
        <Personal/>
      </div>
      <div class="flex pt-3 pr-3 flex-2 items-start">
        <PersonalRewards/>
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
  name: "FarmHeader",
  components: {
    Chart,
    Total,
    Personal,
    PersonalRewards,
  },
  props: {
  },
  mounted: function () {
  },
};
</script>
