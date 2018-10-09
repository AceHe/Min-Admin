import request from '@/utils/request'

// 获取全部文章
export function getArticles() {
  return request({
    url: '/blog/article',
    method: 'GET'
  })
}

// 获取指定文章
export function getArticlesById(data) {
  return request({
    url: '/blog/article/id',
    method: 'POST',
    data: data
  })
}

// 添加文章
export function addArticles(data) {
  return request({
    url: '/blog/article',
    method: 'POST',
    data: data
  })
}

// 删除文章
export function delArticles(data) {
  return request({
    url: '/blog/article',
    method: 'DELETE',
    data: data
  })
}

// 修改文章
export function changeArticles(data) {
  return request({
    url: '/blog/article',
    method: 'PUT',
    data: data
  })
}