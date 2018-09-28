import request from '@/utils/request'

// 获取分类
export function getArticles() {
  return request({
    url: '/blog/article',
    method: 'GET'
  })
}

// 添加分类
export function addArticles(cate) {
  return request({
    url: '/blog/Articles',
    method: 'POST',
    data: {
      Articles: cate,
    }
  })
}

// 删除分类
export function delArticles(cate) {
  return request({
    url: '/blog/Articles',
    method: 'DELETE',
    data: {
      Articles: cate,
    }
  })
}

// 修改分类
export function changeArticles(oldc, newc) {
  return request({
    url: '/blog/Articles',
    method: 'PUT',
    data: {
      oldcate: oldc,
      newcate: newc,
    }
  })
}