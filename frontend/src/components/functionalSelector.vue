<template>
  <v-select v-model="combinedItems" :disabled="disabled || false" :hint="hint"
            :items="list" :label="label" :loading="loading" multiple persistent-hint>
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index === 0">
        <span>{{ item.text.name }}</span>
      </v-chip>
      <span
        v-if="index === 1"
        class="grey--text caption"
      >
      (+ {{ combinedItems.length - 1 }} {{ $t("form.item") }})
    </span>
    </template>
    <template v-slot:prepend-item>
      <v-list-item ripple @click="toggleResource">
        <v-list-item-action>
          <v-icon> {{ resourceIcon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t("form.selectAll") }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
    <template v-slot:item="data">
      <v-list-item v-bind="data.attrs" v-on="data.on" :disabled="fixedItems.includes(data.item.text.name) || false">
        <v-list-item-action>
          <v-checkbox v-model="data.attrs.inputValue"
                      :disabled="fixedItems.includes(data.item.text.name) || false"
                      @change="data.parent.$emit('select')"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ data.item.text.name }}</v-list-item-title>
          <v-list-item-subtitle style="white-space: pre-wrap">{{ data.item.text.description }} <a
            v-if="data.item.text.author">
            · {{ $t("form.author") }}{{ data.item.text.author }}
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
  props: {
    label: String,
    hint: String,
    items: {
      type: Array,
      default: () => []
    },
    resource_parent: Array,
    loading: Boolean,
    disabled: Boolean,
    fixedItems: {
      type: Array,
      default: () => []
    }
  },
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
      } else if (this.resource.length === this.items?.length) {
        return mdiCloseBox
      } else {
        return mdiMinusBox
      }
    },
    combinedItems: {
      get() {
        return [...new Set([...this.resource, ...this.fixedItems])]
      },
      set(val) {
        this.resource = val
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
        this.resource = this.items.map(v => v.name).filter(v => !this.fixedItems.includes(v))
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
