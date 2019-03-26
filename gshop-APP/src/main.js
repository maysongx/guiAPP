import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'
//使用mint-ui组件库
import {Button} from 'mint-ui'
//加载mockSerrver.js模块
import './mock/mockServer'

Vue.config.productionTip = false

//注册全局标签组件 Button
Vue.component(Button.name, Button)  //<mt-button>

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
