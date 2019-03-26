/*
* 直接更新state的多个方法的对象 注意接收的数据是对象
* */
import {
  RECEIVE_ADDRESS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO
} from './mutation-types'

export default {
  //根据经纬度获取当前位置信息
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  //获取用户信息
  [RECEIVE_USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo
  },
  //重置用户信息
  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },
}