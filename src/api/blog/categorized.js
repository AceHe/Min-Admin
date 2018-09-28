import request from '@/utils/request'

// 获取分类
export function getCategorized() {
  return request({
    url: '/blog/categorized',
    method: 'GET'
  })
}

// 添加分类
export function addCategorized(cate) {
  return request({
    url: '/blog/categorized',
    method: 'POST',
    data: {
      categorized: cate,
    }
  })
}

// 删除分类
export function delCategorized(cate) {
  return request({
    url: '/blog/categorized',
    method: 'DELETE',
    data: {
      categorized: cate,
    }
  })
}

// 修改分类
export function changeCategorized(oldc, newc) {
  return request({
    url: '/blog/categorized',
    method: 'PUT',
    data: {
      oldcate: oldc,
      newcate: newc,
    }
  })
}