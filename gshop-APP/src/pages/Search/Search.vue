<template>
  <section class="search">
    <HeaderTop title="搜索列表"/>
    <form @submit.prevent="searchInfo" class="search_form">
      <input type="search" v-model="keyword" placeholder="请输入商家或美食名称" class="search_input">
      <input type="submit" class="search_submit">
    </form>
    <section class="list">
      <ul class="list_container" v-if="shopList.length">
        <li class="list_li">
          <section class="item_left">
            <img src="http://cangdu.org:8001/img/16265a70fe27854.jpg"
                 class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>aaa</span>
              </p>
              <p>月售 671 单</p>
              <p>20 元起送 / 距离 1058.2 公里</p>
            </div>
          </section>
        </li>
      </ul>
      <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
    </section>
  </section>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import {Toast} from 'mint-ui'

export default {
  path: 'Search',
  name: 'Search',
  data() {
    return {
      keyword: '',
      emptyResult: false,
      imgBaseUrl: 'http://cangdu.org:8001/img/'
    }
  },
  components: {
    HeaderTop
  },
  computed: {
    ...mapState('Search', {
      shopList: state => state.shopList
    })
  },
  mounted() {
  },
  methods: {
    ...mapActions('Search', (['getShopList'])),
    //根据关键字 搜索商铺
    searchInfo() {
      const keyword = this.keyword.trim()
      if (keyword.length > 0) {
        this.emptyResult = false
        this.getShopList(keyword)
      } else {
        Toast('请先输入您要搜索的关键字!')
        return false
      }
    }
  },
  watch: {
    shopList(val) {
      if (val.status === 0) {
        this.emptyResult = true
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  @import "../../common/scss/mixins";

  .search {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .search_form {
      @include clearFix();
      margin-top: 45px;
      background-color: #fff;
      padding: 12px 8px;

      input {
        height: 35px;
        padding: 0 4px;
        border-radius: 2px;
        font-weight: bold;
        outline: none;

        &.search_input {
          float: left;
          width: 79%;
          border: 4px solid #f2f2f2;
          font-size: 14px;
          color: #333;
          background-color: #f2f2f2;
        }

        &.search_submit {
          float: right;
          width: 18%;
          border: 4px solid #02a774;
          font-size: 16px;
          color: #fff;
          background-color: #02a774;
        }
      }
    }

    .list {
      .list_container {
        background-color: #fff;

        .list_li {
          display: flex;
          justify-content: center;
          padding: 10px;
          border-bottom: 1px solid $bc;

          .item_left {
            margin-right: 10px;

            .restaurant_img {
              width: 50px;
              height: 50px;
              display: block;
            }
          }

          .item_right {
            font-size: 12px;
            flex: 1;

            .item_right_text {
              p {
                line-height: 12px;
                margin-bottom: 6px;

                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }
    }

    .search_none {
      margin: 0 auto;
      color: #333;
      background-color: #fff;
      text-align: center;
      margin-top: 0.125rem;
    }
  }
</style>
