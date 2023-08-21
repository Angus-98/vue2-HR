import Layout from '@/layout'

export default {
  path: '/permission',
  component: Layout,
  name: 'permission',
  children: [
    {
      path: 'index',
      component: () => import('@/views/permission/index.vue'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
