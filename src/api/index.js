import request from '@/utils/request'

export function fetchProductList() {
  return request({
    url: '/product/list',
    method: 'get',
  })
}

export function fetchProductRange(query) {
  return request({
    url: '/product/range',
    method: 'get',
    params: query
  })
}


export function fetchProductAnalyze(query) {
  return request({
    url: '/product/analyze',
    method: 'get',
    params: query
  })
}