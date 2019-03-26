<template>
  <div>ShopRatings组件--评价列表</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  path: 'Shop',
  name: 'ShopRatings',
  computed: {
    ...mapState('Shop', {
      ratings: state => state.ratings,
    })
  },
  mounted() {
    //获取评价信息列表
    this.getShopRatingsList()
  },
  methods: {
    ...mapActions('Shop', ['getShopRatingsList'])
  }
}
</script>

<style scoped lang='scss'>

</style>
