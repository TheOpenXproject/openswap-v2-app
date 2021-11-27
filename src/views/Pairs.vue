<template>
  <div id="pairs" class="max-w-screen-xl mx-auto flex flex-1 flex-col items-center oswap-layout xl:px-0 px-3 text-gray-500 pb-16" style="margin-top: 98px">
    <div id="pairList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
      <Pair v-for="(pair, index) in this.pairData" :key="index" :pair="pair" />
    </div>
  </div>
</template>

<script>
import Pair from "@/components/pairs/Pair";

export default {
  name: "Pairs",
  components: { Pair },
  mounted() {
    console.log(this.pairData);
  },
  data() {
    return {
      pairData: [
        {
          token0: {
            Symbol: "bBNB",
            name: "Binance Coin",
            bscAddress: "0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", //Native Token so no Real address
            bscImg: "",
            imgSrc: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
            oneAddress: "one1k8mwv8s7zymz2kf6ytax4220spftcw0q2et32z",
            oneZeroxAddress: "0xb1f6E61E1e113625593a22fa6aa94F8052bc39E0",
            oneImg: "",
            decimals: 18,
          },
          token1: {
            Symbol: "bBUSD",
            name: "Binance BUSD Token",
            bscAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
            bscImg: "",
            imgSrc: "https://openfi.dev/tokens/default/BUSD.png",
            oneAddress: "one1p26r259xj90e7e7sc32v96grshnyjl420na5yn",
            oneZeroxAddress: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
            oneImg: "",
            decimals: 18,
          },
          balance: "0.0000189",
          staked: "000000.99",
          pairaddress: "0x0aB43550A6915F9f67d0c454C2E90385E6AKD9",
        },
        {
          token0: {
            Symbol: "bBNB",
            name: "Binance Coin",
            bscAddress: "0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", //Native Token so no Real address
            bscImg: "",
            imgSrc: "https://s2.coinmarketcap.com/static/img/coins/128x128/1839.png",
            oneAddress: "one1k8mwv8s7zymz2kf6ytax4220spftcw0q2et32z",
            oneZeroxAddress: "0xb1f6E61E1e113625593a22fa6aa94F8052bc39E0",
            oneImg: "",
            decimals: 18,
          },
          token1: {
            Symbol: "bBUSD",
            name: "Binance BUSD Token",
            bscAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
            bscImg: "",
            imgSrc: "https://openfi.dev/tokens/default/BUSD.png",
            oneAddress: "one1p26r259xj90e7e7sc32v96grshnyjl420na5yn",
            oneZeroxAddress: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
            oneImg: "",
            decimals: 18,
          },
          balance: "0.0000189",
          staked: "000000.99",
          pairaddress: "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
        },
      ],
    };
  },
};
</script>
