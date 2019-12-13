// 导入 Vue
import Vue from 'vue'
// 导入 Element-ui
import ElementUI from 'element-ui';
// 导入 Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
// 导入 根组件
import App from '@/App.vue'
// 导入 路由
import router from '@/router'
//是否显示生产提示
Vue.config.productionTip = false
// 注册 Element-ui
Vue.use(ElementUI);
// 创建 Vue 示例
new Vue({
  render: h => h(App),
  // 挂载到 Vue 实例上
  router
})
// 挂载到id为app的div上
.$mount('#app')

