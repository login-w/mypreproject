import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'
import * as path from "path";
import basicMessage from '@/views/basicMessage';
import stuCourse from '@/views/stuCourse';
import scientific from "@/views/scientific";
import stuProject from "@/views/stuProject";
import RewardManage from "@/reward/RewardManage";
import PersonRewardManage from "@/reward/PersonRewardManage";
import teacherAndStuReward from "@/views/teacherAndStuReward";
import reward from "@/views/reward";
import achievement from "@/views/achievement";
import achievementPerson from "@/views/achievementPerson";


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
        icon:"el-icon-info",
        children: [
            {
                path: '/basicMessage',
                name: '基本信息管理',
                component: basicMessage,
                icon:"el-icon-help",
            },
            {
                path: '/stuCourse',
                name: '选课信息',
                component: stuCourse,
                icon:"el-icon-picture-outline-round"
            }
        ]
    },
    {
        path: '/1',
        name: '科研管理',
        component: Home,
        icon:"el-icon-ship",
        children: [
            {
                path: '/scientific',
                name: '科研管理基本信息',
                component: scientific,
                icon:"el-icon-message-solid"
            },
            {
                path: '/stuProject',
                name: '项目选取管理',
                component: stuProject,
                icon:"el-icon-s-order"
            }
        ]
    },
    {
        path: '/2',
        name: '奖惩管理',
        component: Home,
        icon:"el-icon-s-promotion",
        children: [
            {
                path: '/reward',
                name: '奖惩基本信息',
                component: reward,
                icon:"el-icon-s-shop"
            },
            {
                path: '/teacherAndStuReward',
                name: '个人奖惩详情',
                component: teacherAndStuReward,
                icon:"el-icon-s-finance"
            }
        ]
    },
    {
        path: '/3',
        name: '绩效管理',
        component: Home,
        hidden: true,
        icon:"el-icon-s-custom",
        children: [
            {
                path: '/achievement',
                name: '绩效管理评分细则',
                component: achievement,
                icon:"el-icon-s-data"
            },
            {
                path: '/achievementPerson',
                name: '个人绩效管理',
                component: achievementPerson,
                icon:"el-icon-s-open"
            }
        ]
    }
]


const router = new VueRouter({
    routes
})

export default router

