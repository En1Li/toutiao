import request from '@/utils/request'
// 获取文章的评论或文章的回复评论
export const getArticleComment = (type, id) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source: id
    }
  })
}
// 对文章进行评论或对评论进行回复
export const commentArticle = (id, content, artid) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data: {
      target: id,
      content,
      art_id: artid
    }
  })
}

// 对评论或评论回复点赞
export const dianzanComment = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消对评论或评论回复点赞
export const removeDianzanComment = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}
