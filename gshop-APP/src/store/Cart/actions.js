/*
* 通过commit提交，对mutaions 间距更新state的多个方法的对象
* */
import {
  JIA_FOOD_COUNT,
  JIAN_FOOD_COUNT
} from './mutation-types'

export default {
  //提交添加的食物列表
  updateFoodCount({commit}, {food, isAdd}) {
    if (isAdd) {
      //增加count的数量
      commit(JIA_FOOD_COUNT, {food})
    } else {
      //减少count的数量
      commit(JIAN_FOOD_COUNT, {food})
    }
  }
}