import httpInstance from '@/utils/http'

// 獲取banner

export function getBannerAPI() {
  return httpInstance({
    url: '/home/banner'
  })
}

//獲取新鮮好物

export function findNewAPI() {
  return httpInstance({
    url: '/home/new'
  })
}

//獲取人氣推薦

export function findHotAPI() {
  return httpInstance({
    url: '/home/hot'
  })
}
