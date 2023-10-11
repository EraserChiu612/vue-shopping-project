//定義懶加載插件

import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    //懶加載指令邏輯
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el: 指令綁定的元素 img
        //binding:binding.value 指令等於後面綁定的表達式的值
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          //isIntersecting:是否進入可視區域
          if (isIntersecting) {
            //進入可視區域
            el.src = binding.value
            //進入後,停止監聽,釋放內存
            stop()
          }
        })
      }
    })
  }
}
