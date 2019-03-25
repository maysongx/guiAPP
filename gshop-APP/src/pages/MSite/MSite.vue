<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link to="/search" slot="left" class="header_search">
        <i style="font-size: 26px;color: #fff;" class="iconfont iconsearch"></i>
      </router-link>
      <!--登录-->
      <router-link :to="userInfo._id ? '/profile':'/login'" slot="right" class="header_login">
        <span v-if="!userInfo._id" class="header_login_text">登录|注册</span>
        <span v-else class="header_login_text">
          <i class="iconfont iconperson"></i>
        </span>
      </router-link>
    </HeaderTop>
    首页导航
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodtypes.length">
        <div class="swiper-wrapper">
          <div v-for="(item,index) in foodTypesArray" :key="index" class="swiper-slide">
            <a v-for="(perItem,index2) in item" :key="index2" href="javascript:" class="link_to_food">
              <div class="food_container">
                <img :src="imgBaseUrl+perItem.image_url">
              </div>
              <span>{{perItem.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" v-else alt="">
    </nav>
    <!--附近商家列表-->
    <div class="shop_list">
      <div class="shop_header">
        <i class="iconfont iconxuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'
import Login from '../../pages/Login/Login'

export default {
  name: 'MSite',
  components: {
    HeaderTop,
    ShopList,
    Login
  },
  data() {
    return {
      imgBaseUrl: 'https://fuss10.elemecdn.com'
    }
  },
  computed: {
    ...mapState(['address', 'foodtypes', 'userInfo']),
    //根据foodtypes一维数组生成一个2维数组  小数组中的元素个数最大是8
    foodTypesArray() {
      const {foodtypes} = this
      // 准备空的2维数组
      const arr = []
      // 准备一个小数组(最大长度为8)
      let minArr = []
      // 遍历foodtypes
      foodtypes.forEach(c => {
        // 如果当前小数组已经满了, 创建一个新的
        if (minArr.length === 8) {
          minArr = []
        }
        // 如果minArr是空的, 将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        // 将当前分类保存到小数组中
        minArr.push(c)
      })
      return arr
    }
  },
  watch: {
    //监控foodtypes
    foodtypes(value) {
      //当数组中有数据的时候，但是此时数据是在虚拟内存中，界面还没有更新显示
      //界面更新就立即创建Swiper对象
      this.$nextTick(() => { //一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
        //创建一个swiper实例（），实现轮播
        var mySwiper = new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      })
    }
  },
  mounted() {
    //获取食物分类列表
    this.getFoodTypes();
  },
  methods: {
    ...mapActions(['getFoodTypes'])
  }
}
</script>

<style scoped lang='scss'>
  @import "../../common/scss/mixins";

  .msite {
    width: 100%;

    .msite_nav {
      @include bottom-border-1px(#e4e4e4);
      margin-top: 45px;
      height: 200px;
      background: #fff;

      .swiper-container {
        width: 100%;
        height: 100%;

        .swiper-wrapper {
          width: 100%;
          height: 100%;

          .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;

            .link_to_food {
              width: 25%;

              .food_container {
                display: block;
                width: 100%;
                text-align: center;
                padding-bottom: 10px;
                font-size: 0;

                img {
                  display: inline-block;
                  width: 50px;
                  height: 50px;
                }
              }

              span {
                display: block;
                width: 100%;
                text-align: center;
                font-size: 13px;
                color: #666;
              }
            }
          }
        }

        .swiper-pagination {
          > span.swiper-pagination-bullet-active {
            background: #02a774;
          }
        }
      }
    }

    .shop_list {
      @include top-border-1px(#e4e4e4);
      margin-top: 10px;
      background: #fff;

      .shop_header {
        padding: 10px 10px 0;

        .shop_icon {
          margin-left: 5px;
          color: #999;
        }

        .shop_header_title {
          color: #999;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
</style>
