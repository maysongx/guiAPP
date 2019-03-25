/*
* 通过commit提交，对mutaions 间距更新state的多个方法的对象
* */
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPLIST,
  RECEIVE_USER_INFO,
  RESET_USER_INFO
} from './mutation-types'
import {
  //根据经纬度获取当前地址信息
  reqAddress,
  //获取食物分类
  reqFoodTypes,
  //获取商铺列表 根据经纬度
  reqShopList,
  //获取用户信息
  reqUserInfo,
  //退出登录
  reqLoginOut,
  //手机、验证码登录
  reqLoginCode
} from '../api/index'
import ajaxRequest from "../api/ajax";

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
  },
  //(提交)用户信息  并保存用户信息
  submitUserInfo({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo});
  },
  //获取用户信息，如果code返回值是1，则是错误的返回信息
  async getUserInfo({commit}) {
    const result = await reqUserInfo();
    if (result.code === 0) {
      const userInfo = result.data;
      commit(RECEIVE_USER_INFO, {userInfo});
    }
  },

  //退出登录
  async loginOut({commit}) {
    const result = await reqLoginOut();
    if (result.code === 0) {
      const userInfo = result.data;
      //重置用户信息
      commit(RESET_USER_INFO);
    }
  },

  //手机号、短信验证码登录
  async loginByPhoneCode({commit}, {phone, code}) {
    const result = await reqLoginCode(phone, code);
    const userInfo = result.data;
    commit(RECEIVE_USER_INFO, {userInfo});
  }
}