let proxyObject={}

proxyObject['/']={
  //websocket
  ws:false,
  //目标地址
  target:'http://47.94.17.30:8081/',
  //发送请求头host会被设置target
  changeOrigin:true,
  //不重写请求地址
  pathRewrite:{
    '^/':'/'
  }

}


module.exports={
  devServer:{
    host:'localhost',
    port:8080,
    proxy:proxyObject
  }
}