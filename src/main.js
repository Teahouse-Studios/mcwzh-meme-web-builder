import Vue from 'vue'
import i18n from './i18n';
import App from './App.vue'
import vuetify from './plugins/vuetify';

import {getCLS, getFID, getLCP} from 'web-vitals';

function sendToGoogleAnalytics({name, delta, id}) {
  if (window.location.host === "dl.meme.teahou.se" && window.ga) {
    window.ga('send', 'event', {
      eventCategory: 'Web Vitals',
      eventAction: name,
      eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
      eventLabel: id,
      nonInteraction: true,
      transport: 'beacon',
    });
  } else {
    console.log(arguments)
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
