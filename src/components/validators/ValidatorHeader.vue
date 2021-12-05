<template>
  <div class="flex w-full h-auto ss:mt-3 ss:mb-6 xs:mt-8 xs:mb-12">
    <div class="flex flex-col ss:w-full xs:w-auto mdd:flex-row bg-gradient-to-l from-slightGray dark:from-slightDark to-transparent p-3 rounded-3xl">
      <div class="flex flex-1 pr-5 items-center">
        <ValidatorChart :validator="validator" />
      </div>

      <div class="flex items-center pt-3 pr-3 mdd:divide-x mdd:divide-oswapGreen">
        <div class="mdd:flex hidden"></div>
      </div>
      <div class="flex pt-3 pr-3 flex-2 items-start"></div>
    </div>
  </div>
</template>

<script>
import ValidatorChart from "@/components/farm/Validators/ValidatorChart";

export default {
  name: "ValidtorHeader",
  components: [ValidatorChart],
  data() {
    return {
      validators: null,
      selectedValidator: null,
    };
  },
  async mounted() {
    const requestOptions = (addr) => {
      return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "hmy_getValidatorInformation",
          params: [addr],
        }),
      };
    };

    // 15% node
    // one1p2e0a0806jv8tqr37k7c8k67zgfjwtzpf9apv2
    // 100% node
    // "one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0"

    const response100 = await fetch("https://harmony-0-rpc.gateway.pokt.network", requestOptions("one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0"));
    var data100 = await response100.json();

    const response15 = await fetch("https://harmony-0-rpc.gateway.pokt.network", requestOptions("one1p2e0a0806jv8tqr37k7c8k67zgfjwtzpf9apv2"));
    var data15 = await response15.json();

    this.validators = {
      oneHundred: {
        name: data100.result.validator.name,
        address: "one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0",
        totalDelegated: this.prettify((data100.result["total-delegation"] / 10 ** 18).toFixed(2)),
        apr: (data100.result.lifetime.apr * 100).toFixed(2),
      },
      fifteen: {
        name: data15.result.validator.name,
        address: "one1p2e0a0806jv8tqr37k7c8k67zgfjwtzpf9apv2",
        totalDelegated: this.prettify((data15.result["total-delegation"] / 10 ** 18).toFixed(2)),
        apr: (data15.result.lifetime.apr * 100).toFixed(2),
      },
    };
  },
};
</script>

<style></style>
