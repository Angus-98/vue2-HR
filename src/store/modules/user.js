import { login } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      // 数据持久化 -- 将拿到的token放在cookie中
      setToken(token)
    }
  },
  actions: {
    async login(store, data) {
      const res = await login(data)
      // 保存token
      store.commit('setToken', res)
    }
  }
}
