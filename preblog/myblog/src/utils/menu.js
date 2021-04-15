import {getRequest} from "./api";
import router from "@/router";

export const initMenu=(router,store)=>{
  if(store.state.routes.length>0){
    return;
  }
  //后端菜单url
  getRequest('').then(data=>{
    if (data){
      //格式化好的router
      let fmtRoutes=formatRoutes(data);
      //添加到路由
      router.addRoutes(fmtRoutes);
    //将数据存储到Vuex
      store.commit('initRoutes',fmtRoutes);
    }
  })
}

export const formatRoutes=(routes)=>{
  let fmtRoutes=[];
  routes.forEach(router=>{
    let{
      path,
      component,
      name,
      iconCls,
      children
    }=router;
    if (children&&children instanceof Array){
      children=formatRoutes(children);
    }
    let fmtRouter={
      path:path,
          name:name,
          iconCls:iconCls,
          children:children,
          component(resolve){
        require(['../views/'+component+'.Vue'],resolve);
      }
    }
    fmtRouter.push(fmtRouter)
  });
  return fmtRoutes;
}