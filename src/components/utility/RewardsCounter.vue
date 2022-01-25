<template>
<div id="counter" class=" flex flex-1 justify-center items-center">
    <transition name="fall" appear>
        <div v-if="!loading" class="flex flex-none justify-center items-center">
            <div class="flex flex-none from-slightGray dark:from-slightDark to-transparent p-8 rounded-3xl bg-gradient-to-l items-center justify-center flex-col" >
                <span class="animate-pulse dark:text-oswapGreen-light text-oswapGreen-dark text-2xl xs:text-xl md:text-3xl lg:text-4xl">{{filterDecimals(rewards)}}</span>
                <div class="flex flex-none self-end mt-4 items-center">
                    <i class="las la-cube text-base text-oswapBlue-dark"></i>
                    <span class="text-green-500 text-ns text-center align-middle ml-1">{{blockNumber}}</span>
                </div>
            </div>
        </div>
        <div v-else class="flex h-full items-center mt-16">
            <svg class="animate-spin h-8 w-8 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    </transition>
  </div>
</template>

<script>
import openswap from "@/shared/openswap.js";
import { createWatcher } from "@makerdao/multicall";
import { mapGetters } from "vuex";
const { pools } = require("@/store/modules/farm/pools.js");

export default {
    name: "Rewards",
    mixins: [openswap],
    components: { 
        
     },
    computed: {
        ...mapGetters("addressConstants", ["oSWAPMAKER", "oSWAPCHEF", "hMULTICALL", "hRPC"]),
    },
    methods: {
        ...mapGetters("wallet", ["getUserAddress", "getUserSignedIn", "getChainID"]),
        filterDecimals(number) {
            if (number > 99) {
                return number.toFixed(6)
            } else {
                return number.toFixed(12)
            }
        }
    },
    props: {
    },
      data() {
        return {
            Pools: null,
            SoloPools: null,
            oswapPrice: 0,
            rewards: null,
            loading: true,
            blockNumber: null,
            watcher: null
        };
    },
    beforeUnmount: async function () {
        if (this.watcher) {
            this.watcher.stop();
        }
    },
    mounted: async function () {
        this.Pools = pools[this.getChainID()].pools;
        this.SoloPools = pools[this.getChainID()].SoloPools;
        
        let timeout;
        if (this.getUserSignedIn()) {
            timeout = 1;
        } else {
            timeout = 1000;
        }
        await setTimeout(
        async function () {
            await this.getTokenPrices();
            this.oswapPrice = await this.getOswapPrice();
            let userAddress = this.getUserAddress();
            const MASTERCHEF = this.oSWAPCHEF(this.getChainID());
            var CALL = [];
            for (var n in this.SoloPools) {
                //LP Balance CALLS
                CALL.push({
                    target: MASTERCHEF,
                    call: ["pendingOpenSwap(uint256,address)(uint256)", parseInt(this.SoloPools[n].pid), userAddress],
                    returns: [["PENDING_OF_SOLO_" + n, (val) => val]],
                });
            }
            for (var n in this.Pools) {
                //LP Balance CALLS
                CALL.push({
                    target: MASTERCHEF,
                    call: ["pendingOpenSwap(uint256,address)(uint256)", parseInt(this.Pools[n].pid), userAddress],
                    returns: [["PENDING_OF_" + n, (val) => val]],
                });
            }
            const MULTICALL = this.hMULTICALL(this.getChainID());
            const RPC = this.hRPC(this.getChainID());
            const config = {
                rpcUrl: RPC,
                multicallAddress: MULTICALL,
            };
            this.watcher = createWatcher(CALL, config);
            let results = []
            this.watcher.onNewBlock((block)=> {
                this.blockNumber = block;
            })
            this.watcher.batch().subscribe(updates => {
                try {
                    updates.forEach(element => {
                        results[element.type] = parseFloat(this.getEthUnits(element.value.toString()));
                    })
                    const keys = Object.keys(results);
                    const values = keys.map((element)=> results[element])
                    this.rewards = values.reduce((total, nextNumb) => total + nextNumb , 0) * this.oswapPrice;
                    this.loading = false;
                } catch (error) {
                    console.log(error)
                }
            });
            this.watcher.start();
        }.bind(this),
            timeout
        );

        await setInterval(async function(){
            this.oswapPrice = await this.getOswapPrice();
        }.bind(this), 15000)

    }
};
</script>
