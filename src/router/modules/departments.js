import Layout from '@/layout'

export default {
  path: '/departments',
  component: Layout,
  name: 'departments',
  children: [
    {
      path: 'index',
      component: () => import('@/views/departments/index.vue'),
      meta: { title: '组织解构', icon: 'tree' }
    }
  ]
}
