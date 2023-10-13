import requset from '@/utils/http'

export const getDetail = (id) => {
  return requset({
    url: '/goods',
    params: {
      id
    }
  })
}
