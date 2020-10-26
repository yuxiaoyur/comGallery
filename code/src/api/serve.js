import request from '@/utils/request'

export function fetchApiList(params) {
  return request({
    url: '/static/data/serve/apiList.json',
    method: 'get',
    params: params
  })
}

export function fetchTpyList(params) {
    return request({
      url: '/static/data/serve/typList.json',
      method: 'get',
      params: params
    })
  }
