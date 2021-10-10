import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// @ts-expect-error
import { zhHans } from 'vuetify/lib/locale'
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
})
