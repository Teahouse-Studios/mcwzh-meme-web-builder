import { usePreferredColorScheme } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { Theme } from '@/types'

const preferredColor = usePreferredColorScheme()

export const useThemeStore = defineStore('theme', {
  state: (): {
    theme: Theme
  } => {
    let theme: Theme = preferredColor.value === 'dark' ? 'dark' : 'light'

    return {
      theme: 'light',
    }
  },
  getters: {
    isDarkTheme(state): boolean {
      return state.theme === 'dark'
    },
  },
  actions: {
    switchTheme(payload?: 'light' | 'dark') {
      this.theme = payload || (this.theme === 'light' ? 'dark' : 'light')
    },
  },
})
