<template>
  <v-alert
    :icon="mdiInformationOutline"
    class="mt-3 mb-3 text-body-2"
    dense
    type="info"
    >{{ hints[hint] }}
  </v-alert>
</template>
<script setup lang="ts">
import { mdiInformationOutline } from '@mdi/js'
import { useLocalizedArray } from '@/utils'
import { onMounted } from 'vue'

const hints = useLocalizedArray('hints', 5)
let hint = $ref(0)

onMounted(() => {
  setInterval(() => {
    hint = hint === 3 ? 0 : ++hint
  }, 4000)
})
</script>
