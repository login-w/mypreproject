import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'
import * as path from "path";
import Test1 from "../views/Test1";
import Test2 from "../views/Test2";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/home',
    name: '教学管理',
    component: Home,
    children:[
      {path: '/test1',
        name: '基本信息管理',
        component: Test1
      },
      {path: '/test2',
        name: '学生管理',
        component: Test2
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
