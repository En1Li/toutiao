import request from '@/utils/request'
import storage from '@/utils/storage'
export const getChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
export const delMychannel = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${target}`
  })
}
export const addMychannel = (id, seq) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [{ id, seq }]
    }
  })
}
const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'
export const getMyChannelByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)
export const setMyChannelToLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
