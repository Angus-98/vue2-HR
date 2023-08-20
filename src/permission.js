import router from '@/router/index'
import store from '@/store'

// 获取vuex模块中数据的语法：store.state.模块名.变量名
// beforeEach中三个参数的作用：to（表示去哪里，to跳转的目标路由对象）。from（表示从哪里来，跳转之前（当前）的路由对象）。next（表示放行函数，这个函数必须要调用，没有调用跳转不了页面，官方文档也说过必须调用next方法）

router.beforeEach(async(to, from, next) => {
  // console.log('to->', to, 'form->', from)
  // console.log(store.state.user.token)
  if (store.state.user.token) {
    // 如果有token，表示登录状态，直接放行。当前页面在首页的话，则不能点击回退到登录页
    if (to.path === '/login') {
      next('/')
    } else {
      // 获取用户信息(不加判断的话，会导致点击别的页面也在发请求，所以可以加上判断。如果vuex里面没有数据再去发请求，有数据则不发请求)
      if (!store.state.user.userInfo.userId) {
        await store.dispatch('user/getUserInfo')// 为了确保拿到用户信息在放行，可以使用async/await
      }
      next()
    }
  } else {
    // 判断此时用户跳转的是否为登录页面，如果是则放行，否则跳转到登录页面
    const white = ['/login', '/404']// 白名单，存在这个数组中的路径，可以直接放行
    if (white.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login') // 跳转登录页面的时候，会再次触发导航守卫
    }
  }
})
