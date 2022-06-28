import { BASE_URL } from "../config"

/**
 * @description ContentType 映射表
 */
const ContentType = {
  json: 'application/json;charset=UTF-8', // json数据格式
  form: 'application/x-www-form-urlencoded; charset=UTF-8', // 表单数据格式
  download: 'application/octet-stream' // 二进制文件流格式，用于download
}

/**
 * config 自定义配置项
 * @param withoutCheck 不使用默认的接口状态校验，直接返回 response
 * @param returnOrigin 是否返回整个 response 对象，为 false 只返回 response.data
 * @param showError 全局错误时，是否使用统一的报错方式
 * @param canEmpty 传输参数是否可以为空
 * @param mock 是否使用 mock 服务
 * @param timeout 接口请求超时时间，默认10秒
 */
const configDefault = {
  headers: {
    'Content-Type': ContentType.json
  },
  // mode:'cors',
  timeout: 10000
}

/**
 * 
 * @param url 请求地址
 * @param options 配置
 * @returns [请求，控制器]
 */
export async function fetchWithTimeout (url, options = {}) {
  options = { ...configDefault, ...options }
  const { timeout } = options
  const controller = new AbortController()
  let timer
  const request = Promise.race([
    new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        controller.abort()
        reject('network time out')
      }, timeout)
    }),
    fetch(`${BASE_URL}${url}`, {
      ...options,
      signal: controller.signal
    }).then(res => res.json())
  ])
  clearTimeout(timer)
  return [request, controller]
}

//get请求封装
export const get = async function (url, params) {
  let fullUrl = url
  if (params) {
    let list = []
    for (let key in params) {
      const value = params[key]
      if (value) {
        list.push(`${key}=${value}`)
      }
    }
    const data = list.join('&')
    fullUrl = fullUrl + `?${data}`
  }
  const [request] = await fetchWithTimeout(fullUrl)
  return request
}

// delete请求封装
export const del = async function (url, params) {
  let fullUrl = url
  if (params) {
    let list = []
    for (let key in params) {
      const value = params[key]
      if (value) {
        list.push(`${key}=${value}`)
      }
    }
    const data = list.join('&')
    fullUrl = fullUrl + `?${data}`
  }
  const [request] = await fetchWithTimeout(fullUrl, {
    method: 'DELETE'
  })
  return request
}
// post请求封装
export const post = async function (url, params) {
  const [request] = await fetchWithTimeout(url, {
    body: JSON.stringify(params),
    method: 'POST',
  })
  return request
}
// put请求封装
export const put = async function (url, params) {
  const [request] = await fetchWithTimeout(url, {
    body: JSON.stringify(params),
    method: 'PUT',
  })
  return request
}