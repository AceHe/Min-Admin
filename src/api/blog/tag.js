import request from '@/utils/request'

// 分页获取标签
export function getTags(data) {
  return request({
    url: '/api/admin/tagbypage',
    method: 'POST',
    data: data
  })
}

// 添加标签
export function addTags(data) {
  return request({
    url: '/api/admin/tag',
    method: 'POST',
    data: data
  })
}

// 删除标签
export function delTags(data) {
  return request({
    url: '/api/admin/tag',
    method: 'DELETE',
    data: data
  })
}

// 修改标签
export function changeTags(data) {
  return request({
    url: '/api/admin/tag',
    method: 'PUT',
    data: data
  })
}