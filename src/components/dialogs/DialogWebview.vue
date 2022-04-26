<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card tile>
      <v-toolbar>
        <v-toolbar-title>梗体中文 · 在线构建 - 啊这！</v-toolbar-title>
      </v-toolbar>

      <v-container class="mt-6">
        <h2 class="text-h4 mb-4">您被困在了第三方 App 的世界里。</h2>
        <p class="text-body-1">
          梗中在线构建在第三方 App
          的内置浏览器中会出现<b>无法正常下载</b>的情况。请使用<b>其他浏览器</b>打开在线构建。
        </p>
        <h3 class="text-h5 mb-4">让我出去！</h3>
        <p class="text-body-1" v-if="provider === 'wechat'">
          （微信）请点击右上角的
          <v-icon>{{ mdiDotsHorizontal }}</v-icon> “更多” →
          <v-icon color="blue darken-3">{{ mdiEarth }}</v-icon>
          “<b>在浏览器中打开</b>”。
        </p>
        <p class="text-body-1" v-if="provider === 'qq'">
          （QQ）请点击右上角的 <v-icon>{{ mdiPlus }}</v-icon> “更多” →
          <v-icon color="blue darken-3">{{ mdiEarth }}</v-icon>
          “<b>浏览器</b>”。
        </p>
        <p class="text-body-1" v-if="provider === 'bilibili'">
          （哔哩哔哩）请点击右上角的
          <v-icon>{{ mdiDotsVertical }}</v-icon> “更多” →
          <v-icon>{{ mdiCompass }}</v-icon> <b>“浏览器</b>”。
        </p>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiCompass, mdiDotsVertical } from '@mdi/js'

let dialog = $ref(false)
let provider = $ref<string | null>(null)

const UA = navigator.userAgent

if (UA.includes('MicroMessenger/')) {
  dialog = true
  provider = 'wechat'
} else if (UA.includes('QQ/')) {
  dialog = true
  provider = 'qq'
} else if (UA.includes('BiliApp/')) {
  dialog = true
  provider = 'bilibili'
}
</script>
