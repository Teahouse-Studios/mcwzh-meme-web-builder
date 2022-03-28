import { createI18n } from 'vue-i18n'
import localeZhHans from '../locales/zh-Hans.json'
import localeZhMeme from '../locales/zh-Meme.json'
import localeEn from '../locales/en.json'

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zhHans',
  fallbackLocale: 'zhMeme',
  messages: {
    zhHans: localeZhHans,
    zhMeme: localeZhMeme,
    en: localeEn,
  },
})
