/*
* 通过commit提交，对mutaions 间距更新state的多个方法的对象
* */
import {
  RECEIVE_SHOP_LIST
} from './mutation-types'
import {
  //获取商铺列表 根据  经纬度、关键字
  reqSearchShopList
} from '../../api/index'

export default {
  //根据  经纬度和关键字   获取商铺列表
  async getShopList({commit, rootState}, keyword) {
    const geohash = `${rootState.latitude},${rootState.longitude}`
    const result = await reqSearchShopList(geohash, keyword)
    const shopList = result.data;
    commit(RECEIVE_SHOP_LIST, {shopList})
  }
}