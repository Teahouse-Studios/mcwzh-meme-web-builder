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
  },
  pwa: {
    name: '梗体中文',
    iconPaths: {
      favicon32: './favicon-32x32.png',
      favicon16: './favicon-16x16.png',
      appleTouchIcon: './apple-touch-icon-152x152.png'
    }
  }
}
