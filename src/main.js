import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useIntersectionObserver } from '@vueuse/core'
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

app.use(createPinia())
app.use(router)

app.mount('#app')

//定義全局(自訂)指令
app.directive('img-lazy', {
  mounted(el, binding) {
    // el: 指令綁定的元素 img
    //binding:binding.value 指令等於後面綁定的表達式的值
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      //isIntersecting:是否進入可視區域
      if (isIntersecting) {
        //進入可視區域
        el.src = binding.value
      }
    })
  }
})
