/*
* vuex 的核心管理对象 store 对象模块
* */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
//引入局部模块的store
import Shop from './Shop/index'
import MSite from './MSite/index'
import Cart from './Cart/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Shop,
    MSite,
    Cart
  },
  state,
  mutations,
  actions,
  getters
})