/*
* 直接更新state的多个方法的对象 注意接收的数据是对象
* */
import {
  RECEIVE_SHOP_LIST
} from './mutation-types'

export default {
  //根据 经纬度和关键字 获取周围的商铺列表
  [RECEIVE_SHOP_LIST](state, {shopList}) {
    state.shopList = shopList;
  }
}