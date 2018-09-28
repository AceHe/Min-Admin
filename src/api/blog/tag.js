import request from '@/utils/request'

// 获取标签
export function getTags() {
  return request({
    url: '/blog/tag',
    method: 'GET'
  })
}

// 添加标签
export function addTags(data) {
  return request({
    url: '/blog/tag',
    method: 'POST',
    data: data
  })
}

// 删除标签
export function delTags(data) {
  return request({
    url: '/blog/tag',
    method: 'DELETE',
    data: data
  })
}

// 修改标签
export function changeTags(data) {
  return request({
    url: '/blog/tag',
    method: 'PUT',
    data: data
  })
}