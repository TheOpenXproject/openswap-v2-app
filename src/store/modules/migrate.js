export default {
  namespaced: true,

  state: {
    swap: {},

    amount: {
      0: '1.0',
      1: '0.0'
    },
    balance: {
      0: '0.0',
      1: '0.0'
    },
  },
  getters: {
    getBalanceToken: (state) => (token) => {
      return state.balance[token];
    },
    getToken: (state) => {
      return state.swap
    },
  },
  actions: {
    setBalanceToken({commit}, value) {
      commit('_setBalanceToken', value);
    },
    setToken({ commit }, value) {
      commit('_setToken', value)
    },
    
  },
  mutations: {
    _setBalanceToken: (state, value) => {
      let token = Object.keys(value)[0];
      let balance = value[token];

      state.balance[token] = balance;
    },
    _setToken: (state, value) => {
      state.swap[value.tokenRef] = value.token
    },
  }
}