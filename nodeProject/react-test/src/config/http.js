import Axios from 'axios'

/**
 * 首先以创建的实例的方式进行使用，方便后续对业务进行区分
 * @author waldon
 * @date 2022-03-04
 */
export const service = Axios.create({
  // 统一设置默认请求地址
  baseURL: process.env.NODE_ENV === 'production' ? `/` : 'api/',
  // 统一设置请超时时间
  timeout: 60 * 1000,
  // 统一设置请求头
  headers: {
    get: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    post: {
      // 'content-type': 'application/json;charset=utf-8',
    },
  },
  withCredentials: true, // 设置跨域携带cookie
})

/**
 * 请求拦截，
 * - 加上token和版本这些
 * - 对重复请求进行缓存结果处理
 * @author waldon
 * @date 2022-03-04
 * @param {*} config - param
 */
service.interceptors.request.use((config) => {
  let _config = { ...config }
  // if (config.useType === 'upload') {
  //   _config.headers.post['content-type'] = 'multipart/form-data'
  // }
  return {
    _token: 'xxx',
    _version: '20220302',
    ..._config,
  }
})

/**
 * 响应拦截，处理过期登录这些
 * @author waldon
 * @date 2022-03-04
 * @param {*} config - param
 */
service.interceptors.response.use((res) => {
  // TOKEN 过期需要重新登录
  // if (res.rt === -23) {
  // }

  // 对其他响应码进行处理
  // switch (res.rt) {
  // }

  return {
    ...res,
  }
})

// 以上就是基本完整的封装
// 在实际应用中，往往会对post和get再做一层封装，然后解构进行使用
// 然后统一将返回的err和response放在一个数组中进行解构使用
