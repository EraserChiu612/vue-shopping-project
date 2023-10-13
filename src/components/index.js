// 把components下的所有组件都進行全局註冊(通過插件的形式)

//对components中的所有组件都进行全局化注册
import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'

export const componentPlugin = {
  install(app) {
    // app.component(組件名稱, 組件配置對象)
    app.component('XtxImageView', ImageView)
    app.component('XtxSku', Sku)
  }
}
