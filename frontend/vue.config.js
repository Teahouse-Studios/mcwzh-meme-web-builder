require('dotenv').config()
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? `${process.env.FE_DOMAIN}${process.env.PROJ_NAME}` : '/',
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    i18n: {
      locale: 'zh-hans',
      fallbackLocale: 'zh-hans',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
