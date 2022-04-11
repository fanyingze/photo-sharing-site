
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './network/request.js'


Vue.config.productionTip = false
Vue.prototype.$axios = axios;

// 创建事件总线
Vue.prototype.$bus = new Vue()


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
