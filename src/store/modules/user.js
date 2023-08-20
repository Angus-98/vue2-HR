import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      // 数据持久化 -- 将拿到的token放在cookie中
      setToken(token)
      // 保存登录的时间戳。Date.now()是原生js中获取时间戳的方法
      localStorage.setItem('loginTime', Date.now())
    },
    // 保存用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    // 清除token
    removeToken(state) {
      state.token = ''
      removeToken()
    },
    // 清除用户信息
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 获取token
    async login(store, data) {
      const res = await login(data)
      // 保存token
      store.commit('setToken', res)
    },
    // 获取用户基本信息
    async getUserInfo(store) {
      const res = await getUserInfo()
      // console.log('getUserInfo->', res)
      const result = await getUserDetailById(res.userId)
      // console.log('result->', result)
      store.commit('setUserInfo', { ...res, ...result })
    },
    // 退出登录
    logout(store) {
      store.commit('removeToken')
      store.commit('removeUserInfo')
    }
  }
}

/*
* mutations中 只能写同步代码,mutations中的函数默认能接收到一个参数，这个参数就是当前模块中的state这个对象。
* actions中 通常用于写异步代码，也是可以写同步代码的。actions中声明的函数都能默认接收到一个参数。这个参数就相当于store对象（相当于是vuex.store的实例化对象）。
* namespaced 命名空间，表示给该模块加了一道锁，调用该模块的时候就不能直接调用了，而是需要通过模板进行调用。语法: this.$store.dispatch('模块名/函数名',参数)
*/
