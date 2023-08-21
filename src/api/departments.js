// 部门列表(tree)
import request from '@/utils/request'

export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 新增部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 删除部门
export function delDepartment(id) {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}
// 查询部门详情
export function getDepartmentDetail(id) {
  return request({
    url: '/company/department/' + id
  })
}

// 修改部门详情
export function updateDepartment(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'put',
    data
  })
}
