import Layout from '@/layout'

export default {
  path: '/salarys',
  component: Layout,
  name: 'salarys',
  children: [
    {
      path: 'index',
      component: () => import('@/views/salarys/index.vue'),
      meta: { title: '工资', icon: 'money' }
    }
  ]
}
