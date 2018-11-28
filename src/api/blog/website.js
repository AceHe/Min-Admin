import request from '@/utils/request'

// 
export function websiteConfig(data) {
  return request({
    url: '/api/admin/website',
    method: 'POST',
    data: data
  })
}

export function getWebsite() {
  return request({
    url: '/api/admin/website',
    method: 'GET'
  })
}