import { ref } from 'vue'

export const vuetifyTheme = ref<'light' | 'dark'>('light')
export const isDarkTheme = ref(vuetifyTheme.value === 'dark')
export function setTheme(value: 'light' | 'dark') {
  vuetifyTheme.value = value
  isDarkTheme.value = value === 'dark'
}
