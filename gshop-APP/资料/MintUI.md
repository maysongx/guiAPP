# 1. 下载安装
```
cnpm install --save mint-ui
```
# 2. 按需引入  样式会自动打包的
```
cnpm install babel-plugin-component -D
```
# 3. .babelrc配置
```
 "plugins": [
    [
      "component",
      [
        {
          "libraryName": "mint-ui",
          "style": true
        }
      ]
    ]
  ]
```
# 4. 引入使用并注册声明
```
import {Button} from 'mint-ui'
//注册全局标签组件 Button
Vue.component(Button.name, Button)  //<mt-button>
```
