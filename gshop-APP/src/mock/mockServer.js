/*
* 使用Mockjs提供mock数据接口
* 这个模块不需要向外暴露任何东西，只要保证可以正常执行就可以了(在main.js中直接引入就可以的)
* */
import Mock from 'mockjs'
import data from './data'
//返回商品列表的接口
Mock.mock('/goodsList', {code: 0, data: data.goods})
//返回评价列表的接口
Mock.mock('/ratingsList', {code: 0, data: data.ratings})
//返回商家信息列表的接口
Mock.mock('/infoList', {code: 0, data: data.info})
