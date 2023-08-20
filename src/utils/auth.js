import Cookies from 'js-cookie'

/*
cookies和localStorage 都是用来做本地存储的。
区别：
1- cookie 只有4kb，localStorage有5M。
2- 生命周期不一样，localStorage 只要用户不删除就一直存在，cookie可以设置过期时间，如果没有设置过期时间关闭浏览器就会删除
3- cookie中的数据，会自动随着请求传递给服务端，localStorage是不会的。
4- 语法不一样，localStorage语法比较方便简洁。cookie要通过document.cookie来设置和获取
*/

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
