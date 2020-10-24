
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.prototype.$api = process.env.NODE_ENV === 'production' ? 'https://dlserver.meme.teahou.se/' : 'http://127.0.0.1:8000/'

new Vue({
  vuetify,
  /* i18n, */
  render: h => h(App)
}).$mount('#app')