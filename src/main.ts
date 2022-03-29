import App from './App.vue'
import { createApp } from 'vue'

import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

import { getCLS, getFID, getLCP } from 'web-vitals'
import allowGa, { gtag } from './allowGa'

import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import { loadFonts } from './plugins/webfontloader'
import emitter from 'tiny-emitter'

const app = createApp(App)

app.use(i18n)
app.use(vuetify)

app.mount('#app')

loadFonts()

if (import.meta.env.PROD) {
  getCLS(sendToGoogleAnalytics)
  getFID(sendToGoogleAnalytics)
  getLCP(sendToGoogleAnalytics)

  Sentry.init({
    app,
    dsn: 'https://8f1c358ea4e04819bc8f53a3c8763150@o417398.ingest.sentry.io/5837515',
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
}
