import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'zhHans',
  fallbackLocale: 'zhMeme',
  messages: {
    zhHans: require('./locales/zh-Hans.json'),
    zhMeme: require('./locales/zh-Meme.json'),
    en: require('./locales/en.json'),
  },
})
