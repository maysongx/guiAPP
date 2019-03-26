<template>
  <div>ShopInfo--商家列表</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  path: 'Shop',
  name: 'ShopInfo',
  computed: {
    ...mapState('Shop', {
      info: state => state.info,
    })
  },
  mounted() {
    //获取商家信息列表
    this.getShopInfoList()
  },
  methods: {
    ...mapActions('Shop', ['getShopInfoList'])
  }
}
</script>

<style scoped lang='scss'>

</style>
