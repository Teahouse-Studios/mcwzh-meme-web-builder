<template>
  <v-app :theme="theme">
    <v-main>
      <AppHeader></AppHeader>
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
      <v-tabs v-model="edition" background-color="transparent" fixed-editions>
        <v-tab value="java">
          {{ t('java') }}
        </v-tab>
        <v-tab value="bedrock">
          {{ t('bedrock') }}
        </v-tab>
      </v-tabs>

      <v-container>
        <v-window v-model="edition" class="pt-2">
          <v-window-item value="java">
            <v-row>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="inputBasic.format"
                  :hint="t('form.version.hint')"
                  :items="consts.versions"
                  :label="t('form.version.label')"
                  :outlined="true"
                  persistent-hint
                >
                  <template #prepend>
                    <v-icon>{{ mdiClock }}</v-icon>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <functional-selector
                  v-model="input.java.resource"
                  :disabled="fetchListIgnored"
                  :fixed-items="fixedItems.resource"
                  :hint="t('form.resource.hint')"
                  :items="
                    consts.java_modules.resource.filter(
                      (v) => !v.name.startsWith('lang_')
                    )
                  "
                  :label="t('form.resource.label')"
                  :loading="loading_backend"
                  help="https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack/wiki/%E6%A2%97%E4%BD%93%E4%B8%AD%E6%96%87%E6%A8%A1%E5%9D%97%E5%86%85%E5%AE%B9%E5%88%97%E8%A1%A8"
                  @help="sendHelpTrack('java_resource')"
                >
                  <template #prepend>
                    <v-icon>{{ mdiArchive }}</v-icon>
                  </template>
                </functional-selector>
              </v-col>
              <v-col cols="12" sm="4">
                <functional-selector
                  v-model="input.java.language"
                  :disabled="fetchListIgnored"
                  :fixedItems="fixedItems.language"
                  :hint="t('form.language.hint')"
                  :items="
                    consts.java_modules.resource.filter((v) =>
                      v.name.startsWith('lang_')
                    )
                  "
                  :label="t('form.language.label')"
                  :loading="loading_backend"
                >
                  <template #prepend>
                    <v-icon>{{ mdiCog }}</v-icon>
                  </template>
                </functional-selector>
              </v-col>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.java.modOption"
                  :hint="t('form.mod.option.hint')"
                  :items="modOption"
                  :label="t('form.mod.option.label')"
                  :outlined="true"
                  persistent-hint
                >
                  <template #prepend>
                    <v-icon>{{ mdiViewModule }}</v-icon>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.java.mod"
                  :disabled="input.java.modOption !== 'custom'"
                  :hint="t('form.mod.list.hint')"
                  :items="consts.modList"
                  :label="t('form.mod.list.label')"
                  :outlined="true"
                  multiple
                  persistent-hint
                >
                  <template #prepend>
                    <v-icon>{{ mdiSelectGroup }}</v-icon>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12">
                <functional-selector
                  v-model="input.java.collection"
                  :hint="t('form.collections.hint')"
                  :items="consts.java_modules.collection"
                  :label="t(`form.collections.label`)"
                  :fixedItems="collectionFixedItems"
                >
                  <template v-slot:before-author="data">
                    {{ collectionDesc(data.item) }}
                  </template>
                  <template #prepend>
                    <v-icon>{{ mdiGroup }}</v-icon>
                  </template>
                </functional-selector>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="input.java.compatible"
                  :disabled="inputBasic.format === 3"
                  :messages="
                    inputBasic.format === 3
                      ? t('form.compatible.disabled')
                      : t('form.compatible.hint')
                  "
                  :label="t('form.compatible.label')"
                  class="mt-n2"
                  persistent-hint
                />
              </v-col>
              <v-col cols="12">
                <v-slider
                  v-model="input.java.child"
                  :ticks="t('form.child.ticks')"
                  :max="2"
                  :label="t('form.child.label')"
                  step="1"
                  ticks="always"
                  tick-size="3"
                  :message="t('form.child.hints')[input.java.child]"
                  persistent-hint
                >
                  <template #prepend>
                    <v-icon>{{ mdiAccountChildCircle }}</v-icon>
                  </template>
                </v-slider>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="bedrock">
            <v-row>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.bedrock.extType"
                  :hint="t('form.bedrockExtType.hint')"
                  :items="consts.bedrockExtType"
                  :label="t('form.bedrockExtType.label')"
                  :outlined="true"
                  persistent-hint
                >
                  <template #prepend>
                    <v-icon>{{ mdiFolderInformation }}</v-icon>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="6" sm="6">
                <functional-selector
                  v-model="input.bedrock.resource"
                  :disabled="fetchListIgnored"
                  :fixed-items="fixedItems.resource"
                  :hint="t('form.resource.hint')"
                  :items="consts.bedrock_modules.resource"
                  :label="t('form.resource.label')"
                  :loading="loading_backend"
                  help="https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack-bedrock/wiki/%E6%A2%97%E4%BD%93%E4%B8%AD%E6%96%87%E6%A8%A1%E5%9D%97%E5%86%85%E5%AE%B9%E5%88%97%E8%A1%A8"
                  @help="sendHelpTrack('bedrock_resource')"
                >
                  <template #prepend>
                    <v-icon>{{ mdiArchive }}</v-icon>
                  </template>
                </functional-selector>
              </v-col>
              <v-col cols="12">
                <functional-selector
                  v-model="input.bedrock.collection"
                  :hint="t('form.collections.hint')"
                  :items="consts.bedrock_modules.collection"
                  :label="t(`form.collections.label`)"
                >
                  <template v-slot:before-author="data">
                    {{ collectionDesc(data.item) }}
                  </template>
                  <template #prepend>
                    <v-icon>{{ mdiGroup }}</v-icon>
                  </template>
                </functional-selector>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="input.bedrock.compatible"
                  :hint="t('form.compatible.hint')"
                  :label="t('form.compatible.label')"
                  persistent-hint
                />
              </v-col>
              <v-col cols="12">
                <v-slider
                  v-model="input.bedrock.child"
                  :tick-labels="t('form.child.ticks')"
                  :max="2"
                  :label="t('form.child.label')"
                  step="1"
                  ticks="always"
                  tick-size="3"
                  :message="t('form.child.hints')[input.bedrock.child]"
                  persistent-hint
                  class="mb-3"
                >
                  <template #prepend>
                    <v-icon>{{ mdiAccountChildCircle }}</v-icon>
                  </template>
                </v-slider>
              </v-col>
            </v-row>
            <p class="text-body-2">
              <i18n-t
                for="bedrock_hint.readme"
                path="bedrock_hint.text"
                tag="label"
              >
                <a
                  href="https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack-bedrock"
                  rel="nofollow noopener"
                  target="_blank"
                  >{{ t('bedrock_hint.readme') }}</a
                >
              </i18n-t>
            </p>
          </v-window-item>
        </v-window>
        <v-alert
          :icon="mdiInformationOutline"
          class="mt-3 mb-3 text-body-2"
          dense
          type="info"
          >{{ t('hints')[hint] }}
        </v-alert>
        <div>
          <v-btn
            :disabled="loading"
            :loading="loading"
            color="primary"
            @click="submit"
          >
            <v-icon left>{{ mdiCloudDownload }}</v-icon>
            {{ t('form.submit') }}
          </v-btn>
          <p
            v-if="consts.bedrock_modified && consts.java_modified"
            class="ml-2 caption"
            style="display: inline-block; vertical-align: middle; margin: auto"
          >
            {{ t('form.modified') }}
            {{
              new Date(
                edition === 'java'
                  ? consts.java_modified
                  : consts.bedrock_modified
              ).toLocaleString(t('metadata.dateLocale'.toString()))
            }}
          </p>
        </div>
        <div v-if="logs.length >= 1">
          <v-divider style="margin: 15px 0"></v-divider>
          <p ref="refs.logs" class="headline">{{ t('log.headline') }}</p>
          <v-expansion-panels v-model="logsPanel" multiple>
            <v-expansion-panel v-for="(item, i) in logs" :key="i">
              <v-expansion-panel-title>
                {{
                  new Date(Number(item.ts)).toLocaleString(
                    t('metadata.dateLocale'.toString())
                  )
                }}
                {{ item.title }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <pre
                  style="
                    padding-bottom: 15px;
                    white-space: pre-wrap;
                    font-family: 'Cascadia Code', 'Fira Code', 'Consolas',
                      monospace;
                  "
                  >{{ item.content }}</pre
                >
                <v-btn
                  v-if="item.filename"
                  :color="isDarkTheme ? 'white' : 'primary'"
                  outlined
                  @click="
                    () => {
                      open(item.root + item.filename!)
                      trackBuild(item)
                    }
                  "
                >
                  <v-icon left>{{ mdiCloudDownload }}</v-icon>
                  {{ t('log.download') }}
                </v-btn>
                <v-btn
                  v-if="item.filename"
                  :color="isDarkTheme ? 'white' : 'primary'"
                  class="ml-2"
                  icon
                  @click="
                    () => {
                      share(item)
                      trackShare(item)
                    }
                  "
                >
                  <v-icon>{{ mdiShareVariant }}</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  :color="isDarkTheme ? 'dark' : ''"
                  dark
                  @click="$emit('help')"
                >
                  <v-icon left>{{ mdiBug }}</v-icon>
                  {{ t('log.feedback') }}
                </v-btn>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <v-divider style="margin: 15px 0"></v-divider>
        <Sponsors />
      </v-container>
      <teahouse-footer />
    </v-main>
    <help ref="refs.help" />
    <v-snackbar v-model="snackbarBuildSucceeded">
      {{ t('snackbar.buildSucceeded') }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          color="blue"
          text
          @click="snackbarBuildSucceeded = false"
        >
          {{ t('snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="shareLinkParsed">
      {{ t('snackbar.shareLinkParsed') }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          color="primary"
          text
          @click="shareLinkParsed = false"
        >
          {{ t('snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="shareCopyedToClipboard">
      {{ t('snackbar.shareCopyedToClipboard') }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          color="primary"
          text
          @click="shareCopyedToClipboard = false"
        >
          {{ t('snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarBuildFailed">
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
          @click="snackbarBuildSucceeded = false"
        >
          {{ t('snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="dialogFetchListFailed" persistent width="500">
      <v-card>
        <v-card-title class="headline"
          >{{ t('dialog.fetchListFailed.headline') }}
        </v-card-title>
        <v-card-text>
          {{ t('dialog.fetchListFailed.text') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="fetchList()">
            {{ t('dialog.fetchListFailed.retry') }}
          </v-btn>
          <v-btn
            text
            @click=";(dialogFetchListFailed = false), (refs.help.dialog = true)"
          >
            {{ t('dialog.fetchListFailed.feedback') }}
          </v-btn>
          <v-btn
            color="error"
            text
            @click="
              ;(dialogFetchListFailed = false),
                (fetchListIgnored = true),
                (loading_backend = false)
            "
          >
            {{ t('dialog.fetchListFailed.ignore') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <News />
    <Webview />
  </v-app>
</template>
<script setup lang="ts">
import axios, { AxiosResponse } from 'axios'
import { useLocalStorage } from '@vueuse/core'
import FunctionalSelector from './components/functionalSelector.vue'
import Help from './components/help.vue'
import AppHeader from './components/AppHeader.vue'
import {
  mdiClock,
  mdiBug,
  mdiCloudDownload,
  mdiInformationOutline,
  mdiShareVariant,
  mdiArchive,
  mdiCog,
  mdiViewModule,
  mdiSelectGroup,
  mdiGroup,
  mdiFolderInformation,
  mdiAccountChildCircle,
} from '@mdi/js'
import TeahouseFooter from './components/TeahouseFooter.vue'
import allowGa, { gtag } from './allowGa'
import Sponsors from './components/sponsors.vue'
import Webview from './components/webview.vue'
import News from './components/news.vue'
import type {
  IAlert,
  ICollection,
  ILog,
  IReq,
  IResource,
  IResp,
  Edition,
} from './types'
import { useI18n } from 'vue-i18n'
import { computed, onBeforeMount, onMounted, watch, nextTick } from 'vue'
import { useThemeStore } from '@/stores/ui'
import { useEditionStore } from '@/stores/edition'

let { edition, links } = useEditionStore()

let { t, locale } = useI18n({ useScope: 'global' })

let refs = $ref({
  help: null,
  logs: null,
})

function toggleApi() {
  const newApi =
    api === 'https://meme.wd-api.com'
      ? 'https://meme-ts.wd-api.com'
      : 'https://meme.wd-api.com'
  api = newApi
  localStorage.setItem('api', newApi)
}
function share(item: ILog) {
  let p = new URLSearchParams()
  const type = item.isBedrock ? 'bedrock' : 'java'
  p.set('type', type)
  p.set('ver', '1')
  p.set('input', JSON.stringify(input[type]))
  p.set('inputBasic', JSON.stringify(inputBasic))
  let path = `${
    window.location.href.split('#')[0].split('?')[0]
  }?${p.toString()}`
  let shareContent = {
    title: '梗体中文构建配置分享',
    text: '你的好友给你分享了 ta 的配置！',
    url: path,
  }
  if (navigator.share) {
    navigator.share(shareContent)
  } else {
    navigator.clipboard.writeText(path)
    shareCopyedToClipboard = true
  }
}
function sendHelpTrack(label: string) {
  allowGa() &&
    gtag?.('event', 'help', {
      eventCategory: label,
    })
}
function trackShare(item: ILog) {
  allowGa() &&
    gtag?.('event', 'share', {
      eventLabel: item.filename,
      eventType: item.isBedrock ? 'bedrock' : 'java',
    })
}
function trackBuild(item: ILog) {
  allowGa() &&
    gtag?.('event', 'download', {
      eventLabel: item.filename,
      eventType: item.isBedrock ? 'bedrock' : 'java',
    })
}
function collectionDesc(item: ICollection) {
  return `(${t('form.collections.description_prefix')} ${
    item['contains'].length
  } ${t('form.collections.resource_suffix')})`
}
function open(name: string) {
  window.open(name)
}
async function fetchList() {
  loading_backend = true
  let req: AxiosResponse<IResp>
  try {
    req = await axios.get(api)
  } catch (e) {
    dialogFetchListFailed = true
    console.log(e)
    return
  }
  const backend = req.data
  consts = {
    ...consts,
    modList: [
      { header: t('form.mod.header').toString() },
      ...backend.mods,
      { header: t('form.mod.enHeader').toString() },
      ...backend.enmods,
    ],
    java_modules: backend.java_modules,
    bedrock_modules: backend.bedrock_modules,
  }
  loading_backend = false
  dialogFetchListFailed = false
  input.bedrock.collection = ['choice_modules_1']
  input.java.collection = ['choice_modules_1']

  function loadParams() {
    let p = new URLSearchParams(window.location.search)
    let type = p.get('type') as Edition
    let ver = p.get('ver')
    let inputBasic = p.get('inputBasic')
    let input = p.get('input') as Edition
    if (['java', 'bedrock'].includes(type) && inputBasic && ver === '1') {
      let _inputBasic, _input
      try {
        _inputBasic = JSON.parse(inputBasic)
        _input = JSON.parse(input)
      } catch (e) {
        return
      }
      shareLinkParsed = true
      edition = type
      input[type] = _input
      inputBasic = _inputBasic
    }
  }
  loadParams()

  consts.bedrock_modified = backend.bedrock_modified
  consts.java_modified = backend.java_modified
}
async function submit() {
  loading = true

  const inputBase = whetherUsebedrock ? input.bedrock : input.java

  let packType: 'normal' | 'legacy' | 'compat' = 'normal'
  if (inputBasic.format === 3) {
    packType = 'legacy'
  } else if (input.java.compatible) {
    packType = 'compat'
  }

  let resource: string[] = inputBase.resource.concat(inputBase.language)

  switch (inputBase.child) {
    case 0:
      if (!resource.includes('lang_sfw')) {
        resource.push('lang_sfw')
      }
      if (!resource.includes('lang_sfc')) {
        resource.push('lang_sfc')
      }
      break
    case 1:
      if (!resource.includes('lang_sfw')) {
        resource.push('lang_sfw')
      }
      if (resource.includes('lang_sfc')) {
        resource = resource.filter((item) => item !== 'lang_sfc')
      }
      break
    case 2:
      if (resource.includes('lang_sfw')) {
        resource = resource.filter((item) => item !== 'lang_sfw')
      }
      if (resource.includes('lang_sfc')) {
        resource = resource.filter((item) => item !== 'lang_sfc')
      }
      break
  }

  let data: IReq = Object.assign(
    {
      format: inputBasic.format,
      _bedrock: whetherUsebedrock,
      modules: {
        resource: resource,
        collection: inputBase.collection.concat(collectionFixedItems),
      },
      mod:
        input.java.modOption === 'all'
          ? ['all']
          : input.java.modOption === 'custom'
          ? input.java.mod
          : [],
      type: packType,
    },
    whetherUsebedrock && {
      type: input.bedrock.extType,
      compatible: input.bedrock.compatible,
    }
  )
  console.log(data)
  allowGa() &&
    gtag?.('event', 'build', {
      eventType: whetherUsebedrock ? 'bedrock' : 'java',
    })
  axios({ url: '/ajax', baseURL: api, method: 'POST', data })
    .then((res) => {
      console.log(res.data)
      logs.unshift({
        title: t('log.buildSucceeded') as string,
        ts: new Date().valueOf(),
        content: res.data.logs,
        filename: res.data.filename,
        root: res.data.root,
        github: links.github,
        isBedrock: whetherUsebedrock,
      })
      logsPanel = logsPanel.map((v) => v + 1)
      logsPanel.unshift(0)
      nextTick(() => {
        ;(refs.logs as unknown as Element).scrollIntoView()
      })

      snackbarBuildSucceeded = true
      loading = false
    })
    .catch((err) => {
      logs.unshift({
        title: t('log.buildFailed') as string,
        ts: new Date().valueOf(),
        content: err.response?.data?.logs || err.toString(),
      })
      logsPanel = logsPanel.map((v) => v + 1)
      logsPanel.unshift(0)
      nextTick(() => {
        ;(refs.logs as unknown as Element).scrollIntoView()
      })
      snackbarBuildFailed = true
      loading = false
    })
}
let api = $ref('')
let alerts = $ref<IAlert[]>([])
let snackbarBuildSucceeded = $ref(false)
let snackbarBuildFailed = $ref(false)
let dialogFetchListFailed = $ref(false)
let fetchListIgnored = $ref(false)
let shareLinkParsed = $ref(false)
let shareCopyedToClipboard = $ref(false)
let logsPanel = $ref<number[]>()
let loading = $ref(false)
let inputBasic = $ref({
  format: 8 as 8 | 7 | 6 | 5 | 4 | 3,
})
let logs = $ref<ILog[]>([])
let input = $ref({
  bedrock: {
    extType: 'mcpack',
    compatible: false,
    resource: [] as string[],
    language: [] as string[],
    collection: [] as string[],
    child: 0,
  },
  java: {
    modOption: 'all',
    compatible: false,
    mod: [] as string[],
    resource: [] as string[],
    language: [] as string[],
    collection: [] as string[],
    child: 1,
  },
})
let hint = $ref(0)
let loading_backend = $ref(true)
let consts = $ref({
  java_modified: 0,
  bedrock_modified: 0,
  bedrockExtType: ['mcpack', 'zip'],
  modList: [] as Array<
    | {
        text?: string | number | object
        value?: string | number | object
        disabled?: boolean
        divider?: boolean
        header?: string
      }
    | string
  >,
  java_modules: {
    resource: [] as IResource[],
    collection: [] as ICollection[],
  },
  bedrock_modules: {
    resource: [] as IResource[],
    collection: [] as ICollection[],
  },
  versions: [
    { text: '1.18+', value: 8 },
    { text: '1.17 - 1.17.1', value: 7 },
    { text: '1.16.2 - 1.16.5', value: 6 },
    { text: '1.15 - 1.16.1', value: 5 },
    { text: '1.13 - 1.14.4', value: 4 },
    { text: '1.11 - 1.12.2', value: 3 },
  ],
})

onBeforeMount(() => {
  if (import.meta.env.PROD) {
    const endpoint = {
      py: 'https://meme.wd-api.com',
      ts: 'https://meme-ts.wd-api.com',
    }
    let local = localStorage.getItem('api')?.toString() || ''
    let using = Object.values(endpoint).includes(local) ? local : endpoint['py']
    api = using
  } else {
    api = 'http://localhost:8000'
  }
})
onMounted(async () => {
  setInterval(() => {
    hint = hint === 3 ? 0 : ++hint
  }, 4000)

  fetchList()

  await axios
    .get(
      'https://cdn.jsdelivr.net/gh/Teahouse-Studios/mcwzh-meme-resourcepack@master/alerts.json'
    )
    .then((response) => (alerts = response.data))
})

const modOption = $computed<Record<string, string>[]>(() => {
  return [
    { text: t('form.modOption.all').toString(), value: 'all' },
    { value: 'none', text: '无' },
    {
      value: 'custom',
      text: '自定义',
    },
  ]
})
const whetherUsebedrock = $computed<boolean>(() => {
  return edition === 'bedrock'
})
const fixedItems = $computed<{
  resource: string[]
  language: string[]
}>(() => {
  // const base = whetherUsebedrock ? consts.bedrock_modules : consts.java_modules
  // const childBase = whetherUsebedrock ? input.bedrock.child : input.java.child
  // let child: string[] = []
  // switch (childBase) {
  //   case 0:
  //     child = ['lang_sfc', 'lang_sfw']
  //     break
  //   case 1:
  //     child = ['lang_sfw']
  //     break
  // }
  // let items = base.collection.filter((v) =>
  //   input[whetherUsebedrock ? 'bedrock' : 'java'].collection.includes(v.name)
  // )
  // const data = items.map((v) => v['contains']).flat()
  // console.log(data)
  // console.log(base.resource)
  return {
    // resource: data.concat(child),
    // language: data.concat(child),
    resource: [],
    language: [],
  }
})
const collectionFixedItems = $computed<string[]>(() => {
  let version: string[] = []
  if (!whetherUsebedrock) {
    const versionModules: { [index: number]: string[] } = {
      8: [],
      7: ['version_1.17.1'],
      6: ['version_1.16.5'],
      5: ['version_1.12.2-1.15.2'],
      4: ['version_1.12.2-1.15.2'],
      3: ['version_1.12.2-1.15.2'],
    }
    version = versionModules[inputBasic.format]
  }
  return version
})

watch($$(inputBasic.format), (val) => {
  if (val === 3) {
    input.java.compatible = true
  }
})

let newsIgnoredLS = useLocalStorage('memeNewsIgnored', 0)

let { theme, isDarkTheme } = useThemeStore()
let themeLS = $(useLocalStorage('memeTheme', theme))

useThemeStore().$subscribe((mutation, state) => {
  themeLS = state.theme
})

let localeLS = useLocalStorage('memeLang', 'zhHans')
locale.value = localeLS.value
</script>
