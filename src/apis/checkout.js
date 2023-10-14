//封裝checkout接口
import request from '@/utils/http'

//獲取結帳詳情
export const getCheckInfoAPI = () => {
  return request({
    url: '/member/order/pre'
  })
}
