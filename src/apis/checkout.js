//封裝checkout接口
import request from '@/utils/http'

//獲取結帳詳情
export const getCheckInfoAPI = () => {
  return request({
    url: '/member/order/pre'
  })
}

//創建訂單

export const createOrderAPI = (data) => {
  return request({
    url: '/member/order',
    method: 'POST',
    data
  })
}
