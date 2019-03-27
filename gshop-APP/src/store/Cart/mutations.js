/*
* 直接更新state的多个方法的对象 注意接收的数据是对象
* */
import Vue from 'vue'
import {
  JIA_FOOD_COUNT,
  JIAN_FOOD_COUNT,
  CLEAT_CART_SHOP
} from './mutation-types'

export default {
  /*
* 根据food中count属性判定是否需要新增加一个新的food
* 当isAdd为true时，表示增加
* 如果food里面没有count属性，那么新增一个count，并初始值为1，同时将food添加到shopCartsList中
* 如果food里面有count属性，只是将count属性加1，shopCartsList不做操作
*
* 当isAdd为false时，表示减少
* 首先判断food里面是否有count属性，如果没有，则不做操作
* 如果有，只是将count减少1，同时要判断，如果count为0时，将food从shopCartsList移除
* */
  //增加食物的数量
  [JIA_FOOD_COUNT](state, {food}) {
    if (!food.count) {
      /*
      * 第一次增加时, 没有 count属性，需要自定义
      * 如果是使用food.count=1的方式添加，新添加的属性没有数据劫持==>数据绑定==>更新了数据但界面不变
      * 所以，要使用Vue.set()方式添加(参数：对象，属性名，属性值)
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
  },
  //清空购物车
  [CLEAT_CART_SHOP](state) {
    //将所有count重置为0
    state.shopCartsList.forEach(food => {
      food.count = 0
    })
    state.shopCartsList = []
  }
}