<!-- 暂停维护，需要等待官方为 v-select 重新添加原本的 slot -->
<template>
  <v-select
    v-model="combinedItems"
    :disabled="disabled || false"
    :hint="hint"
    :items="list"
    :label="label"
    :loading="loading"
    :outlined="true"
    chips
    closable-chips
    multiple
    persistent-hint
  >
    <template v-slot:message="{ message }">
      {{ message }}
      <v-btn
        v-if="help"
        :href="help"
        icon
        size="x-small"
        target="_blank"
        @click="$emit('help')"
      >
        <v-icon>
          {{ mdiHelpCircleOutline }}
        </v-icon>
      </v-btn>
    </template>
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-slot:prepend-item>
      <v-list-item ripple @click="toggleResource">
        <v-list-item-avatar>
          <v-icon> {{ resourceIcon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-header>
          <v-list-item-title>{{ t('form.selectAll') }}</v-list-item-title>
        </v-list-item-header>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
    <template v-slot:item="data">
      <v-list-item
        v-bind="data.attrs"
        v-on="data.on"
        :disabled="
          fixedItems.includes(data.item.text.name) ||
          checkIncompatible(data.item.text.name) ||
          false
        "
      >
        <v-list-item-avatar>
          <v-checkbox
            v-model="data.attrs.inputValue"
            :disabled="
              fixedItems.includes(data.item.text.name) ||
              checkIncompatible(data.item.text.name) ||
              false
            "
            @change="data.parent.$emit('select')"
          ></v-checkbox>
        </v-list-item-avatar>
        <v-list-item-header>
          <v-list-item-title>{{ data.item.text.name }}</v-list-item-title>
          <v-list-item-subtitle style="white-space: pre-wrap"
            >{{ data.item.text.description }}
            <slot name="before-author" v-bind:item="data.item.text" />
            <a v-if="data.item.text.author">
              · {{ t('form.author')
              }}{{ data.item.text.author.join(t('metadata.ideographicComma')) }}
            </a>
            <a
              v-if="(data.item.text.incompatible_with || []).length >= 1"
              class="text-red"
            >
              {{
                t('form.incompatible', [
                  data.item.text.incompatible_with.join(
                    t('metadata.ideographicComma')
                  ),
                ])
              }}
            </a>
          </v-list-item-subtitle>
        </v-list-item-header>
      </v-list-item>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { IResource } from '@/types'
import {
  mdiCheckboxBlankOutline,
  mdiCloseBox,
  mdiMinusBox,
  mdiHelpCircleOutline,
} from '@mdi/js'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

let resource = $ref([])
let props = withDefaults(
  defineProps<{
    label: String
    hint: String
    items: IResource[]
    resource_parent?: IResource[]
    loading?: Boolean
    disabled?: Boolean
    fixedItems?: IResource[]
    help?: string
    outlined?: Boolean
    modelValue: IResource[]
  }>(),
  {
    resource_parent: [],
    loading: false,
    disabled: false,
    fixedItems: [],
  }
)

const list = $computed(() => {
  if (!props.items) {
    return []
  }
  return props.items.map((v) => ({
    value: v.name,
    text: v,
  }))
})
const resourceIcon = $computed(() => {
  if (resource.length === 0) {
    return mdiCheckboxBlankOutline
  } else if (resource.length === props.items?.length) {
    return mdiCloseBox
  } else {
    return mdiMinusBox
  }
})
let combinedItems = $computed({
  get() {
    return [
      ...new Set([...resource, ...props.resource_parent, ...props.fixedItems]),
    ]
  },
  set(val) {
    resource = val.filter((v) => !props.fixedItems.includes(v))
  },
})
const incompatibleMap = $computed(() => {
  return props.items
    .filter((v) => v.incompatible_with?.length)
    .reduce((v, obj) => {
      obj.incompatible_with!.map((item) => {
        v[item] ||= []
        v[item].push(obj.name)
      })
      return v
    }, {})
})
resource = props.resource_parent || []
watch(resource, (newVal) => {
  $emit(
    'change',
    newVal.filter((v) => v !== undefined)
  )
})
function fixItems() {
  combinedItems = combinedItems.concat([])
}
function checkIncompatible(name) {
  return (
    (incompatibleMap[name] || []).filter((v) => resource.includes(v)).length >=
    1
  )
}
function toggleResource() {
  if (
    resource.length ===
    props.items.length -
      props.fixedItems.length -
      Object.keys(incompatibleMap).length
  ) {
    resource = []
  } else {
    resource = props.items
      .map((v) => v.name)
      .filter((v) => !props.fixedItems.includes(v))
      .filter((v) => !Object.keys(incompatibleMap).includes(v))
  }
}
</script>
