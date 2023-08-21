import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

const timer = 12 * 60 * 60 * 1000

// request interceptor
service.interceptors.request.use((config) => {
  const token = store.state.user.token
  if (token) {
    // 判断token是否过期
    // 登录时间戳
    const loginTime = localStorage.getItem('loginTime')
    // 当前时间戳
    const curTime = Date.now()
    // 用当前时间戳减去登录的时间戳是否大于规定的过期时间，如果大于则清空token以及用户信息
    if (curTime - loginTime > timer) {
      store.dispatch('user/logout')
      router.push('/login')
      // 请求拦截器中返回的错误，最终在响应拦截器中捕获到
      return Promise.reject(new Error('登录失效 - 前端规定'))
    }
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
    // Message.success(message)
    return data
  } else {
    Message.error(message)
    return Promise.reject(message)
  }
}, (err) => {
  // console.dir(err)
  // token过期处理 --> (注意，并不是所有的错误都有response这个属性，因此需要添加短路运算)
  if (err.response && err.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.warning('token过期-重新登录')
  } else {
    // 网络层面错误处理
    Message.error(err.message)
  }
  // 返回错误对象给axios，Promise.reject是原生JS的一个方法，会返回一个错误对象。最终调用接口时获取到的结果就是这个错误对象
  return Promise.reject(err)
})

export default service

// 请求的错误，通常有2种。
// 情况1- 数据层面的错误，比如：登录接口的账号密码写错导致的错误（数据层面的错误可以在response成功的回调函数里判断）
// 情况2- 网络层面的错误，比如：登录接口的请求路径写错导致的错误（网络层面的错误可以在response错误的回调函数里处理）
