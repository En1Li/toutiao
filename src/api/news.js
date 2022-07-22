import request from '@/utils/request'
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
export const getArticleInfo = (articleid) => {
  return request({
    url: `/v1_0/articles/${articleid}`
  })
}
// 对文章进行点赞
export const dianzanArticle = (id) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: id
    }
  })
}
// 对文章取消点赞
export const removeDianzan = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${id}`
  })
}

// 收藏文章
export const shoucangArticle = (id) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: id
    }
  })
}

// 取消对文章的收藏
export const removeShoucang = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${id}`
  })
}
