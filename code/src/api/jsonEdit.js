import request from '@/utils/request'

// export function fetchList(code) {
//   return request({
//     url: '/data/jsonEdit/jsonEdit',
//     method: 'POST',
//     data: {
//         code
//     }
//   })
// }

export function fetchList(code) {
  return request({
    url: '/view/configuration',
    method: 'GET',
    data: {
        code
    }
  })
}

export function editList(code) {
  return request({
    url: '/view/configuration',
    method: 'PUT',
    data: code
  })
}

