import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    async login(store, data) {
      const res = await login(data)
      // console.log('actions - login->', res)
      // 保存token
      store.commit('setToken', res.data.data)
    }
  }
}
