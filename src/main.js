import Vue from 'vue'
import App from './App.vue'


// 导入路由
import VueRouter from "vue-router"

// 注册
Vue.use(VueRouter)
// const router = 

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
