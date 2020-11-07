<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>{{mdiTranslate}}</v-icon>
        语言
        <v-icon right>{{mdiMenuDown}}</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        @click="switchLang('zhHans')"
      >
        <v-list-item-title>简体中文</v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="switchLang('zhMeme')"
      >
        <v-list-item-title>梗体中文</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
import {mdiTranslate, mdiMenuDown} from '@mdi/js'
export default {
  name: "langMenu",
  data: () => ({
    mdiTranslate, mdiMenuDown
  }),
  methods: {
    switchLang(lang) {
      window.localStorage.setItem("memeLang", lang);
      this.$i18n.locale = lang;
    }
  }
}
</script>