import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    foodtypes: [], // 商品分类
    shoplist: [], //商家列表数组
  },
  actions,
  mutations
}