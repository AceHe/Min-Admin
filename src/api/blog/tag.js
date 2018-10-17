import request from '@/utils/request'

// 分页获取标签
export function getTags(data) {
  return request({
    url: '/api/blog/tagbypage',
    method: 'POST',
    data: data
  })
}

// 添加标签
export function addTags(data) {
  return request({
    url: '/api/blog/tag',
    method: 'POST',
    data: data
  })
}

// 删除标签
export function delTags(data) {
  return request({
    url: '/api/blog/tag',
    method: 'DELETE',
    data: data
  })
}

// 修改标签
export function changeTags(data) {
  return request({
    url: '/api/blog/tag',
    method: 'PUT',
    data: data
  })
}