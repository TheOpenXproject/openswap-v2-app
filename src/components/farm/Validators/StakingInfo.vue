<template>
 <transition name="fall" appear>
      <div>
        <center>
        <div v-if="farmloaded && !loaded" class="items-center">
        <svg class="animate-spin h-8 w-8 text-oswapGreen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

      </div>
      </center>

      <div class="grid overflow-hidden grid-cols-1 grid-rows-1 gap-3.5 w-full items-center mb-4">
        <div v-if="loaded" v-for="(validator, index) in validators"  :key={index} class="w-full ">
          <StakingInfoClosed class="flex w-full my-4 pl-4 dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray " :validator="validator" :key="validator" v-if="this.selectedValidator != validator.address" @selectValidator="selectValidator" />
          <StakingInfoOpen v-if="this.selectedValidator == validator.address" :key="validator"  :validator="validator" @selectValidator="selectValidator" class="w-full pl-4 my-4 dark:from-slightDark from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray " />
        </div>
       </div>
       </div>
   </transition>
</template>

<script>
import openswap from "@/shared/openswap.js";
import { ethers } from "ethers";
import StakingInfoOpen from "@/components/farm/Validators/StakingInfoOpen";
import StakingInfoClosed from "@/components/farm/Validators/StakingInfoClosed";
import { createWatcher } from "@makerdao/multicall";

import { mapGetters, mapActions } from "vuex";

