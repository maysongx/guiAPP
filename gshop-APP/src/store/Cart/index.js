import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    shopCartsList: [] // 购物车列表
  },
  actions,
  mutations
}