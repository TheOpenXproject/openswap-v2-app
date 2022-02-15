import openswap from "@/shared/openswap.js";
export default {
  namespaced: true,
  modules: {
    farmData: {
      namespaced: true,
      state: {
        farmData: {},
        soloData: {},
        farmPair:{},
        customData: {},
        farms: null,
        soloFarms: null,
        onePrice: 0,
        OpenXPrice: 0,
        TVL: 0,
        userStaked: 0,
        pendingRewards: 0,
        userAPR: 0,
        stakedAPR: 0,
        userRewardPerWeek: 0,
        validatorData: [],
        openxBurnt: 0,
        openxSupply: 0
      }, //// "setUserStakeTotal", "setTVL", "setPendingRewards" // 
      getters: { ///"setStakedAPR", "setUserAPR", "setUserRewardsPerWeek"
        // get current step state
        
        getFarms: (state) => {
          return state.farms
        },
        getSoloFarms: (state) => {
          return state.soloFarms
        },
        getValidatorData: (state) => {
          return state.validatorData
        },
        getOpenXSupply: (state) => {
          return state.openxSupply
        },
        getOpenXBurnt: (state) => {
          return state.openxBurnt
        },
        getStakedAPR: (state) => {
          return state.stakedAPR
        },
        getUserAPR: (state) => {
          return state.userAPR
        },
        getUserRewardsPerWeek: (state) => {
          return state.userRewardPerWeek
        },
        getUserStake: (state) => {
          return state.userStaked
        },
        getTVL: (state) => {
          return state.TVL
        },
        getPendingRewards: (state) => {
          return state.pendingRewards
        },
        getPoolData: (state, pid) => {
          return state.farmData[pid]
        },
        getSoloData: (state) => {
          return state.soloData
        },
        getStateOnePrice: (state) => {
          return state.onePrice
        },
        getStateOpenXPrice: (state) => {
          return state.OpenXPrice
        },
        getFarmPair: (state) => {
          return state.farmPair
        }
      },
      actions: { 
        setFarms({ commit }, value) {
          commit('_setFarms', value)
        },
        setSoloFarms({ commit }, value) {
          commit('_setSoloFarms', value)
        },
        setValidatorData({ commit }, value) {
          commit('_setValidatorData', value)
        },
         setOpenXSupply({ commit }, value) {
          commit('_setOpenXSupply', value)
        },
         setOpenXBurnt({ commit }, value) {
          commit('_setOpenXBurnt', value)
        },
        setStakedAPR({ commit }, value) {
          commit('_setStakedAPR', value)
        },
        setUserAPR({ commit }, value) {
          commit('_setUserAPR', value)
        },
        setUserRewardsPerWeek({ commit }, value) {
          commit('_setUserRewardsPerWeek', value)
        },
        setUserStakeTotal({ commit }, value) {
          commit('_setUserStakeTotal', value)
        },
        setTVL({ commit }, value) {
          commit('_setTVL', value)
        },
        setPendingRewards({ commit }, value) {
          commit('_setPendingRewards', value)
        },
        setFarmDataState({ commit }, value) {
          commit('_setFarmDataState', value)
        },
        setSoloDataState({ commit }, value) {
          commit('_setSoloDataState', value)
        },
        setCustomDataState({ commit }, value) {
          commit('_setCustomDataState', value)
        },
        setPoolDataState({ commit }, value) {
          commit('_setPoolDataState', value)
        },
        setToken1Amount({ commit }, value) {
          commit('_setToken1Amount', value)
        },
        setOpenXPrice({ commit }, value) {
          commit('_setOpenXprice', value)
        },
        setOnePrice({ commit }, value) {
          commit('_setOnePrice', value)
        },
        setFarmPair({ commit }, value) {
          commit('_setFarmPair', value)
        }
      }, 
      mutations: {
        _setFarms: (state, value) => {
          state.farms = value
        },
        _setSoloFarms: (state, value) => {
          state.soloFarms = value
        },
        _setOpenXSupply: (state, value) => {
          state.openxSupply = value
        },
        _setOpenXBurnt: (state, value) => {
          state.openxBurnt = value
        },
        _setValidatorData: (state, value) => {
          state.validatorData = value
        },
        _setStakedAPR: (state, value) => {
          state.stakedAPR = value
        },
        _setUserAPR: (state, value) => {
          state.userAPR = value
        },
        _setUserRewardsPerWeek: (state, value) => {
          state.userRewardPerWeek = value
        },
        _setUserStakeTotal: (state, value) => {
          state.userStaked = value
        },
        _setTVL: (state, value) => {
          state.TVL = value
        },
        _setPendingRewards: (state, value) => {
          state.pendingRewards = value
        },
        _setFarmDataState: (state, value) => {
          state.farmData = value
        },
        _setSoloDataState: (state, value) => {
          state.soloData = value
        },
        _setCustomDataState: (state, value) => {
          state.customData = value
        },
        _setPoolDataState: (state, value) => {
          state.farmData[value.i] = value.data
        },
        _setToken1Amount: (state, value) => {
          state.token1 = value
        },
        _setOpenXprice: (state, value) => {
          state.OpenXPrice = value
        },
        _setOnePrice: (state, value) => {
          state.onePrice = value
        },
        _setFarmPair: (state, value) => {
          state.farmPair = value
        }
      }
    }
  }
}