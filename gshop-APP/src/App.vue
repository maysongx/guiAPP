<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide'

export default {
  name: 'App',
  components: {FooterGuide},
  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  },
  mounted() {
    //请求调用获取当前地址信息
    this.getAddress()
    //获取用户信息
    this.getUserInfo()
  }
}
</script>

<style scoped lang="scss">
  #app {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    position: relative;
  }
</style>
