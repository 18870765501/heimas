//1.导入Vue
import Vue from 'vue';
//导包
import VueRouter from "vue-router"
//导入登录页面
import login from "../views/login/login.vue"
import register from "../views/login/register.vue"
//注册
Vue.use(VueRouter)
//规则
const routes = [
    {
        path:"/login",
        component:login
    },
    {
        path:"/register",  //路径
        component:register //文件名
    }
]
//创建路由对象
const router = new VueRouter({
    routes// routes:routes
})
//暴露出去
export default router