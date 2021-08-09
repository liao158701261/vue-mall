//定义插件
const $alert={
  install(Vue,param){
    Vue.prototype.$alert=(msg)=>{
      alert(msg)
    }
  }
}

export default $alert