//axios基礎封裝
import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 10000
})

// axios請求攔截器

httpInstance.interceptors.request.use(
  (config) => config,
  (e) => Promise.reject(e)
)

// axios響應攔截器

httpInstance.interceptors.response.use(
  (res) => res.data,
  // 統一進行錯誤提示
  (e) => {
    ElMessage({ type: 'warning', message: e.response.data.message })
    return Promise.reject(e)
  }
)

export default httpInstance
