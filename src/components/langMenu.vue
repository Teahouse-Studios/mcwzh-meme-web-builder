<template>
  <v-menu offset-y>
    <template #activator="{ props }">
      <v-btn text v-bind="props">
        <v-icon left>{{ mdiTranslate }}</v-icon>
        {{ t('languages') }}
        <v-icon right>{{ mdiMenuDown }}</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="switchLang('zhHans')">
        <v-list-item-title>简体中文</v-list-item-title>
      </v-list-item>
      <v-list-item @click="switchLang('zhMeme')">
        <v-list-item-title>梗体中文</v-list-item-title>
      </v-list-item>
      <v-list-item @click="switchLang('en')">
        <v-list-item-title>English</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import { mdiTranslate, mdiMenuDown } from '@mdi/js'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function switchLang(lang: string) {
  window.localStorage.setItem('memeLang', lang)
  locale.value = lang
}
</script>
