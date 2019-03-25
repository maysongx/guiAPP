/*
* 包含多个请求接口的函数模块
* 封装的ajaxRequest接口请求返回值是Promise对象
* */

import ajaxRequest from './ajax'
import {
  POSITION_URL,
  CATEGORY_LIST_URL,
  SHOP_LIST_URL,
  SEARCH_SHOP_LIST_URL,
  CAPTCHA_URL,
  LOGIN_PWD_URL,
  SEND_CODE_URL,
  LOGIN_SMS_URL,
  USERINFO_URL,
  LOGOUT_URL
} from './constUrl'
import ajax from "../../../gshop-client_final/src/api/ajax";
/*
* 1. 根据经纬度获取当前用户的位置详情
* 参数：经度longitude    纬度latitude
* 传参方式是：query
* 实例：http://localhost:4000/position/40.10038,116.36867
* */
export const reqAddress = (latitude, longitude) => ajaxRequest(POSITION_URL + `${latitude},${longitude}`);

//2. 获取食品分类列表  http://localhost:4000/index_category
export const reqFoodTypes = () => ajaxRequest(CATEGORY_LIST_URL);
/*
* 3. 根据经纬度获取附近的商铺列表
* 参数：经度longitude    纬度latitude
* 传参方式是：params
* http://localhost:4000/shops?latitude=40.10038&longitude=116.36867
* */
export const reqShopList = (longitude, latitude) => ajaxRequest(SHOP_LIST_URL, {longitude, latitude});

/*
* 4、根据经纬度和关键字搜索商铺列表
* 参数：经纬度geohash   关键字keyword
* 实例：http://localhost:4000/search_shops?keyword=test&geohash=40.10038,116.36867
* */
export const reqSearchShopList = (geohash, keyword) => ajaxRequest(SEARCH_SHOP_LIST_URL, {geohash, keyword})

/*
* 6、用户名密码登陆
* 参数：用户名name  密码pwd  验证码captcha
* 请求方式：post
* */
export const reqLoginPwd = ({name, pwd, captcha}) => ajaxRequest(LOGIN_PWD_URL, {name, pwd, captcha}, 'post')

/*
* 7、发送短信验证码
* 参数：phone手机号码
* 实例：http://localhost:4000/sendcode?phone=18721639928
* */
export const reqSendCode = phone => ajaxRequest(SEND_CODE_URL, {phone})

/*
* 8、手机号验证码登陆
* 参数：手机号phone  验证码code
* */
export const reqLoginCode = (phone, code) => ajaxRequest(LOGIN_SMS_URL, {phone, code}, 'post')

// 9、根据会话获取用户信息  http://localhost:4000/userinfo
export const reqUserInfo = () => ajaxRequest(USERINFO_URL)

// 10、用户登出   http://localhost:4000/logout
export const reqLoginOut = () => ajaxRequest(LOGOUT_URL)