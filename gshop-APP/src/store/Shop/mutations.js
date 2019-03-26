/*
* 直接更新state的多个方法的对象 注意接收的数据是对象
* */
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-types'

export default {
  //获取商品信息
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  //获取评价信息
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  //获取商家信息
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  }
}