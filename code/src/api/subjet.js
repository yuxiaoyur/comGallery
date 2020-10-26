import request from '@/utils/request'

export function fetchSubList(params) {
  return request({
    url: '/static/data/sub/subList.json',
    method: 'get',
    params: params
  })
}

export function addSubList(params) {
  return request({
    url: '/static/data/sub/addsub.json',
    method: 'get',
    params: params
  })
}