import delegateContract from "./delegateContract.json"
export default {
  name: "StakingInfo",
  mixins: [openswap],
  components: {
    StakingInfoClosed,
    StakingInfoOpen,
  },
  props: {
      farmloaded: Boolean,
  },
  computed: {
    ...mapGetters("addressConstants", ["hMULTICALL", "hRPC", "oSWAPCHEF", 'getValContracts']),
  },
  data() {
    return {
      loaded: false,
      validators: [],
      selectedValidator: null,
      validatorAddresses: {
        0: "one1p2e0a0806jv8tqr37k7c8k67zgfjwtzpf9apv2",
        1: "one1j35d0vd4uzwffeawjjfukn8t9wjt8csungj0z0",

      }
    }
  },
  async mounted() {
      
      var i = 0;
      for(var n in this.validatorAddresses){
      await this.getValidatorData(this.validatorAddresses[n], n)
      await this.getUserData(this.validatorAddresses[n])
      await this.getContractInfo(n, i);
      i++;
      }    
      this.loaded = true
    
  },
  methods: {
        ...mapGetters('farm/farmData', ['getStateOpenXPrice', 'getStateOnePrice']),

    selectValidator: function (val) {
      console.log(val);
      this.selectedValidator = val;
    },
    prettify: function (number) {
      return ethers.utils.commify(number);
    },
    formatToMillion(string) {
      let parsed = string.toLocaleString("fullwide", { useGrouping: false }).replace(/0+$/, "");
      return ethers.utils.commify(parsed).match(/^(\d{1,3})?[.,]?(\d{1,3})?[.,]?(\d{1,3})?[.]?(\d{1,2})/g)[0];
    },
    formatToBillion(string) {
      let parsed = string.toLocaleString("fullwide", { useGrouping: false }).replace(/0+$/, "");
      return ethers.utils.commify(parsed).match(/^(\d{1,3})?[.,]?(\d{1,3})?[.,]?(\d{1,3})?[.,]?(\d{1,3})?[.]?(\d{1,2})/g)[0];
    },
    getUserData(valAddr){
      let userAddr = this.getUserAddress()
      console.log(userAddr)
    },
    getValidatorInformationRequest(valAddr){
      return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "hmy_getValidatorInformation",
          params: [valAddr],
        }),
      };

    },
    getUserDelegationsRequest(valAddr){
      return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "hmyv2_getDelegationsByDelegator",
          params: [valAddr],
        }),
      };

    },
    getValidatorData: async function(valAddr, id){
      const valInfo = await (await fetch("https://api.s0.t.hmny.io/", this.getValidatorInformationRequest(valAddr)).catch(()=>{})).json()
      var val = {
        name: valInfo.result.validator.name,
        address: valAddr,
        totalDelegated: parseFloat(valInfo.result["total-delegation"].toLocaleString('fullwide', { useGrouping: false }) / 10 ** 18).toFixed(2),
        apr: (valInfo.result.lifetime.apr * 100).toFixed(2),
        pendingUndelegation: 0,
        userDelegations: 0
      }
      console.log(valInfo.result["total-delegation"].toLocaleString('fullwide', { useGrouping: false }))

      const userValInfo = await (await fetch("https://api.s0.t.hmny.io/", this.getUserDelegationsRequest(this.getUserAddress())).catch(()=>{})).json()
      for(var n in userValInfo.result){

        if(userValInfo.result[n].validator_address == valAddr){
          val.userDelegations = (userValInfo.result[n].amount.toLocaleString('fullwide', { useGrouping: false }) /10**18).toFixed(2)
         
            for(var x in userValInfo.result[n].Undelegations){
           
              console.log((userValInfo.result[n].Undelegations[x].Amount / 10**18).toFixed(2))
            if(userValInfo.result[n].Undelegations.length>0){
              console.log((userValInfo.result[n].Undelegations[x].Amount / 10**18).toFixed(2))
              val.pendingUndelegation += (userValInfo.result[n].Undelegations[x].Amount / 10**18).toFixed(2)
            }
            
          }
          if(userValInfo.result[n].Undelegations.length>0){
            val.pendingUndelegation = 0
          }
      }

    }
     
      this.validators[id] = val;
    },
    getContractInfo: async function(n){
      const MULTICALL = this.hMULTICALL(this.getChainID());
      const valContracts = this.getValContracts(this.getChainID())
      console.log( valContracts[n])
      const valContract = valContracts[1]
      
      const RPC = this.hRPC(this.getChainID());
     
        let CALL = [];
        //uint256 public proposalCount;
        const addr = this.getUserAddress()
       
    CALL.push({
      target: valContract.valv4,
      call: ['getPendingRewards(address)(uint256)', addr],
      returns: [['pending : ', (val) => val]]
    })
    CALL.push({
      target: valContract.valv4,
      call: ['isCompoundingEnabled(address)(bool)', addr],
      returns: [['isComp : ', (val) => val]]
    })
    CALL.push({
      target: valContract.valv4,
      call: ['rewardTo(address)(address)', addr],
      returns: [['rewTo : ', (val) => val]]
    })
    CALL.push({
      target: valContract.delegateContract,
      call: ['getRatio(address)(uint256)', addr],
      returns: [['oxratio : ', (val) => val]]
    })
    CALL.push({
      target: valContract.registery,
      call: ['getPairFromRegisteryByAddress(address)(address, address, address, uint256)', addr],
      returns: [['farma : ', (val) => val],['oxrdatio : ', (val) => val],['oxrwatio : ', (val) => val],['oxrsatio : ', (val) => val]]
    })
        var results = [];
      
      const config = {
        rpcUrl: RPC,
        multicallAddress: MULTICALL
      };

      var pool = {
        pid : 19
    }
      
      var reward1 = await this.getRewardValueVal(pool, 100)
      let onePrice = await this.getStateOnePrice() 
      const usdStaked = await this.getStateOnePrice() * this.validators[n].totalDelegated


      const addedAPR = parseFloat(((parseFloat(reward1)*12)/usdStaked) * 100).toFixed(2);
    
      console.log(results)

      const watcher = createWatcher( CALL, config ); 
      watcher.subscribe((update) => { results.push(update) }); 
      watcher.start();
      await watcher.awaitInitialFetch(); 


      this.validators[n].oneStaked = (this.validators[n].userDelegations)
      this.validators[n].oxratio = 100 - results[3].value.toString()
      this.validators[n].earnedOne = (results[0].value.toString() / 10**18).toFixed(8)

      this.validators[n].injectedAPR = addedAPR
      this.validators[n].totalAPR = (parseFloat(addedAPR) + parseFloat(this.validators[n].apr)).toFixed(2)
      this.validators[n].usdValueDelegated = parseFloat(onePrice * this.validators[n].userDelegations).toFixed(2)
      this.validators[n].isCompounding = results[1].value
      this.validators[n].farmPair = results[6].value
      this.validators[n].index = n
      if(results[2].value == "0x0000000000000000000000000000000000000000"){
        this.validators[n].rewardTo = addr;
      }else{
        this.validators[n].rewardTo = results[2].value
      }

      console.log(results[6].value)
      
      if(n == 0){
        this.validators[n].isCompounding = results[1].value
        this.validators[n].oneStaked = "NA"
        this.validators[n].oxratio = "NA"
        this.validators[n].earnedOne = "NA"
        this.validators[n].earnedOpenx = "NA"
        this.validators[n].earnedUsd = "NA"
        this.validators[n].injectedAPR = "NA"
        this.validators[n].isCompounding = "NA"
        this.validators[n].rewardTo = "NA"
        this.validators[n].totalAPR = this.validators[n].apr
      }
    }
    
  },
};
</script>

<style lang="scss" scoped>
  .titanic{
    float: none;
  }
</style>
