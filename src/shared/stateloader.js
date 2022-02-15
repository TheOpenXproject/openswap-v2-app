import { mapGetters, mapActions } from 'vuex';
import { ethers } from "ethers";
import { toastMe } from '@/components/toaster/toaster.js';
import { createWatcher } from '@makerdao/multicall'
 // import openswap from "@/shared/openswap.js";

 const { pools } = require("@/store/modules/farm/pools.js");




 export default {
 	mounted: function () {

 	},
 	computed: {
    ...mapGetters("addressConstants", ["oSWAPMAKER", "oSWAPCHEF", "hMULTICALL", "hRPC", "UNIFACTORY"]),
    ...mapGetters('wallet', ['getUserSignedIn', 'getUserSignedOut', 'getUserAddress', 'getWallet', 'getWalletType',  'getChainID']),

 	},
 	methods: {
 		//...mapActions('wallet', ['setSignedIn', 'setSignedOut', 'setUserAddress', 'setUserWallet','setWalletType','setChainID']),
 		loadState: async function() {




 		},
 		getAllPairs: async function(){
 			const MULTICALL = this.hMULTICALL(this.getChainID());
      		const RPC = this.hRPC(this.getChainID());
      		const FACTORY_ADDRESS = this.UNIFACTORY(this.getChainID())

 			let CALL = [];
    		//uint256 public proposalCount;

    		CALL.push({
    			target: FACTORY_ADDRESS,
    			call: ['allPairsLength()(uint256)'],
    			returns: [['pairLength : ', (val) => val]]
    		})

    		var results = [];

    		const config = {
    			rpcUrl: RPC,
    			multicallAddress: MULTICALL
    		};


    		const watcher = createWatcher(
    			CALL,
    			config
    			);
    		watcher.subscribe((update) => { results.push(update) });
    		watcher.start();

    		await watcher.awaitInitialFetch();
    		var pairCount = results[0].value.toString()
    		watcher.stop();
    		CALL = [];


    		let i = 0;
    		while(i < this.pairCount){
    			CALL.push({
    				target: FACTORY_ADDRESS,
    				call: ['allPairs(uint256)(address)', i],
    				returns: [['pairAddr' + i + " ", (val) => val]]
    			})

    			i++;
    		}


    		console.log(pairCount)

    	},
    	fetchAllPairs: async function() {






    	},
    	fetchFarmPairs: async function() {






    	},
    	fetchBalances: async function() {




    	},
    	fetchFarms: async function() {




    	},

    }
};