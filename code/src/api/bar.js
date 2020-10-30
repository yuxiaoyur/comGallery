import request from '@/utils/request'

export function fetchList(code) {
  return request({
    url: '/data/echart/bar/list',
    method: 'POST',
    data: {
        code
    }
  })
}

export function editList(code) {
  return request({
    url: '/data/echart/bar/list',
    method: 'POST',
    data: {
        code
    }
  })
}

export function fetchJsCode(code) {
  return request({
    url: '/data/echart/bar/jsCode',
    method: 'POST',
    data: {
        code
    }
  })
}

export function fetchJsCodeUtils(code) {
  return request({
    url: '/data/echart/bar/jsCodeUtils',
    method: 'POST',
    data: {
        code
    }
  })
}

