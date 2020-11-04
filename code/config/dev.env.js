'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:9090"'
  // BASE_API: '"http://172.24.59.40:19000"'
  BASE_API: '"https://api.lishengmao.com/mock/236/libero/"'
  
})
// run dev
