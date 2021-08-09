import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import { getToken } from 'utils'
const vm =new Vue()

//定义默认配置
const request =axios.create({
  baseURL:'/conner',
  timeout: 8000
})
//增加拦截器
request.interceptors.request.use(function(config){
  //请求头中携带token 给后端验证token (正确 过期)
  if(getToken()){
    config.headers.token=getToken()
  }
  vm.$showLoading()
  //解决 post 参数 为json 格式问题
  if(config.method==='post' && config.data){
    config.data= qs.stringify(config.data)
  }
  return config
},function(error){
  vm.$hideLoading()
  return Promise.reject(error)
})

request.interceptors.response.use(function(response){
  vm.$hideLoading()
  return response
},function(error){
  vm.$hideLoading()
  return Promise.reject(error)
})

export default request