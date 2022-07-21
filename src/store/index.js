import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, getkeyValue, SetkeyValue } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {},
    keyValue: getkeyValue() || {}
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload
      setToken(payload)
    },
    setKeyValue(state, payload) {
      state.keyValue = payload
      SetkeyValue(payload)
    }
  },
  actions: {},
  modules: {}
})
