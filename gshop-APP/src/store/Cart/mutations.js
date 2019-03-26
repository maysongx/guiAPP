/*
* 直接更新state的多个方法的对象 注意接收的数据是对象
* */
import Vue from 'vue'
import {
  JIA_FOOD_COUNT,
  JIAN_FOOD_COUNT
} from './mutation-types'

export default {
  //增加食物的数量
  [JIA_FOOD_COUNT](state, {food}) {
    if (!food.count) {
      /*
      * 第一次增加时, 没有 count属性，需要自定义
      * 如果是使用food.count=1的方式添加，新添加的属性没有数据劫持==>数据绑定==>更新了数据但界面不变
      * 所以，要使用Vue.set()方式添加属性
      * */
      Vue.set(food, 'count', 1) // 给有数据绑定的对象添加指定属性名和值的属性(有绑定)
      state.shopCartsList.push(food) // 添加到购物车
    } else {
      //如果有count
      food.count++
    }
  },
  //减少数量
  [JIAN_FOOD_COUNT](state, {food}) {
    //如果有count属性，才减少1
    if (food.count) {
      food.count--
      if (food.count === 0) {
        // 如果数量减为 0, 从购物车中移除
        state.shopCartsList.splice(state.shopCartsList.indexOf(food), 1)
      }
    }
  }
}