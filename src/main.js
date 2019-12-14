// 导入 Vue
import Vue from 'vue'
// 导入 根组件
import App from '@/App.vue'
// 导入 路由
import router from '@/router'
// 导入 Element-ui
import ElementUI from 'element-ui';
// 导入 Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
//导入初始化代码
import './style/base.css';

//是否显示生产提示
Vue.config.productionTip = false
//测试环境变量
window.console.log(process.env.VUE_APP_BASEURL);

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

