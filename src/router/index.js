//1.导入Vue
import Vue from 'vue';
import VueRouter from "vue-router"
//导入登录页面
import login from "../views/login/login.vue"
//注册
Vue.use(VueRouter)
//规则
const routes = [
    {
        path:"/login",
        component:login
    }
]
//创建路由对象
const router = new VueRouter({
    routes// routes:routes
})
//暴露出去
export default router