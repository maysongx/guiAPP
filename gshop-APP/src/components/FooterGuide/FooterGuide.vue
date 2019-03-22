<!--功能描述
1. 通过编程式导航实现路由的切换显示($router)；或者是通过router-link设置导航切换
2. 通过动态 class 和$route.path 来实现 tab 样式切换
3. 通过阿里图标库, 显示导航图标
-->
<template>
  <footer class="footer_guide">
    <router-link to="/msite" class="guide_item" :class="{on:isCurrent('/msite')}">
      <span class="item_icon"><i class="iconfont iconu"></i></span>
      <span>外卖</span>
    </router-link>
    <router-link to="/search" class="guide_item" :class="{on:isCurrent('/search')}">
      <span class="item_icon"><i class="iconfont iconsearch"></i></span>
      <span>搜索</span>
    </router-link>
    <a @click="goto('/order')" class="guide_item" :class="{on:isCurrent('/order')}">
      <span class="item_icon"><i class="iconfont icondingdan"></i></span>
      <span>订单</span>
    </a>
    <a @click="goto('/profile')" class="guide_item" :class="{on:isCurrent('/profile')}">
      <span class="item_icon"><i class="iconfont iconwode1"></i></span>
      <span>我的</span>
    </a>
  </footer>
</template>

<script>
export default {
  name: 'FooterGuide',
  methods: {
    //跳转路由
    goto(path) {
      this.$router.push(path);
    },
    //判断是否是当前页
    isCurrent(path) {
      return this.$route.path === path;
    }
  }
}
</script>

<style scoped lang='scss'>
  @import "../../common/scss/mixins";

  .footer_guide {
    @include top-border-1px(#e4e4e4);
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    height: 50px;
    display: flex;

    .guide_item {
      display: flex;
      flex: 1;
      text-align: center;
      flex-direction: column;
      align-items: center;
      margin: 5px;
      color: #999999;

      &.on {
        color: #02a774;
      }

      span {
        font-size: 12px;
        margin-top: 2px;
        margin-bottom: 2px;

        .iconfont {
          font-size: 22px;
        }
      }
    }
  }

</style>