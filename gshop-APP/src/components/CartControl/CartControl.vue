<template>
  <transition name="move">
    <div class="cartcontrol">
      <div @click.stop="updateFoodCount(false)" v-if="food.count" class="iconfont iconjian"></div>
      <div v-if="food.count" class="cart-count">{{food.count}}</div>
      <div @click.stop="updateFoodCount(true)" class="iconfont iconjia"></div>
    </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  path: 'Cart',
  name: 'CartControl',
  props: {
    food: Object
  },
  methods: {
    //更新 food 的 count
    updateFoodCount(isAdd) {
      const {food} = this
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
