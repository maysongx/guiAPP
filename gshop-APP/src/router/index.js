/*
* 路由器对象模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'

//引入各个路由组件
// import MSite from '../pages/MSite/MSite'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'
// import Search from '../pages/Search/Search'

import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'

// 将一级的路由组件懒加载
const MSite = () => import('../pages/MSite/MSite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')

//声明使用插件
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    redirect: '/msite',
  },
  {
    path: '/msite',
    //当使用了组件懒加载以后，MSite是一个返回路由组件的函数，只有在执行此函数时，才会加载路由组件
    //路由组件函数，会在第一次请求对应的路由路径时，才会执行
    component: MSite,
    meta: {
      //设置路由对象的参数
      showFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: ShopGoods
      },
      {
        path: '/shop/ratings',
        component: ShopRatings
      },
      {
        path: '/shop/info',
        component: ShopInfo
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
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
