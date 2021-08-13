import Vue from 'vue'
// @ts-ignore
import i18n from './i18n';
import App from './App.vue'
import vuetify from './plugins/vuetify';

import {getCLS, getFID, getLCP} from 'web-vitals';
import allowGa from "./allowGa";

function sendToGoogleAnalytics({name, delta, value, id}: any) {
  if (allowGa() && window.gtag) {
    window.gtag('event', name, {
      value: delta,
      metric_id: id,
      metric_value: value,
      metric_delta: delta,
    });
  }
}

if (process.env.NODE_ENV === 'production') {
  getCLS(sendToGoogleAnalytics);
  getFID(sendToGoogleAnalytics);
  getLCP(sendToGoogleAnalytics);
}

Vue.config.productionTip = false
Vue.prototype.$api = process.env.NODE_ENV === 'production' ? 'https://meme.wd-api.com/' : 'http://127.0.0.1:8000/'
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
}
new Vue({
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
