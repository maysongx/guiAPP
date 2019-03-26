<template>
  <div class="cartcontrol">
    <div @click.stop="updateFoodCount(false)" v-if="food.count" class="iconfont iconjian"></div>
    <div v-if="food.count" class="cart-count">{{food.count}}</div>
    <div @click.stop="updateFoodCount(true)" class="iconfont iconjia"></div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  path: 'Cart',
  name: 'CartControl',
  props: {
    food: Object
  },
  computed: {
    ...mapState('Cart', {
      shopCartsList: state => state.shopCartsList
    })
  },
  methods: {
    //更新 food 的 count
    updateFoodCount(isAdd) {
      const {food} = this
      /*
      * 根据food中count属性判定是否需要新增加一个新的food
      * 当isAdd为true时，表示增加
      * 如果food里面没有count属性，那么新增一个count，并初始值为1，同时将food添加到shopCartsList中
      * 如果food里面有count属性，只是将count属性加1，shopCartsList不做操作
      *
      * 当isAdd为false时，表示减少
      * 首先判断food里面是否有count属性，如果没有，则不做操作
      * 如果有，只是将count减少1，同时要判断，如果count为0时，将food从shopCartsList移除
      * */
      this.$store.dispatch('Cart/updateFoodCount', {food, isAdd})
    }
  }
}
</script>

<style scoped lang='scss'>
  @import "../../common/scss/mixins";

  .cartcontrol {
    font-size: 0;

    .cart-decrease {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }

    .iconjian {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 18px;
      color: $green;

      &.move-enter-active, &.move-leave-active {
        transition: all 0.3s;
      }

      &.move-enter, &.move-leave-to {
        opacity: 0;
        transform: translateX(15px) rotate(180deg);
      }
    }

    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }

    .iconjia {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 18px;
      color: $green;
    }
  }

</style>
