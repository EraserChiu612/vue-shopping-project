import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore(
  'user',
  () => {
    const cartStore = useCartStore()
    //1. 定義管理用戶數據的state
    const userInfo = ref({})
    //2. 定義獲取接口數據的actions
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.result
      //合併購物車的操作
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }
        })
      )
      cartStore.updateNewList()
    }
    // 登出時,清除用戶訊息
    const clearUserInfo = () => {
      userInfo.value = {}
      //執行清除購物車列表的操作
      cartStore.clearCart()
    }

    //3. 以物件格式把state和actions return

    return { userInfo, getUserInfo, clearUserInfo }
  },
  {
    persist: true
  }
)
