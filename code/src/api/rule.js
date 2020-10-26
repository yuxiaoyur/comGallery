import request from '@/utils/request'

export function fetchPeoList(params) {
  return request({
    url: '/static/data/rule/peopleList.json',
    method: 'get',
    params: params
  })
}

export function addPeoList(params) {
  return request({
    url: '/static/data/rule/addpeople.json',
    method: 'get',
    params: params
  })
}

export function fetchMemoList(params) {
    return request({
      url: '/static/data/rule/memoList.json',
      method: 'get',
      params: params
    })
}

