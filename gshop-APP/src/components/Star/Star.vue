<template>
  <div class="star" :class="`star-${size}`">
    <span v-for="(item,index) in classStarArray" :key="index" class="star-item" :class="item"></span>
  </div>
</template>

<script>
//类名常量 on half off分别表示整个星、半个星、没有星
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
export default {
  name: 'Star',
  props: {
    score: Number, //表示几颗星
    size: Number //表示图的大小
  },
  computed: {
    classStarArray() {
      /* 评级rating
      * 4==4 0 0
      * 2.4==2 0 3
      * 2.5==2 1 2
      * 2.7==2 1 2
      * */
      const classArray = []
      const {score} = this;
      const intNum = Math.floor(score);  //获取分数的整数

      //向classArray数组中添加n个 on
      for (let n = 0; n < intNum; n++) {
        classArray.push(CLASS_ON)
      }
      //向classArray数组中添加0个或1个 half
      //中间变量 跟5比
      const tempNum = score * 10 - intNum * 10;
      if (tempNum >= 5) {
        classArray.push(CLASS_HALF)
      }

      //向classArray数组中添加5-n-0/1个 off
      //简单的写法
      // while (classArray.length < 5) {
      //   classArray.push(CLASS_OFF)
      // }
      let n = tempNum < 5 ? 0 : 1;
      const offNum = 5 - intNum - n; //off的个数=总数-half的个数
      for (let n = 0; n < offNum; n++) {
        classArray.push(CLASS_OFF)
      }
      return classArray;
    }
  }
}
</script>

<style scoped lang='scss'>
  @import "../../common/scss/mixins";

  .star {
    float: left;
    font-size: 0;

    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }

    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;

        &:last-child {
          margin-right: 0;
        }

        &.on {
          @include bg-image('./images/stars/star48_on');
        }

        &.half {
          @include bg-image('./images/stars/star48_half');
        }

        &.off {
          @include bg-image('./images/stars/star48_off');
        }
      }
    }

    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;

        &:last-child {
          margin-right: 0;
        }

        &.on {
          @include bg-image('./images/stars/star36_on');
        }

        &.half {
          @include bg-image('./images/stars/star36_half');
        }

        &.off {
          @include bg-image('./images/stars/star36_off');
        }
      }
    }

    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;

        &:last-child {
          margin-right: 0;
        }

        &.on {
          @include bg-image('./images/stars/star24_on');
        }

        &.half {
          @include bg-image('./images/stars/star24_half');
        }

        &.off {
          @include bg-image('./images/stars/star24_off');
        }
      }
    }
  }
</style>
