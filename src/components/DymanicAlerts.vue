<template>
  <v-alert
    v-for="a in alerts"
    :key="a.name"
    :color="isDarkTheme ? 'dark' : 'white'"
    :icon="mdiInformationOutline"
    class="mb-0"
    dense
    tile
  >
    <span v-html="a.message"></span>
  </v-alert>
</template>
<script setup lang="ts">
import { mdiInformationOutline } from '@mdi/js'
import { useThemeStore } from '@/stores/ui'
import type { IAlert } from '@/types'
import { onMounted } from 'vue'
import axios from 'axios'

let { isDarkTheme } = useThemeStore()
let alerts = $ref<IAlert[]>([])

onMounted(() => {
  axios
    .get(
      'https://cdn.jsdelivr.net/gh/Teahouse-Studios/mcwzh-meme-resourcepack@master/alerts.json'
    )
    .then((response) => (alerts = response.data))
})
</script>
