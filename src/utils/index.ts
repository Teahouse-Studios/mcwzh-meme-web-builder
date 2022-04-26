import { useI18n, UseI18nOptions } from 'vue-i18n'

export function useLocalizedArray(
  key: string,
  length: number,
  vueI18nOptions: UseI18nOptions = { useScope: 'global' }
): string[] {
  const localizedArray: string[] = []
  for (let i = 0; i < length; i++) {
    localizedArray.push(useI18n(vueI18nOptions).t(`${key}.${i + 1}`))
  }
  return localizedArray
}

export function open(name: string) {
  window.open(name)
}
