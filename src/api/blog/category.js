import request from '@/utils/request'

// 分页获取分类
export function getCategory(data) {
  return request({
    url: '/api/blog/categorybypage',
    method: 'POST',
    data: data
  })
}

// 添加分类
export function addCategory(data) {
  return request({
    url: '/api/blog/category',
    method: 'POST',
    data: data
  })
}

// 删除分类
export function delCategory(data) {
  return request({
    url: '/api/blog/category',
    method: 'DELETE',
    data: data
  })
}

// 修改分类
export function changeCategory(data) {
  return request({
    url: '/api/blog/category',
    method: 'PUT',
    data: data
  })
}