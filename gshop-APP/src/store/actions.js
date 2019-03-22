/*
* 通过commit提交，对mutaions 间距更新state的多个方法的对象
* */
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPLIST
} from './mutation-types'
import {
  //根据经纬度获取当前地址信息
  reqAddress,
  //获取食物分类
  reqFoodTypes,
  //获取商铺列表 根据经纬度
  reqShopList
} from '../api/index'

export default {
  //根据经纬度获取当前地址信息
  async getAddress({commit, state}) {
    //发送异步ajax请求
    const result = await reqAddress(state.latitude, state.longitude);
    const address = result.data;
    //提交mutation
    commit(RECEIVE_ADDRESS, {address})
  },
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