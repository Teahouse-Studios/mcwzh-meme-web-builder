import App from './App.vue'
import { createApp } from 'vue'

import { createI18n } from 'vue-i18n'
import localeZhHans from './locales/zh-Hans.json'
import localeZhMeme from './locales/zh-Meme.json'
import localeEn from './locales/en.json'

import 'vuetify/styles'
import { createVuetify, ThemeDefinition } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

import { getCLS, getFID, getLCP } from 'web-vitals'
import allowGa, { gtag } from './allowGa'

const app = createApp(App)

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#4285f4',
    info: '#4285f4',
  }
}
const customDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#4285f4',
    info: '#4285f4',
  }
}
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  locale: {
    defaultLocale: 'zh-Hans',
  },
  theme: {
    themes: {
      customLightTheme,
      customDarkTheme
    },
  },
})

const i18n = createI18n({
  locale: 'zhHans',
  fallbackLocale: 'zhMeme',
  messages: {
    zhHans: localeZhHans,
    zhMeme: localeZhMeme,
    en: localeEn,
  },
})

app.use(i18n)
app.use(vuetify)

app.mount('#app')

Sentry.init({
  app,
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

if (import.meta.env.PROD) {
  getCLS(sendToGoogleAnalytics)
  getFID(sendToGoogleAnalytics)
  getLCP(sendToGoogleAnalytics)
}
