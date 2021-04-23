import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'
import * as path from "path";
import Test1 from "../views/Test1";
import Test2 from "../views/Test2";
import scientific from "@/views/scientific";
import stuProject from "@/views/stuProject";

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
        name: '选课信息',
        component: Test2
      }
    ]
  },
  {
    path: '/home',
    name: '科研管理',
    component: Home,
    children:[
      {path: '/scientific',
        name: '科研管理基本信息',
        component: scientific
      },
      {path: '/stuProject',
        name: '项目选取管理',
        component: stuProject
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
