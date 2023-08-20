/* this.$store.state.模块名.变量名称
* getters 也是用于声明变量的地方
* 它的使用场景：就是简化模块中变量的读取
* 语法:{
*     变量名:function(state) {
*       return state.模块名.变量名
    }
* }
*
*/

const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.userInfo.staffPhoto,
  name: (state) => state.user.userInfo.username // 等价于下面的写法

  // name: function(state) {
  //   return state.user.userInfo.username
  // }
}
export default getters
