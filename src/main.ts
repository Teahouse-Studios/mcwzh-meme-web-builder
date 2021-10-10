import Vue from 'vue'
import i18n from './i18n'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

import { getCLS, getFID, getLCP } from 'web-vitals'
import allowGa, { gtag } from './allowGa'

declare module 'vue/types/vue' {
  interface Vue {
    $api: string
  }
}

Sentry.init({
  Vue,
  dsn:
    'https://8f1c358ea4e04819bc8f53a3c8763150@o417398.ingest.sentry.io/5837515',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'meme.wd-ljt.com', /^\//],
    }),
  ],
  tracesSampleRate: 0.2,
})

function sendToGoogleAnalytics({ name, delta, value, id }: any) {
  if (allowGa() && gtag) {
    gtag('event', name, {
      value: delta,
      metric_id: id,
      metric_value: value,
      metric_delta: delta,
    })
  }
}

if (process.env.NODE_ENV === 'production') {
  getCLS(sendToGoogleAnalytics)
  getFID(sendToGoogleAnalytics)
  getLCP(sendToGoogleAnalytics)
}

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
}
new Vue({
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
