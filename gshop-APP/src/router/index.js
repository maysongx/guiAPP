/*
* 路由器对象模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'

//引入各个路由组件
import MSite from '../pages/MSite/MSite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
//声明使用插件
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: '/msite',
  },
  {
    path: '/msite',
    component: MSite,
    meta:{
      //设置路由对象的参数
      showFooter:true
    }
  },
  {
    path: '/order',
    component: Order,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/search',
    component: Search,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/login',
    component: Login
  },
]

export default new VueRouter({
  mode: 'history',
  //配置所有路由
  routes
})
