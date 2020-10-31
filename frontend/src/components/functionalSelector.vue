<template>
  <v-select v-model="resource" :hint="hint" :items="list"
            :disabled="disabled || false" :label="label" :loading="loading" multiple persistent-hint>
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index === 0">
        <span>{{ item.text.name }}</span>
      </v-chip>
      <span
        v-if="index === 1"
        class="grey--text caption"
      >
      (+ {{ resource.length - 1 }} 项)
    </span>
    </template>
    <template v-slot:prepend-item>
      <v-list-item ripple @click="toggleResource">
        <v-list-item-action>
          <v-icon> {{ resourceIcon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>全选</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
    <template v-slot:item="data">
      <v-list-item v-bind="data.attrs" v-on="data.on">
        <v-list-item-action>
          <v-checkbox v-model="data.attrs.inputValue"
                      @change="data.parent.$emit('select')"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ data.item.text.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ data.item.text.description }} <a v-if="data.item.text.author">
            · 作者：{{ data.item.text.author }}
          </a>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import {mdiCheckboxBlankOutline, mdiCloseBox, mdiMinusBox} from '@mdi/js'

export default {
  name: "functioanlSelector",
  props: ['label', 'hint', 'items', 'resource_parent', 'loading', 'disabled'],
  model: {
    prop: 'resource_parent',
    event: 'change',
  },
  computed: {
    list() {
      if (!this.items) {
        return []
      }
      return this.items.map((v) => ({
        value: v.name,
        text: v
      }))
    },
    resourceIcon() {
      if (this.resource.length === 0) {
        return mdiCheckboxBlankOutline
      } else if (this.resource.length === this.items.length) {
        return mdiCloseBox
      } else {
        return mdiMinusBox
      }
    }
  },
  beforeMount() {
    this.resource = this.resource_parent || []
  },
  watch: {
    resource(newVal) {
      this.$emit('change', newVal.filter(v => v !== undefined))
    }
  },
  methods: {
    toggleResource() {
      if (this.resource.length === this.items.length) {
        this.resource = []
      } else {
        this.resource = this.items.map(v => v.name)
      }
    },
  },
  data() {
    return {
      resource: []
    }
  }
}
</script>

<style scoped>

</style>
