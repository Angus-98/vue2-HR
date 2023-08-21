import Layout from '@/layout'

export default {
  path: '/approvals',
  component: Layout,
  name: 'approvals',
  children: [
    {
      path: 'index',
      component: () => import('@/views/approvals/index.vue'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
