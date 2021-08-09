const path = require('path')
module.exports = {
  devServer: {
    port: 8888,
    open: true,
    proxy:{
      //服务器反向代理 基于node
      '/conner':{
        //以/conner开头请求 代理到 target 这个地址
        target:'https://api.it120.cc',
        //是否切换原
        changeOrigin:true,
        //路径重写
        pathRewrite:{
          '^/conner':'/conner'
        }
      }
    }
  },
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('components', path.join(__dirname, 'src/components'))
      .set('views', path.join(__dirname, 'src/views'))
      .set('api', path.join(__dirname, 'src/api'))
      .set('utils', path.join(__dirname, 'src/utils'))
      .set('plugins', path.join(__dirname, 'src/plugins'))
  }
}
