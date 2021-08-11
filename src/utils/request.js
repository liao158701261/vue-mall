import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { getToken } from 'utils'
import { Toast } from 'vant'
import router from '../router'
const vm = new Vue()

// 定义默认配置
const request = axios.create({
  baseURL: '/conner',
  timeout: 8000
})
// 增加拦截器
request.interceptors.request.use(function (config) {
  // 请求头中携带token 给后端验证token (正确 过期)
  if (getToken()) {
    config.headers.token = getToken()
  }
  vm.$showLoading()
  // 解决 post 参数 为json 格式问题
  if (config.method === 'post' && config.data) {
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  vm.$hideLoading()
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
  vm.$hideLoading()
  // 在这里判断token是否过期 没有传token 403 过期 401
  if (response.data.code === 2000) {
    Toast({
      type: 'error',
      message: 'token过期了或没有传token',
      duration: 1500,
      onClose () {
        // 跳转到登录页
        router.push('/login')
      }
    })
  }
  return response
}, function (error) {
  vm.$hideLoading()
  return Promise.reject(error)
})

export default request
