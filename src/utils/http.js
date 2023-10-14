//axios基礎封裝
import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 10000
})

// axios請求攔截器
httpInstance.interceptors.request.use(
  (config) => {
    // 1.從pinia獲取token數據
    const userStore = useUserStore()
    // 2.按照後端的要求進行token的格式化
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

// axios響應攔截器

httpInstance.interceptors.response.use(
  (res) => res.data,
  // 統一進行錯誤提示
  (e) => {
    const userStore = useUserStore()
    ElMessage({ type: 'warning', message: e.response.data.message })
    //401token失效處理

    if (e.response.status === 401) {
      //1.清除用戶數據
      userStore.clearUserInfo()
      //2.跳轉到登入頁面
      router.push('/login')
    }

    return Promise.reject(e)
  }
)

export default httpInstance
