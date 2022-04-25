<template>
  <v-app-bar :color="isDarkTheme ? 'dark' : 'white'" flat style="width: 100%">
    <v-app-bar-title>{{ t('appbar.title') }}</v-app-bar-title>

    <template #append>
      <div v-if="$vuetify.display.mdAndUp">
        <v-tooltip bottom>
          <template #activator="{ props }">
            <div v-bind="props" class="appbar-btns d-flex align-center">
              <v-btn
                :href="links.mcbbs"
                rel="noopener noreferrer"
                :prepend-icon="mdiPost"
                variant="text"
              >
                {{ t('appbar.mcbbs') }}
              </v-btn>
              <v-btn
                :href="links.github"
                rel="noopener noreferrer"
                :prepend-icon="mdiGithub"
                variant="text"
              >
                {{ t('appbar.github') }}
              </v-btn>
              <v-btn
                :href="links.disc"
                rel="noopener noreferrer"
                :prepend-icon="mdiDisc"
                variant="text"
              >
                {{ t('appbar.discPack') }}
              </v-btn>
              <LangMenu />
            </div>
          </template>
          <span>{{ t(edition) }}</span>
        </v-tooltip>
      </div>
      <div v-else>
        <v-menu bottom left>
          <template #activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon>{{ mdiDotsVertical }}</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item :href="links.mcbbs" rel="noopener noreferrer">
              <v-list-item-avatar class="ml-0">
                <v-icon>{{ mdiPost }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-subtitle>
                {{ t('appbar.mcbbs') }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item :href="links.github" rel="noopener noreferrer">
              <v-list-item-avatar class="ml-0">
                <v-icon>{{ mdiGithub }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-subtitle>
                {{ t('appbar.github') }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item :href="links.disc" rel="noopener noreferrer">
              <v-list-item-avatar class="ml-0">
                <v-icon>{{ mdiDisc }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-subtitle>
                {{ t('appbar.discPack') }}
              </v-list-item-subtitle>
            </v-list-item>
            <LangMenu />
            <div class="text-center">（{{ t(edition) }}）</div>
          </v-list>
        </v-menu>
      </div>
      <v-tooltip bottom>
        <template #activator="{ props }">
          <v-btn v-bind="props" icon @click="switchTheme()">
            <v-icon v-if="isDarkTheme">{{ mdiBrightness7 }} </v-icon>
            <v-icon v-else>{{ mdiBrightness4 }}</v-icon>
          </v-btn>
        </template>
        <span>{{ t('appbar.nightModeSwitch') }}</span>
      </v-tooltip>
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import LangMenu from '@/components/langMenu.vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/ui'
import { useEditionStore } from '@/stores/edition'
import {
  mdiBrightness4,
  mdiBrightness7,
  mdiDisc,
  mdiGithub,
  mdiPost,
  mdiDotsVertical,
} from '@mdi/js'

let { edition, links } = useEditionStore()
let { theme, isDarkTheme, switchTheme } = useThemeStore()
let { t, locale } = useI18n({ useScope: 'global' })
</script>
<style>
.appbar-btns {
  height: 100%;
}
</style>
