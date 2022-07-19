import request from '@/utils/request'
export const getSearchList = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
