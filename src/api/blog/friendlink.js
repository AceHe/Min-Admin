import request from '@/utils/request'

// 
export function setFrinedLink(data) {
  return request({
    url: '/api/admin/friendlink',
    method: 'POST',
    data: data
  })
}

export function getFrinedLink(data) {
  return request({
    url: '/api/admin/friendlinkbypage',
    method: 'POST',
    data: data
  })
}

export function delFrinedLink(data) {
  return request({
    url: '/api/admin/friendlink',
    method: 'DELETE',
    data: data
  })
}

export function changeFrinedLink(data) {
  return request({
    url: '/api/admin/friendlink',
    method: 'PUT',
    data: data
  })
}