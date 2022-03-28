// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export default createVuetify({
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
      light: {
        colors: {
          primary: '#4285f4',
          info: '#4285f4',
        }
      },
      dark: {
        colors: {
          primary: '#4285f4',
          info: '#4285f4',
        }
      }
    },
  },
})
