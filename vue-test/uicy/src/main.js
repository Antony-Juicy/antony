/* eslint-disable no-unused-vars */
import Vue from 'vue';
import App from './App.vue';

// 1.引入

import router from './router'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  // 4.注入跟实例
  router:router,

  render: h => h(App),
}).$mount('#app')