<template>
  <v-snackbar v-model="snackbars.buildSucceeded">
    {{ t('snackbar.buildSucceeded') }}
    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        color="blue"
        text
        @click="snackbars.buildSucceeded = false"
      >
        {{ t('snackbar.close') }}
      </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar v-model="snackbars.shareLinkParsed">
    {{ t('snackbar.shareLinkParsed') }}
    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        color="primary"
        text
        @click="snackbars.shareLinkParsed = false"
      >
        {{ t('snackbar.close') }}
      </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar v-model="snackbars.shareCopyedToClipboard">
    {{ t('snackbar.shareCopyedToClipboard') }}
    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        color="primary"
        text
        @click="snackbars.shareCopyedToClipboard = false"
      >
        {{ t('snackbar.close') }}
      </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar v-model="snackbars.buildFailed">
    {{ t('snackbar.buildFailed') }}
    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        color="red"
        text
        @click="open(links.web_builder + '/issues/new/choose')"
      >
        {{ t('snackbar.feedback') }}
      </v-btn>
      <v-btn
        v-bind="attrs"
        color="blue"
        text
        @click="snackbars.buildSucceeded = false"
      >
        {{ t('snackbar.close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup lang="ts">
import { useSnackbarsStore } from '@/stores/snackbars'
import { useEditionStore } from '@/stores/edition'
import { useI18n } from 'vue-i18n'
import { open } from '@/utils'
let { t } = useI18n({ useScope: 'global' })

const snackbars = useSnackbarsStore()
const { links } = useEditionStore()
</script>
