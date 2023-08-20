import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use((config) => {
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

// response interceptor
service.interceptors.response.use((response) => {
  const { data, success, message } = response.data
  // console.log('data ->', data)

  // 数据层面错误处理
  if (success) {
    Message.error(message)
    return data
  } else {
    Message.error(message)
    return Promise.reject(message)
  }
}, (err) => {
  // console.dir(err)

  // 网络层面错误处理
  Message.error(err.message)
  // 返回错误对象给axios，Promise.reject是原生JS的一个方法，会返回一个错误对象。最终调用接口时获取到的结果就是这个错误对象
  return Promise.reject(err)
})

export default service

// 请求的错误，通常有2种。
// 情况1- 数据层面的错误，比如：登录接口的账号密码写错导致的错误（数据层面的错误可以在response成功的回调函数里判断）
// 情况2- 网络层面的错误，比如：登录接口的请求路径写错导致的错误（网络层面的错误可以在response错误的回调函数里处理）
