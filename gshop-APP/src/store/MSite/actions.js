/*
* 通过commit提交，对mutaions 间距更新state的多个方法的对象
* */
import {
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPLIST
} from './mutation-types'
import {
  //获取食物分类
  reqFoodTypes,
  //获取商铺列表 根据经纬度
  reqShopList
} from '../../api/index'

export default {
  //获取食物分类
  async getFoodTypes({commit}) {
    const result = await reqFoodTypes()
    const foodtypes = result.data;
    commit(RECEIVE_FOODTYPES, {foodtypes})
  },
  //根据经纬度获取商铺列表
  async getShopList({commit, state}) {
    const result = await reqShopList(state.latitude, state.longitude)
    const shoplist = result.data;
    commit(RECEIVE_SHOPLIST, {shoplist})
  }
}