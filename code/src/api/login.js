import request from '@/utils/request'
import utils from '@/utils/ctUtils'

export function login(username, password) {
  return request({
    url: '/data/login/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/data/login/info',
    method: 'POST',
  })
}

export function logout() {
  return request({
    url: '/data/login/logout',
    method: 'get'
  })
}


