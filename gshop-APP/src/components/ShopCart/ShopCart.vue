<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div @click="toggleShow" class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount>0}">
              <i class="iconfont icongouwuche" :class="{highlight:totalCount>0}"></i>
            </div>
            <div v-if="totalCount" class="num">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}} 元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="isPayClass">{{payText}}</div>
        </div>
      </div>
      <!--购物车列表-->
      <transition name="move">
        <div v-show="isShow" class="shopcart-list">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span @click="clearShopCart" class="empty">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li v-for="(food,index) in shopCartsList" :key="index" class="food">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="toggleShow" v-show="isShow"></div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {mapState, mapGetters, mapActions} from 'vuex'
import {MessageBox, Toast} from 'mint-ui'
import CartControl from '../../components/CartControl/CartControl'

export default {
  path: 'Cart',
  name: 'ShopCart',
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapState('Cart', {
      shopCartsList: state => state.shopCartsList
    }),
    ...mapState('Shop', {
      info: state => state.info
    }),
    ...mapGetters('Cart', ['totalCount', 'totalPrice']),
    //是否显示enough/not-enough
    isPayClass() {
      const minPrice = this.info.minPrice
      const {totalPrice} = this
      return totalPrice >= minPrice ? 'enough' : 'not-enough'
    },
    //去结算  还差0元起送 的文本展示
    payText() {
      const minPrice = this.info.minPrice
      const {totalPrice} = this
      if (totalPrice === 0) {
        return `${minPrice}元起送`
      } else if (totalPrice < minPrice) {
        return `还差${Math.abs(totalPrice - minPrice)}元起送`
      } else {
        return '去结算'
      }
    }
  },
  watch: {
    isShow() {
      //如果总数是0，那么直接返回false
      if (this.totalCount === 0) {
        return false
      } else {
        //如果是展开，就立即加载BScroll
        this.$nextTick(() => {
          /*
          * 在界面更新后创建 BScroll(只能创建一个)
          * 1. 单例：在创建前, 判断是否存在,只有不存在, 才去创建
          * 2. 单例：创建后, 保存它
          * 3. 如果存在scroll对象，就refresh()
          * */
          if (!this.shopCartListScroll) {
            this.shopCartListScroll = new BScroll('.list-content', {
              click: true
            })
          } else {
            //让滚动条刷新：重新统计内容的高度
            this.shopCartListScroll.refresh()
          }
        })
        return true
      }
    },
    totalCount() {
      if (this.totalCount === 0) {
        this.isShow = false
      }
    }
  },
  components: {CartControl},
  mounted() {
    // this.listContentScroll = new l('.list-content', {
    //   click: true //响应点击
    // })
  },
  methods: {
    ...mapActions('Cart', ['clearCartShopList']),
    //是否显示购物车
    toggleShow() {
      if (this.totalCount > 0) {
        this.isShow = !this.isShow
      }
    },
    //清空购物车
    clearShopCart() {
      MessageBox.confirm('您确定要清空购物车吗>').then(
        action => {
          this.clearCartShopList()
          Toast('清空成功')
          this.isShow = false
        },
        action => {
          Toast('取消清空购物车')
        }
      )
    }
  }
}
</script>

<style scoped lang='scss'>
  @import "../../common/scss/mixins";

  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;

    .content {
      display: flex;
      background: #141d27;
      font-size: 0;
      color: rgba(255, 255, 255, 0.4);

      .content-left {
        flex: 1;

        .logo-wrapper {
          display: inline-block;
          vertical-align: top;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          background: #141d27;

          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background: #2b343c;

            &.highlight {
              background: $green;
            }

            .icongouwuche {
              line-height: 44px;
              font-size: 24px;
              color: #80858a;

              &.highlight {
                color: #fff;
              }
            }
          }

          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #ffffff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }

        .price {
          display: inline-block;
          vertical-align: top;
          margin-top: 5px;
          line-height: 24px;
          padding-right: 12px;
          box-sizing: border-box;
          font-size: 16px;
          font-weight: 700;
          color: #fff;

          &.highlight {
            color: red;
          }
        }

        .desc {
          display: inline-block;
          vertical-align: bottom;
          margin-bottom: 15px;
          margin-left: -45px;
          font-size: 10px;
        }
      }

      .content-right {
        flex: 0 0 105px;
        width: 105px;

        .pay {
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;

          &.not-enough {
            background: #2b333b;
          }

          &.enough {
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }

    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: $green;
          transition: all 0.4s linear;
        }
      }
    }

    .shopcart-list {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transform: translateY(-100%);

      &.move-enter-active, &.move-leave-active {
        transition: transform 0.3s;
      }

      &.move-enter, &.move-leave-to {
        transform: translateY(0);
      }

      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }

      .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;

        .food {
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          @include bottom-border-1px(rgba(7, 17, 27, 0.1));

          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }

          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }

          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }

  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(7, 17, 27, 0.6);

    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.5s;
    }

    &.fade-enter, &.fade-leave-to {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
  }
</style>
