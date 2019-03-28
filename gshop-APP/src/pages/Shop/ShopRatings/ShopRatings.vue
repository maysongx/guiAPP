<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家 {{info.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="info.serviceScore" :size="36"/>
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info.foodScore" :size="36"/>
            <span class="score">{{info.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <Split/>
      <div class="ratingselect">
        <div class="rating-type">
          <span @click="setSelectType(2)" class="block positive" :class="{active:selectedTYpe===2}">全部<span
            class="count">{{ratings.length}}</span></span>
          <span @click="setSelectType(0)" class="block positive" :class="{active:selectedTYpe===0}">满意<span
            class="count">{{positiveCount}}</span></span>
          <span @click="setSelectType(1)" class="block negative" :class="{active:selectedTYpe===1}">不满意<span
            class="count">{{ratings.length-positiveCount}}</span></span>
        </div>
        <div class="switch" :class="{on:onlyContent}" @click="toggleOnlyContent">
          <span class="iconfont iconduihao"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <!--评论列表-->
      <div class="rating-wrapper">
        <ul v-if="filterRatings.length">
          <li class="rating-item" v-for="(rating,index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star :score="rating.score" :size="24"/>
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="rating.rateType===0?'iconzan':'icondaozan'"></span>
                <span v-for="(recommend,index2) in rating.recommend" :key="index2" class="item">{{recommend}}</span>
              </div>
              <!--定义了一个过滤器dateString-->
              <div class="time">{{rating.rateTime | dateString}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/*
* ratings评论列表中
* rateType===0表示满意
* rateType===1表示不满意
* rateType===2表示全部（接口里面没有2）
* */
import BScroll from 'better-scroll'
import {mapState, mapActions} from 'vuex'
import Star from '../../../components/Star/Star'

export default {
  path: 'Shop',
  name: 'ShopRatings',
  data() {
    return {
      selectedTYpe: 2,  //默认全部是2  满意0 不满意1
      onlyContent: true,//是否选中只看内容
    }
  },
  components: {
    Star
  },
  computed: {
    ...mapState('Shop', {
      ratings: state => state.ratings,
      info: state => state.info,
    }),
    //计算评价是满意的数量
    positiveCount() {
      return this.ratings.reduce((preTotal, rating) => {
        return preTotal + (rating.rateType === 0 ? 1 : 0)
      }, 0)
    },

    //获取有评论内容的评价
    filterRatings() {
      const ratings = this.ratings
      if (!ratings) {
        return []
      }
      return ratings.filter((rating) => {
        const {selectedTYpe, onlyContent} = this
        const curRateType = rating.rateType
        if (onlyContent) {
          //只看有评论内容的数据
          const ratingLength = rating.text.length
          if (ratingLength > 0) {
            return selectedTYpe === 2 ? rating : curRateType === selectedTYpe
          }
        } else {
          return selectedTYpe === 2 ? rating : curRateType === selectedTYpe
        }
      })
    }
  },
  // 定义了一个过滤器dateString
  filters: {
    dateString: function (value) {
      // return this.formatTimestamp(value)
      return new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
  },
  mounted() {
    //获取评价信息列表
    this.getShopRatingsList().then(() => {
      this.$nextTick(() => {
        //初始化BScroll
        this.initScroll()
      })
    })
  },
  methods: {
    ...mapActions('Shop', ['getShopRatingsList']),
    //设置选中项
    setSelectType(typeValue) {
      this.selectedTYpe = typeValue
    },
    //切换是否只看有评论内容
    toggleOnlyContent() {
      this.onlyContent = !this.onlyContent
    },
    //时间戳格式化函数
    formatTimestamp(timestamp) {
      return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    },
    //初始化BScroll
    initScroll() {
      this.ratingContScroll = new BScroll('.ratings', {
        click: true
      })
    }
  }
}
</script>

<style scoped lang='scss'>
  @import "../../../common/scss/mixins";

  .ratings {
    position: absolute;
    top: 195px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    background: #fff;

    .overview {
      display: flex;
      padding: 18px 0;

      .overview-left {
        flex: 0 0 137px;
        padding: 6px 0;
        width: 137px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        @media screen and (max-width: 320px) {
          flex: 0 0 120px;
          width: 120px;
        }

        .score {
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: rgb(255, 153, 0);
        }

        .title {
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .rank {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }

      .overview-right {
        flex: 1;
        padding: 6px 0 6px 24px;
        @media screen and (max-width: 320px) {
          padding-left: 6px;
        }

        .score-wrapper {
          margin-bottom: 8px;
          font-size: 0;

          .title {
            display: inline-block;
            line-height: 18px;
            vertical-align: top;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }

          .star {
            display: inline-block;
            margin: 0 12px;
            vertical-align: top;
          }

          .score {
            display: inline-block;
            line-height: 18px;
            vertical-align: top;
            font-size: 12px;
            color: rgb(255, 153, 0);
          }
        }

        .delivery-wrapper {
          font-size: 0;

          .title {
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }

          .delivery {
            margin-left: 12px;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }

    .split {
      width: 100%;
      height: 16px;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      background: #f3f5f7;
    }

    .ratingselect {
      .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        //@include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;

        .block {
          display: inline-block;
          padding: 8px 12px;
          margin-right: 8px;
          line-height: 16px;
          border-radius: 1px;
          font-size: 12px;
          color: rgb(77, 85, 93);
          background: rgba(77, 85, 93, 0.2);

          &.active {
            background: $green;
            color: #fff;
          }

          .count {
            margin-left: 2px;
            font-size: 8px;
          }
        }
      }

      .switch {
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: rgb(147, 153, 159);
        font-size: 0;

        &.on {
          .iconduihao {
            color: $green;
          }
        }

        .iconduihao {
          display: inline-block;
          vertical-align: top;
          margin-right: 4px;
          font-size: 24px;
        }

        .text {
          display: inline-block;
          vertical-align: top;
          font-size: 12px;
        }
      }
    }

    .rating-wrapper {
      padding: 0 18px;

      .rating-item {
        display: flex;
        padding: 18px 0;
        @include bottom-border-1px(rgba(7, 17, 27, 0.1));

        .avatar {
          flex: 0 0 28px;
          width: 28px;
          margin-right: 12px;

          img {
            border-radius: 50%;
          }
        }

        .content {
          position: relative;
          flex: 1;

          .name {
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
          }

          .star-wrapper {
            margin-bottom: 6px;
            font-size: 0;

            .star {
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
            }

            .delivery {
              display: inline-block;
              vertical-align: top;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }

          .text {
            margin-bottom: 8px;
            line-height: 18px;
            color: rgb(7, 17, 27);
            font-size: 12px;
          }

          .recommend {
            line-height: 16px;
            font-size: 0;

            .iconzan, .icon-thumb_down, .item {
              display: inline-block;
              margin: 0 8px 4px 0;
              font-size: 9px;
            }

            .iconzan {
              color: $yellow;
            }

            .icon-thumb_down {
              color: rgb(147, 153, 159);
            }

            .item {
              padding: 0 6px;
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
            }
          }

          .time {
            position: absolute;
            top: 0;
            right: 0;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
</style>
