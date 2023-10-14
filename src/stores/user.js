import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'

export const useUserStore = defineStore(
  'user',
  () => {
    //1. 定義管理用戶數據的state
    const userInfo = ref({})
    //2. 定義獲取接口數據的actions
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.result
    }
    // 登出時,清除用戶訊息
    const clearUserInfo = () => {
      userInfo.value = {}
    }

    //3. 以物件格式把state和actions return

    return { userInfo, getUserInfo, clearUserInfo }
  },
  {
    persist: true
  }
)
