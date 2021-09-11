import Vue from 'vue'
import i18n from './i18n';
import App from './App.vue'
import vuetify from './plugins/vuetify';

import {getCLS, getFID, getLCP} from 'web-vitals';
import allowGa, { gtag } from "./allowGa";

declare module 'vue/types/vue' {
  interface Vue {
    $api: string
  }
}

function sendToGoogleAnalytics({name, delta, value, id}: any) {
  if (allowGa() && gtag) {
    gtag('event', name, {
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
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
}
new Vue({
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
