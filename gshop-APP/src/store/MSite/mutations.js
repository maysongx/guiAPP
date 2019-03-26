/*
* 直接更新state的多个方法的对象 注意接收的数据是对象
* */
import {
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPLIST
} from './mutation-types'

export default {
  //获取食物分类信息列表
  [RECEIVE_FOODTYPES](state, {foodtypes}) {
    state.foodtypes = foodtypes;
  },
  //根据经纬度获取商铺列表
  [RECEIVE_SHOPLIST](state, {shoplist}) {
    state.shoplist = shoplist;
  }
}