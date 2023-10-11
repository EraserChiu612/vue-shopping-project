import httpInstance from '@/utils/http'

// 獲取banner

export function getBannerAPI(params = {}) {
  //默認參數1 , 商品為2
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
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

export function getGoodsAPI() {
  return httpInstance({
    url: '/home/goods'
  })
}
