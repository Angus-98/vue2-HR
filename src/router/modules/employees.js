import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  name: 'employees',
  children: [
    {
      path: 'index',
      component: () => import('@/views/employees/index.vue'),
      meta: { title: '员工', icon: 'people' }
    }
  ]
}
