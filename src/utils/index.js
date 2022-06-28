import dayjs from 'dayjs'
/**
 * @description 从本地获取token
 * @returns {string} token
 */
export const getToken = () => {
  let token = ''
  const userInfo = JSON.parse(localStorage.getItem('userInfo') ?? 'null')
  if (userInfo && userInfo.token) {
    token = `Bearer ${userInfo.token}`
  }
  return token
}
/**
 * @description 格式化时间
 * @param {string} timeString 
 * @returns {string} 
 */
export const formatTime = (timeString, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(timeString).format(format)
}