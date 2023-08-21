import Layout from '@/layout'
export default {
  // 组织架构
  path: '/setting',
  component: Layout,
  name: 'settings',
  children: [
    {
      path: 'index',
      component: () => import('@/views/setting/index.vue'),
      // meta：路由元信息，该属性为路由内置属性，它的作用就是用来保存一些数据
      // title 用来渲染侧边栏导航中的标题，icon是标题旁边的图标
      meta: { title: '公司设置', icon: 'setting' }
    }
  ]
}
