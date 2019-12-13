//1.导入Vue
import router from "./router/router.js"
import VueRouter from "vue-router"
//注册
Vue .use(VueRouter)
//规则
const routes = []
//创建路由对象
const router = new VueRouter({
    routes// routes:routes
})
//暴露出去
export default router