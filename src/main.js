import { createApp } from 'vue'
import { createPinia } from 'pinia'
//pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//引入懶加載插件
import { lazyPlugin } from '@/directives/index.js'
//引入全局組件插件
import { componentPlugin } from '@/components/index.js'

import App from './App.vue'
import router from './router'

//引入初始化樣式文件
import '@/styles/common.scss'

// 測試接口函數
// import { getCategory } from '@/apis/testAPI'
// getCategory().then((res) => {
//   console.log(res)
// })

const app = createApp(App)
const pinia = createPinia()
//註冊持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')
