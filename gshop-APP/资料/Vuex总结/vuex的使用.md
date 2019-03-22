# Vuex
* 对 vue 应用中多个组件的 共享状态 进行 集中式的管理(读/写)
* state: 驱动应用的数据源（data数据）
* view: 以声明方式将 state 映射到视图（template视图）
* actions: 响应在 view 上的用户输入导致的状态变化(包含 n 个更新状态的方法)
# 多组件共享状态的弊端
* 多个视图依赖于同一状态
* 来自不同视图的行为需要变更同一状态
* 以前的解决办法
    1. 将数据以及操作数据的行为都定义在父组件
    2. 将数据以及操作数据的行为传递给需要的各个子组件(有可能需要多级传递)
* vuex 就是用来解决这个问题的

# 映射store,一般是在main.js文件中
#### 注意：映射store对象完成以后，所有用 vuex 管理的组件中都多了一个属性 $store, 它就是一个 store 对象
#### 属性如下：
###### state: 注册的 state 对象
##### getters: 注册的 getters 对象
###### 方法：dispatch(actionName, data): 分发调用 action

```js
import store from './store'
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store //映射store对象
})
```

# 介绍
#### 1. state：是vuex管理的状态对象，它应该是唯一的
```
const state={
      myName:'songxia'
}
```
#### 2. mutations
* 包含多个直接更新 state 的方法(回调函数)的对象
* 谁来触发: 由action 中的 commit('mutation 名称')触发
* 只能包含同步的代码, 不能写异步请求
````js
const mutations = {
    reName (state, {newName}) {
         //更新 state 的某个属性 传参是对象的方式
         state.myName=newName
     }
}
````
#### 3. actions
* 包含多个事件回调函数的对象，可以执行异步数据请求
* 通过执行: commit()来触发 mutation 的调用, 间接更新 state
* 谁来触发: 组件中: this.$store.dispatch('updateName', newName)
```js
const actions = {
    updateName({commit, state}, newName) {
      commit('reName', {newName})
    }
}
```
#### 4. getters
* 包含多个计算属性(get)的对象
* 谁来读取: 组件中:this.$store.getters.AAA
```js
const getters = {
  AAA (state) {return 'hello'}
}
```

# 1.下载安装
```
cnpm install --save vuex
```
# 2. 创建store主程序 store目录下面的文件
* index.js：vuex 的核心管理对象 store 对象模块
* state.js：状态对象(驱动应用的数据源，主要是data数据
* mutations.js：直接更新state的多个方法  的对象
* actions.js：通过commit提交，对mutaions 间距更新state的多个方法  的对象
* getters.js：包含多个基于state的getter计算属性  的对象
* mutation-types.js：包含n个mutation的type的名称常量
# 3.注册vuex中的store对象 在main.js中
```
//引入store.js vuex管理对象模块
import store from './store'
new Vue({
store
})
```
# 4. index.js配置
```
/*
* vuex 的核心管理对象 store 对象模块
* */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
```

# 5.state.js文件：主要是存储状态
```
export default {
  latitude: 31.1132571411, // 纬度
  longitude: 121.3820552139, // 经度
  address: {}, // 地址信息对象
  foodtypes: [], // 商品分类
  shoplist: [], //商家列表数组
}
```

# 6. mutationsjs：直接更新state中的状态  注意接收的数据是对象
```
import {
  RECEIVE_ADDRESS
} from './mutation-types'

export default {
  //根据经纬度获取当前位置信息  注意是对象
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  }
}
```
# 7. actions.js：通过commit提交，对mutaions 间接更新state
```
/*
* 通过commit提交，对mutaions 间距更新state的多个方法的对象
* */
import {
  RECEIVE_ADDRESS
} from './mutation-types'
import {
  //根据经纬度获取当前地址信息
  reqAddress
} from '../api/index'

export default {
  //根据经纬度获取当前地址信息
  async getAddress({commit, state}) {
    //发送异步ajax请求
       const result = await reqAddress(state.latitude, state.longitude);
       const address = result.data;
       //提交mutation
       commit(RECEIVE_ADDRESS, {address})
  }
}
```

# 8. 在任意组件中的使用 *.vue
#### 8.1 引入mapState
```
import {mapState,mapGetters,mapActions} from 'vuex'
```
#### 8.2 调用actions中的相应的方法有2中方式
*** 方法一：直接调用: this.$store.dispatch('getAddress')
*** 方法二：先使用mapActions注册，然后再调用  this.getAddress();
#### 方法一： 在mounted钩子函数中 调用 相应 的函数方法
```
  mounted() {
    //获取当前地址信息
    this.$store.dispatch('getAddress')
    //获取食物分类列表
    this.$store.dispatch('getFoodTypes')
  }
```
#### 方法二：先使用mapActions在methods中声明，然后再在在mounted钩子函数中直接调用
```
  //...mapActions(['getAddress','getFoodTypes'])  等同于 this.$store.dispatch('getAddress')
  methods: {
    ...mapActions(['getAddress', 'getFoodTypes'])
  },
  mounted() {
      //根据经纬度获取当前的的地址信息
      this.getAddress();
      //获取食物分类列表
      this.getFoodTypes();
  },
```
#### 8.3 在computed对象中设置mapState/或是mapGetters
```
  //  ...mapState(['address', 'foodtypes']) 等同于this.$store.state.address
  // ...mapGetters(['evenorOdd'])   等同于this.$store.getters.evenorOdd
  computed: {
    ...mapState(['address', 'foodtypes']),
    ...mapGetters(['evenorOdd'])
  }
```
#### 8.4 直接使用数据 {{address.name}}


