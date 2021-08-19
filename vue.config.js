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
    /*if (config.mode === 'production') {
      return {
        externals: {
          vue: 'Vue'
        }
      }
    }*/
  },
  pluginOptions: {
    i18n: {
      locale: 'zh-hans',
      fallbackLocale: 'zh-hans',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: '梗体中文 · 在线构建',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    interactive: 'src/interactive/main.ts'
  }
}
