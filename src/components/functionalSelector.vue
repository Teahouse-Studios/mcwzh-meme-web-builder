<template>
  <v-select v-model="combinedItems" :disabled="disabled || false" :hint="hint"
            :items="list" :label="label" :loading="loading" multiple persistent-hint>
    <template v-slot:message="{message}">
      {{ message }}
      <v-btn v-if="help" :href="help" icon small target="_blank">
        <v-icon>
          {{ mdiHelpCircleOutline }}
        </v-icon>
      </v-btn>
    </template>
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
      <v-list-item v-bind="data.attrs" v-on="data.on"
                   :disabled="fixedItems.includes(data.item.text.name) || checkIncompatible(data.item.text.name) || false">
        <v-list-item-action>
          <v-checkbox v-model="data.attrs.inputValue"
                      :disabled="fixedItems.includes(data.item.text.name) || checkIncompatible(data.item.text.name) || false"
                      @change="data.parent.$emit('select')"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ data.item.text.name }}</v-list-item-title>
          <v-list-item-subtitle style="white-space: pre-wrap">{{ data.item.text.description }}
            <slot name="before-author" v-bind:item="data.item.text"/>
            <a
              v-if="data.item.text.author">
              · {{ $t("form.author") }}{{ data.item.text.author }}
            </a>
            <a v-if="(data.item.text.incompatible_with || []).length >= 1" class="red--text">
              {{ $t("form.incompatible_prefix") }} {{ data.item.text.incompatible_with.join(", ") }}
              {{ $t("form.incompatible_suffix") }}
            </a>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
import {mdiCheckboxBlankOutline, mdiCloseBox, mdiMinusBox, mdiHelpCircleOutline} from '@mdi/js'

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
    },
    help: {
      type: String,
      default: ''
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
        return [...new Set([...this.resource, ...this.resource_parent, ...this.fixedItems])]
      },
      set(val) {
        this.resource = val.filter(v => !this.fixedItems.includes(v))
      }
    },
    incompatibleMap() {
      return this.items.filter(v => v.incompatible_with?.length).reduce((v, obj) => {
        obj.incompatible_with.map(item => {
          v[item] ||= []
          v[item].push(obj.name)
        })
        return v
      }, {})
    }
  },
  beforeMount() {
    this.resource = this.resource_parent || []
  },
  watch: {
    resource(newVal) {
      this.$emit('change', newVal.filter(v => v !== undefined))
    },
    fixedItems() {
      this.combinedItems = this.combinedItems.concat([])
    }
  },
  methods: {
    checkIncompatible(name) {
      return (this.incompatibleMap[name] || []).filter(v => this.resource.includes(v)).length >= 1
    },
    toggleResource() {
      if (this.resource.length === this.items.length - this.fixedItems.length - Object.keys(this.incompatibleMap).length) {
        this.resource = []
      } else {
        this.resource = this.items.map(v => v.name).filter(v => !this.fixedItems.includes(v)).filter(v => !Object.keys(this.incompatibleMap).includes(v))
      }
    },
  },
  data() {
    return {
      resource: [],
      mdiHelpCircleOutline
    }
  }
}
</script>
