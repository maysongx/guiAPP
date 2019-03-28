import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    shopList: [] //商家列表
  },
  actions,
  mutations
}