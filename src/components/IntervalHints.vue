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
import { useI18n } from 'vue-i18n'
import useLocalizedArray from '@/utils/localizedArray'
import { onMounted } from 'vue'

let { t } = useI18n({ useScope: 'global' })

const hints = useLocalizedArray('hints', 5)
let hint = $ref(0)

onMounted(() => {
  setInterval(() => {
    hint = hint === 3 ? 0 : ++hint
  }, 4000)
})
</script>
