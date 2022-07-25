import request from '@/utils/request'
import store from '@/store'
/**
 *
 * @param {String} mobile
 * @param {String} code
 * @returns promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
// 关注用户
export const following = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注用户
export const removeFollow = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

// 获取用户个人资料
export const getPersonInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 编辑用户个人资料
export const editPersonInfo = (name, gender, birthday) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data: {
      name,
      gender,
      birthday
    }
  })
}

// 编辑用户照片资料
export const changePersonImg = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
