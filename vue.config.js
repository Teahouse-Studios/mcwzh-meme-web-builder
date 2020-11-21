const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
require('dotenv').config()
module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? `${process.env.FE_DOMAIN}${process.env.PROJ_NAME}` : './',
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: config => {
    if (process.env.ANALYZER) {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
    return {
      externals: {
        vue: 'Vue'
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'zh-hans',
      fallbackLocale: 'zh-hans',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
