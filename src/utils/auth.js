import storage from './storage'
const TOKEN_KEY = 'HeiMa_TouTiao_TOKEN'
const keyValue = 'keyValue'
export const getToken = () => storage.get(TOKEN_KEY)
export const setToken = (token) => storage.set(TOKEN_KEY, token)
export const removeToken = () => storage.remove(TOKEN_KEY)

export const getkeyValue = () => storage.get(keyValue)
export const setkeyValue = (token) => storage.set(keyValue, token)
export const removekeyValue = () => storage.remove(keyValue)
