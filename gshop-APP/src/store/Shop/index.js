import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state: {
    goods: [], // 商品列表
    ratings: [], // 商家评价列表
    info: {}, // 商家信息
  },
  mutations,
  actions,
};
