import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHans from 'vuetify/lib/locale/zh-Hans';
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  lang: {
    locales: {zhHans},
    current: 'zhHans',
  },
});
