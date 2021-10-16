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
  theme: {
    themes: {
      light: {
        primary: '#4285f4',
        info: '#4285f4',
      },
      dark: {
        primary: '#4285f4',
        info: '#4285f4',
      },
    },
  },
})
