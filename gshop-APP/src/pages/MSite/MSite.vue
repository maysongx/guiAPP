<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link to="/search" slot="left" class="header_search">
        <i style="font-size: 26px;color: #fff;" class="iconfont iconsearch"></i>
      </router-link>
      <!--登录-->
      <router-link to="/login" slot="right" class="header_login">
        <span class="header_login_text">登录|注册</span>
      </router-link>
    </HeaderTop>
    首页导航
    <nav class="msite_nav">
      <div class="swiper-container">
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
    ...mapState(['address', 'foodtypes']),

    //将食物分类列表分为2个数组
    foodTypesArray() {
      const max = 8;
      const {foodtypes} = this;
      let smallArr1 = [];
      let smallArr2 = [];
      foodtypes.forEach((food, index) => {
        if (index < max) {
          smallArr1.push(food)
        } else {
          smallArr2.push(food)
        }
      })
      const NewArr = [smallArr1, smallArr2]
      return NewArr;
    }
  },
  mounted() {
    //创建一个swiper实例，实现轮播
    var mySwiper = new Swiper('.swiper-container', {
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
    })
    //根据经纬度获取当前的的地址信息
    this.getAddress();
    //获取食物分类列表
    this.getFoodTypes();
  },
  methods: {
    ...mapActions(['getAddress', 'getFoodTypes'])
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
