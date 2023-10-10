//axios基礎封裝
import axios from 'axios'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 50000
})

// axios請求攔截器

httpInstance.interceptors.request.use(
  (config) => config,
  (e) => Promise.reject(e)
)

// axios響應攔截器

httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => Promise.reject(e)
)

export default httpInstance
