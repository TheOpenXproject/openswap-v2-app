  <template>
          <div class="flex w-full">
            <div class="grid w-full xs:grid-cols-2 ss:grid-cols-2 lg:grid-cols-3 gap-2 lg:ml-8 h-auto p-3 bg-gray-200 dark:bg-oswapDark-gray shadow-lg rounded">
           
              <div class="flex space-x-1">
                <div class="flex items-start h-full"><i class="las la-handshake text-xl text-oswapGreen"></i></div>
                <div class="flex flex-col h-full justify-between">
                  <p class="text-xs text-oswapBlue-light">Pending Undelegation</p>
                  <p class="text-lg dark:text-gray-400">{{ prettify(this.validator.pendingUndelegation) }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-dollar-sign text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">One Delegated</p>
                  <p class="text-lg dark:text-gray-400">{{ prettify(this.validator.userDelegations)}}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-dollar-sign text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">Delegated value</p>
                  <p class="text-lg dark:text-gray-400">$ {{ prettify((parseFloat(validator.userDelegations) * parseFloat(this.getStateOnePrice())).toFixed(2))}}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">APR</p>
                  <p class="text-lg dark:text-gray-400">% {{ this.validator.apr }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">Injected APR</p>
                  <p class="text-lg dark:text-gray-400">% {{ parseFloat(validator.addedAPR).toFixed(2) }}</p>
                </div>
              </div>
              
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">Total APR</p>
                  <p class="text-lg dark:text-gray-400">% {{this.getApr}}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">My APY</p>
                  <p class="text-lg dark:text-gray-400">% {{ this.myAPY}}</p>
                </div>
              </div>
               <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">Highest APY</p>
                  <p class="text-lg dark:text-gray-400">% {{ this.highestAPY}}</p>
                </div>
              </div>

              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">Lowest APY</p>
                  <p class="text-lg dark:text-gray-400">% {{ this.lowestAPY}}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-coins text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">Pending One Rewards</p>
                  <p class="text-lg dark:text-gray-400">{{ this.validator.pendingRewardsOne.toFixed(8)}}</p>
                </div>
              </div>
                 <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-coins text-xl text-oswapGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-oswapBlue-light">OpenX Reward Ratio</p>
                  <p class="text-lg dark:text-gray-400">% {{100 - this.validator.oxratio }}</p>
                </div>
              </div>
            </div>
          </div>

</template>
<script>
import openswap from "@/shared/openswap.js";
import ValidatorChart from "@/components/farm/Validators/ValidatorChart";
import StakingInfoTabs from "@/components/farm/Validators/StakingInfoTabs";
  import { mapGetters } from 'vuex';

import { ethers } from "ethers";

export default {
  name: "StakingInfo",
  mixins: [openswap],
  components: {
    ValidatorChart,
    StakingInfoTabs,
  },
  props: {
    validator: Object,
    highestAPY: Number,
    lowestAPY: Number,
    myAPY: Number
  },
  data() {
  	return{
  	myFarmApr: 0,
  	aprs: [],
  	aprID: []
  	}

  },
  async mounted() {


  },
  computed: {
  	    getApr : function(){
        return (parseFloat(this.validator.apr) + this.validator.addedAPR).toFixed(2)
      },
     getApy : function(){
        let totalAPR = parseFloat(this.getApr)
        return (totalAPR * ((1+this.myFarmApr/365)**365-1) + totalAPR).toFixed(2)
      },
  },
  methods: {

    isFifteen: function() {
      if(this.validator.name.includes('15%')){
        return true
      } else {
      return false
    }
    },
    selectValidator: function () {
      this.$emit("selectValidator", null);
    },
     updateValData: function () {
      this.$emit("updateValData", null);
    },
    prettify: function(number){
        if(number != "NA"){
          return ethers.utils.commify(String(number))
        }
        else{
          return number
        }
        
      }
  },
};
</script>