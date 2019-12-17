//1.导入Vue
import Vue from 'vue';
//导包
import VueRouter from "vue-router"
//导入登录页面
import login from "../views/login/login.vue"
// import register from "../views/login/register.vue"
import index from "../views/index/index.vue"
// 导入嵌套路由的组件
// 学科组件
import subject from '../views/index/subject/subjecr.vue'
// 用户组件
import user from '../views/index/user/user.vue'
//注册
Vue.use(VueRouter)
//规则
const routes = [
    {
        path:"/login",
        component:login
    },
    
    {
        path:"/index",  //路径
        component:index, //文件名
        children:[
            {
                path:"subject",
                component:subject
            },
            {
                path:"user",
                component:user
            }
        ]
    }
]
//创建路由对象
const router = new VueRouter({
    routes// routes:routes
})
//暴露出去
export default router