import request from '@/utils/request'
export const getSearchList = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
export const getSearchRes = (page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      q
    }
  })
}
