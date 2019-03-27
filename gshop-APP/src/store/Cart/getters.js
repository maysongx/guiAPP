export default {
  //获取购物车中食物的总数量
  totalCount(state) {
    return state.shopCartsList.reduce((preTotal, food) => {
      return preTotal + food.count
    }, 0)
  },
  //计算总价格
  totalPrice(state) {
    return state.shopCartsList.reduce((shopCartsList, food) => {
      return shopCartsList + food.price * food.count
    }, 0)
  }
}