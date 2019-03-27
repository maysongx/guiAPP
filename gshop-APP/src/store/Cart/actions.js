/*
* 通过commit提交，对mutaions 间距更新state的多个方法的对象
* */
import {
  JIA_FOOD_COUNT,
  JIAN_FOOD_COUNT,
  CLEAT_CART_SHOP
} from './mutation-types'

export default {
  //更新food里面的count
  updateFoodCount({commit}, {food, isAdd}) {
    if (isAdd) {
      //增加count的数量
      commit(JIA_FOOD_COUNT, {food})
    } else {
      //减少count的数量
      commit(JIAN_FOOD_COUNT, {food})
    }
  },
  //清空购物车
  clearCartShopList({commit}) {
    commit(CLEAT_CART_SHOP)
  }
}