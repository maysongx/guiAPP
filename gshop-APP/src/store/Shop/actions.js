/*
* 通过commit提交，对mutaions 间距更新state的多个方法的对象
* */
import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-types'
import {
  //获取商品信息
  reqGoodList,
  //获取评价信息
  reqRatingsList,
  //获取商家信息
  reqInfoList
} from '../../api/index'

export default {
  //获取商品信息
  async getShopGoodsList({commit}) {
    const result = await reqGoodList();
    const goods = result.data;
    commit(RECEIVE_GOODS, {goods})
  },
  //获取评价信息
  async getShopRatingsList({commit}) {
    const result = await reqRatingsList();
    const ratings = result.data;
    commit(RECEIVE_RATINGS, {ratings})
  },
  //获取商家信息
  async getShopInfoList({commit}) {
    const result = await reqInfoList();
    const info = result.data;
    commit(RECEIVE_INFO, {info})
  }

}