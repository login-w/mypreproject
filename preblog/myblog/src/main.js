import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {postRequest} from "@/utils/api";
import {getRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";

/*//引用axios,并设置基础URL为后端服务api地址
var axios=require('axios')
//前缀必须加上的请求接口地址
axios.defaults.baseURL='http://127.0.0.1:8081'
//将API方法 绑定到全局
Vue.prototype.$axios=axios*/

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.postRequest=postRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
