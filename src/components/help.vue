<template>
  <v-dialog v-model="dialog" max-width="700px" scrollable>
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        :aria-label="t('dialog.help.title')" :color="isDarkTheme ? 'dark' : 'primary'" bottom fab fixed
        large
        right
        @click="send"
      >
        <v-icon class="rotate-question">{{ mdiHelp }}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ t("dialog.help.title") }}
        <v-btn class="ml-auto" icon @click="dialog = false">
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-card-text style="height: 500px;">
        <h2 class="text-h5 mb-1">{{ t("dialog.help.?") }}</h2>
        <p class="text-body-1">
          {{ t("dialog.help.thinkTwice") }}
        <ul>
          <li>{{ t("dialog.help.thinkList.1") }}</li>
          <li>{{ t("dialog.help.thinkList.2") }}</li>
          <li>{{ t("dialog.help.thinkList.3") }}</li>
        </ul>
        </p>
        <p class="text-body-1">
          {{ t("dialog.help.sure") }}
        </p>
        <p class="text-body-1">
          {{ t("dialog.help.needToKnow") }}
        <ul>
          <li>{{ t("dialog.help.needToKnowList.1") }}</li>
          <li>{{ t("dialog.help.needToKnowList.2") }}</li>
          <li>{{ t("dialog.help.needToKnowList.3") }}</li>
          <li>{{ t("dialog.help.needToKnowList.4") }}</li>
          <li class="text-body-1 red--text text--lighten-1">{{ t("dialog.help.needToKnowList.5") }}</li>
        </ul>
        </p>
        <p class="text-body-1">
          {{ t("dialog.help.ready") }}
        </p>
        <p class="text-body-1">
          <v-btn class="mr-1 mb-1"
                 href="https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack/issues/new/choose"
                 target="_blank">
            {{ t("java") }}
          </v-btn>
          <v-btn class="mr-1 mb-1"
                 href="https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack-bedrock/issues/new/choose"
                 target="_blank">
            {{ t("bedrock") }}
          </v-btn>
          <v-btn class="mr-1 mb-1"
                 href="https://github.com/Teahouse-Studios/mcwzh-meme-web-builder/issues/new/choose"
                 target="_blank">
            {{ t("dialog.help.webBuilder") }}
          </v-btn>
        </p>
        <h2 class="text-h5 mb-1">{{ t("dialog.help.dev.title") }}</h2>
        <v-list>
          <v-list-item three-line>
            <v-list-item-header>
              <v-list-item-title class="text-headline mb-1">{{ t("dialog.help.dev.lcnb.name") }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ t("dialog.help.dev.lcnb.des") }}
              </v-list-item-subtitle>
            </v-list-item-header>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-header>
              <v-list-item-title class="text-headline mb-1">{{ t("dialog.help.dev.cat.name") }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ t("dialog.help.dev.cat.des") }}
              </v-list-item-subtitle>
            </v-list-item-header>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-header>
              <v-list-item-title class="text-headline mb-1">{{ t("dialog.help.dev.lake.name") }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ t("dialog.help.dev.lake.des") }}
              </v-list-item-subtitle>
            </v-list-item-header>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-header>
              <v-list-item-title class="text-headline mb-1">{{ t("dialog.help.dev.dll.name") }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ t("dialog.help.dev.dll.des") }}
              </v-list-item-subtitle>
            </v-list-item-header>
          </v-list-item>
        </v-list>
        <h2 class="text-h5 mb-1">{{ t("dialog.help.poweredBy") }}</h2>
        <p class="text-body-1">
          <v-btn class="mr-1" href="https://github.com/Teahouse-Studios/mcwzh-meme-web-builder" icon target="_blank">
            <v-icon>{{ mdiGithub }}</v-icon>
          </v-btn>
          <v-btn class="mr-1" href="https://analytics.google.com/analytics/web/" icon target="_blank">
            <v-icon>{{ mdiGoogleAnalytics }}</v-icon>
          </v-btn>
          <v-btn class="mr-1" href="https://vuetifyjs.com/" icon target="_blank">
            <v-icon>{{ mdiVuetify }}</v-icon>
          </v-btn>
          <v-btn class="mr-1" href="https://cn.vuejs.org/" icon target="_blank">
            <v-icon>{{ mdiVuejs }}</v-icon>
          </v-btn>
          <v-btn class="mr-1" href="https://materialdesignicons.com/" icon target="_blank">
            <v-icon>{{ mdiVectorSquare }}</v-icon>
          </v-btn>
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {mdiGithub, mdiGoogleAnalytics, mdiVuetify, mdiVuejs, mdiVectorSquare, mdiClose, mdiHelp} from '@mdi/js'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import allowGa from '../allowGa'
import { useThemeStore } from '@/stores/ui'

const { isDarkTheme } = useThemeStore()

const { t } = useI18n({ useScope: 'global' })

let dialog = $ref(false)
onMounted(() => {
  $on('help', () => {
    dialog = !dialog
  })
})
function send() {
  allowGa() && window.gtag('event', 'help',{
    eventCategory: 'openDialog'
  })
}
</script>

<style scoped>
.rotate-question {
  transform: rotate(180deg);
}

.rotate-question:hover {
  transform: rotate(0deg);
}
</style>
