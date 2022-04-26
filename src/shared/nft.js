import { mapGetters, mapActions } from 'vuex';
import { ethers } from "ethers";
const { toBech32 } = require('@harmony-js/crypto');
import { createWatcher } from '@makerdao/multicall'




export default {
	mounted: function () {

	},
	computed: {
 	  ...mapActions('exchange/swapper', ['setAllPairs']),
      ...mapActions('farm/farmData', ['setFarms']),
      ...mapActions("farm/farmData", ["setSoloDataState", "setCustomDataState", "setFarms", "setUserStakeTotal", "setTVL", "setPendingRewards", "setOnePrice", "setOpenXPrice", "setTotalAPR", "setStakedAPR", "setUserAPR", "setUserRewardsPerWeek","setValidatorData","setOpenXBurnt","setOpenXSupply","setSoloFarms", "setTokensState", "setOneBalance"]),
		...mapGetters("addressConstants", ["hMULTICALL", "hRPC", "oSWAPCHEF", 'getValContracts']),
	},
	methods: {
		...mapGetters('wallet', ['getUserAddress', 'getChainID']),
		loadERC721: async function(tokenID, token){
			const MULTICALL = this.hMULTICALL(this.getChainID());
			console.log(MULTICALL)
	        const RPC = "https://api.harmony.one"
	     		console.log("hello2")
	        var CALL = [];
	    		//uint256 public proposalCount;

			CALL.push({
				target: token,
				call: ['tokenURI(uint256)(string)',tokenID],
				returns: [['uri : ', (val) => val]]
			})

			CALL.push({
				target: token,
				call: ['ownerOf(uint256)(address)', tokenID],
				returns: [['owner : ', (val) => val]]
			})
			CALL.push({
				target: token,
				call: ['symbol()(string)'],
				returns: [['symbol : ', (val) => val]]
			})
			CALL.push({
				target: token,
				call: ['name()(string)'],
				returns: [['name : ', (val) => val]]
			})
			CALL.push({
				target: token,
				call: ['totalSupply()(uint256)'],
				returns: [['totalSupply : ', (val) => val]]
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
	      console.log(results)

	      let meta = await(await fetch(results[0].value)).json()

			const tokenData = {
				token: token,
				tokenId: tokenID,
				uri: results[0].value,
				owner: results[1].value,
				metadata: meta,
				symbol: results[2].value,
				totalSupply: results[4].value.toString(),
				name: results[3].value
			}
	      watcher.stop();
	      console.log(tokenData)
	   	return tokenData
		},
		getOneBalance: async function(){
			const provider = this.getProvider()
			const userAddress = this.getUserAddress();
			const balance = await provider.getBalance(userAddress);

       // let formatedbalance = ethers.utils.formatUnits(balance.toString(), 18).toString();



       return balance;
   },
   loadPreviews: async function(){
   	
   },
   getProvider: function(call){
   	let networks = {
   		1:{
   			rpcURL: '',
   			provider: '',
   			name: ""
   		},
   		56: {
   			rpcURL: '',
   			provider: '',
   			name: ""
   		},
   		1666600000: {
   			rpcURL: 'https://api.harmony.one',
   			provider: new ethers.providers.JsonRpcProvider('https://api.harmony.one', {chainId: 1666600000, name: "Harmony Mainnet S0"}),
   			name: "mainnet harmony"
   		},
   		1666700000: {
   			rpcURL: 'https://api.s0.b.hmny.io',
   			provider: new ethers.providers.JsonRpcProvider('https://api.s0.b.hmny.io', {chainId: 1666700000, name: "Harmony Testnet S0"}),
   			name: "testnet"
   		},
   		1337:{
   			rpcURL: 'http://localhost:7545',
   			provider: new ethers.providers.JsonRpcProvider('http://localhost:7545', {chainId: 1337, name: "local"}),
   			name: "local"
   		}
   	}

   	const provider = networks[1666600000].provider
   	return provider

   },

}
};