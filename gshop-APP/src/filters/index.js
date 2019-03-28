/*
* 自定义过滤器模块
* */
// import Vue from 'vue'
// // 使用moment格式化
// import moment from 'moment'
// //使用moment格式化时间戳
// Vue.filter('formatTimestamp', (value, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
//   return moment(value).format(formatStr);
// })

//使用date-fns格式化
import Vue from 'vue'
import format from 'date-fns/format'

Vue.filter('formatTimestamp', (value, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
  return format(value, formatStr);
})