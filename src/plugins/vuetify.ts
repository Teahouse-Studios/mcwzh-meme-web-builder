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
      mdi,
    },
  },
  locale: {
    defaultLocale: 'zh-Hans',
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#4285F4',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#4285F4',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#4285F4',
          secondary: '#424242',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#4285F4',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
      },
    },
  },
})
