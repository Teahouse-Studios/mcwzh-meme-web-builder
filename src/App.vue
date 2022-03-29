<template>
  <v-app :theme="vuetifyTheme">
    <v-main>
      <v-app-bar
        :color="isDarkTheme ? 'dark' : 'white'"
        flat
        style="width: 100%"
      >
        <v-app-bar-title>{{ t('appbar.title') }}</v-app-bar-title>
        <template #append>
          <div v-if="$vuetify.display.mdAndUp">
            <v-tooltip bottom>
              <template #activator="{ props }">
                <div v-bind="props">
                  <v-btn :href="links.mcbbs" rel="noopener noreferrer" text>
                    <v-icon left>{{ svgPath.mdiPost }}</v-icon>
                    {{ t('appbar.mcbbs') }}
                  </v-btn>
                  <v-btn :href="links.github" rel="noopener noreferrer" text>
                    <v-icon left>{{ svgPath.mdiGithub }}</v-icon>
                    {{ t('appbar.github') }}
                  </v-btn>
                  <v-btn :href="links.disc" rel="noopener noreferrer" text>
                    <v-icon left>{{ svgPath.mdiDisc }}</v-icon>
                    {{ t('appbar.discPack') }}
                  </v-btn>
                  <langMenu />
                </div>
              </template>
              <span>{{ !tab ? t('java') : t('bedrock') }}</span>
            </v-tooltip>
          </div>
          <div v-else>
            <v-menu bottom left>
              <template #activator="{ props }">
                <v-btn icon v-bind="props">
                  <v-icon>{{ svgPath.mdiDotsVertical }}</v-icon>
                </v-btn>
              </template>

              <v-list dense>
                <v-list-item :href="links.mcbbs" rel="noopener noreferrer">
                  <v-list-item-avatar class="ml-0">
                    <v-icon>{{ svgPath.mdiPost }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-subtitle>
                    {{ t('appbar.mcbbs') }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item :href="links.github" rel="noopener noreferrer">
                  <v-list-item-avatar class="ml-0">
                    <v-icon>{{ svgPath.mdiGithub }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-subtitle>
                    {{ t('appbar.github') }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item :href="links.disc" rel="noopener noreferrer">
                  <v-list-item-avatar class="ml-0">
                    <v-icon>{{ svgPath.mdiDisc }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-subtitle>
                    {{ t('appbar.discPack') }}
                  </v-list-item-subtitle>
                </v-list-item>
                <langMenu />
                <div class="text-center">
                  （{{ !tab ? t('java') : t('bedrock') }}）
                </div>
              </v-list>
            </v-menu>
          </div>
          <v-tooltip bottom>
            <template #activator="{ props }">
              <v-btn icon @click="toggleApi" v-bind="props">
                <v-icon>{{
                  api === 'https://meme.wd-api.com'
                    ? svgPath.mdiLanguagePython
                    : svgPath.mdiLanguageTypescript
                }}</v-icon>
              </v-btn>
            </template>
            <span>{{ t('appbar.endpointSetting') }}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon
                @click="
                  vuetifyTheme = vuetifyTheme === 'light' ? 'dark' : 'light'
                "
              >
                <v-icon v-if="isDarkTheme"
                  >{{ svgPath.mdiBrightness7 }}
                </v-icon>
                <v-icon v-else>{{ svgPath.mdiBrightness4 }}</v-icon>
              </v-btn>
            </template>
            <span>{{ t('appbar.nightModeSwitch') }}</span>
          </v-tooltip>
        </template>
      </v-app-bar>
      <v-alert
        v-for="a in alerts"
        :key="a.name"
        :color="isDarkTheme ? 'dark' : 'white'"
        :icon="svgPath.mdiInformationOutline"
        class="mb-0"
        dense
        tile
      >
        <span v-html="a.message"></span>
      </v-alert>
      <v-tabs v-model="tab" background-color="transparent" fixed-tabs>
        <v-tab :value="0">
          {{ t('java') }}
        </v-tab>
        <v-tab :value="1">
          {{ t('bedrock') }}
        </v-tab>
      </v-tabs>

      <v-container>
        <v-window v-model="tab" class="pt-2">
          <v-window-item :value="0">
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
                    <v-icon>{{ svgPath.mdiClock }}</v-icon>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <functional-selector
                  v-model="input.je.resource"
                  :disabled="fetchListIgnored"
                  :fixed-items="fixedItems.resource"
                  :hint="t('form.resource.hint')"
                  :items="
                    consts.je_modules.resource.filter(
                      (v) => !v.name.startsWith('lang_')
                    )
                  "
                  :label="t('form.resource.label')"
                  :loading="loading_backend"
                  help="https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack/wiki/%E6%A2%97%E4%BD%93%E4%B8%AD%E6%96%87%E6%A8%A1%E5%9D%97%E5%86%85%E5%AE%B9%E5%88%97%E8%A1%A8"
                  @help="sendHelpTrack('je_resource')"
                >
                  <template #prepend>
                    <v-icon>{{ svgPath.mdiArchive }}</v-icon>
                  </template>
                </functional-selector>
              </v-col>
              <v-col cols="12" sm="4">
                <functional-selector
                  v-model="input.je.language"
                  :disabled="fetchListIgnored"
                  :fixedItems="fixedItems.language"
                  :hint="t('form.language.hint')"
                  :items="
                    consts.je_modules.resource.filter((v) =>
                      v.name.startsWith('lang_')
                    )
                  "
                  :label="t('form.language.label')"
                  :loading="loading_backend"
                >
                  <template #prepend>
                    <v-icon>{{ svgPath.mdiCog }}</v-icon>
                  </template>
                </functional-selector>
              </v-col>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.je.modOption"
                  :hint="t('form.mod.option.hint')"
                  :items="modOption"
                  :label="t('form.mod.option.label')"
                  :outlined="true"
                  persistent-hint
                >
                  <template #prepend>
                    <v-icon>{{ svgPath.mdiViewModule }}</v-icon>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.je.mod"
                  :disabled="input.je.modOption !== 'custom'"
                  :hint="t('form.mod.list.hint')"
                  :items="consts.modList"
                  :label="t('form.mod.list.label')"
                  :outlined="true"
                  multiple
                  persistent-hint
                >
                  <template #prepend>
                    <v-icon>{{ svgPath.mdiSelectGroup }}</v-icon>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12">
                <functional-selector
                  v-model="input.je.collection"
                  :hint="t('form.collections.hint')"
                  :items="consts.je_modules.collection"
                  :label="t(`form.collections.label`)"
                  :fixedItems="collectionFixedItems"
                >
                  <template v-slot:before-author="data">
                    {{ collectionDesc(data.item) }}
                  </template>
                  <template #prepend>
                    <v-icon>{{ svgPath.mdiGroup }}</v-icon>
                  </template>
                </functional-selector>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="input.je.compatible"
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
                  v-model="input.je.child"
                  :tick-labels="t('form.child.ticks')"
                  :max="2"
                  :label="t('form.child.label')"
                  step="1"
                  ticks="always"
                  tick-size="3"
                  :message="t('form.child.hints')[input.je.child]"
                  persistent-hint
                >
                  <template #prepend>
                    <v-icon>{{ svgPath.mdiAccountChildCircle }}</v-icon>
                  </template>
                </v-slider>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="1">
            <v-row>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.be.extType"
                  :hint="t('form.beExtType.hint')"
                  :items="consts.beExtType"
                  :label="t('form.beExtType.label')"
                  :outlined="true"
                  persistent-hint
                >
                  <template #prepend>
                    <v-icon>{{ svgPath.mdiFolderInformation }}</v-icon>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="6" sm="6">
                <functional-selector
                  v-model="input.be.resource"
                  :disabled="fetchListIgnored"
                  :fixed-items="fixedItems.resource"
                  :hint="t('form.resource.hint')"
                  :items="consts.be_modules.resource"
                  :label="t('form.resource.label')"
                  :loading="loading_backend"
                  help="https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack-bedrock/wiki/%E6%A2%97%E4%BD%93%E4%B8%AD%E6%96%87%E6%A8%A1%E5%9D%97%E5%86%85%E5%AE%B9%E5%88%97%E8%A1%A8"
                  @help="sendHelpTrack('be_resource')"
                >
                  <template #prepend>
                    <v-icon>{{ svgPath.mdiArchive }}</v-icon>
                  </template>
                </functional-selector>
              </v-col>
              <v-col cols="12">
                <functional-selector
                  v-model="input.be.collection"
                  :hint="t('form.collections.hint')"
                  :items="consts.be_modules.collection"
                  :label="t(`form.collections.label`)"
                >
                  <template v-slot:before-author="data">
                    {{ collectionDesc(data.item) }}
                  </template>
                  <template #prepend>
                    <v-icon>{{ svgPath.mdiGroup }}</v-icon>
                  </template>
                </functional-selector>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="input.be.compatible"
                  :hint="t('form.compatible.hint')"
                  :label="t('form.compatible.label')"
                  persistent-hint
                />
              </v-col>
              <v-col cols="12">
                <v-slider
                  v-model="input.be.child"
                  :tick-labels="t('form.child.ticks')"
                  :max="2"
                  :label="t('form.child.label')"
                  step="1"
                  ticks="always"
                  tick-size="3"
                  :message="t('form.child.hints')[input.be.child]"
                  persistent-hint
                  class="mb-3"
                >
                  <template #prepend>
                    <v-icon>{{ svgPath.mdiAccountChildCircle }}</v-icon>
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
          :icon="svgPath.mdiInformationOutline"
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
            <v-icon left>{{ svgPath.mdiCloudDownload }}</v-icon>
            {{ t('form.submit') }}
          </v-btn>
          <p
            v-if="consts.be_modified && consts.je_modified"
            class="ml-2 caption"
            style="display: inline-block; vertical-align: middle; margin: auto"
          >
            {{ t('form.modified') }}
            {{
              new Date(
                tab === 0 ? consts.je_modified : consts.be_modified
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
                      open(item.root + item.filename)
                      trackBuild(item)
                    }
                  "
                >
                  <v-icon left>{{ svgPath.mdiCloudDownload }}</v-icon>
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
                  <v-icon>{{ svgPath.mdiShareVariant }}</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  :color="isDarkTheme ? 'dark' : ''"
                  dark
                  @click="$emit('help')"
                >
                  <v-icon left>{{ svgPath.mdiBug }}</v-icon>
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
import './app.scss'
import axios, { AxiosResponse } from 'axios'
import FunctionalSelector from './components/functionalSelector.vue'
import Help from './components/help.vue'
import LangMenu from './components/langMenu.vue'
import {
  mdiAbTesting,
  mdiClock,
  mdiArrowRight,
  mdiBrightness4,
  mdiBrightness7,
  mdiBug,
  mdiClose,
  mdiCloudDownload,
  mdiCompass,
  mdiDisc,
  mdiDotsHorizontal,
  mdiDotsVertical,
  mdiEarth,
  mdiGithub,
  mdiInformationOutline,
  mdiPlus,
  mdiPost,
  mdiShareVariant,
  mdiArchive,
  mdiCog,
  mdiViewModule,
  mdiSelectGroup,
  mdiGroup,
  mdiFolderInformation,
  mdiAccountChildCircle,
  mdiLanguageTypescript,
  mdiLanguagePython,
} from '@mdi/js'
import TeahouseFooter from './components/TeahouseFooter.vue'
import allowGa, { gtag } from './allowGa'
import Sponsors from './components/sponsors.vue'
import Webview from './components/webview.vue'
import News from './components/news.vue'
import { IAlert, ICollection, ILog, IReq, IResource, IResp } from './types'
import { useI18n } from 'vue-i18n'
import { computed, onBeforeMount, onMounted, watch, nextTick } from 'vue'

let vuetifyTheme = $ref('light')
const isDarkTheme = computed(() => vuetifyTheme === 'dark')

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
  const type = item.isBe ? 'be' : 'je'
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
function trackShare(item: { filename: string; isBe: boolean }) {
  allowGa() &&
    gtag?.('event', 'share', {
      eventLabel: item.filename,
      eventType: item.isBe ? 'be' : 'je',
    })
}
function trackBuild(item: { filename: string; isBe: boolean }) {
  allowGa() &&
    gtag?.('event', 'download', {
      eventLabel: item.filename,
      eventType: item.isBe ? 'be' : 'je',
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
    je_modules: backend.je_modules,
    be_modules: backend.be_modules,
  }
  loading_backend = false
  dialogFetchListFailed = false
  input.be.collection = ['choice_modules_1']
  input.je.collection = ['choice_modules_1']

  let p = new URLSearchParams(window.location.search)
  let type = p.get('type') as 'be' | 'je'
  let ver = p.get('ver')
  let inputBasic = p.get('inputBasic')
  let input = p.get('input') as 'be' | 'je'
  if (['je', 'be'].includes(type) && inputBasic && ver === '1') {
    let _inputBasic, _input
    try {
      _inputBasic = JSON.parse(inputBasic)
      _input = JSON.parse(input)
    } catch (e) {
      return
    }
    shareLinkParsed = true
    tab = type === 'je' ? 0 : 1
    input[type] = _input
    inputBasic = _inputBasic
  }

  consts.be_modified = backend.be_modified
  consts.je_modified = backend.je_modified
}
async function submit() {
  loading = true

  const inputBase = whetherUseBE ? input.be : input.je

  let packType: 'normal' | 'legacy' | 'compat' = 'normal'
  if (inputBasic.format === 3) {
    packType = 'legacy'
  } else if (input.je.compatible) {
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
      _be: whetherUseBE,
      modules: {
        resource: resource,
        collection: inputBase.collection.concat(collectionFixedItems),
      },
      mod:
        input.je.modOption === 'all'
          ? ['all']
          : input.je.modOption === 'custom'
          ? input.je.mod
          : [],
      type: packType,
    },
    whetherUseBE && {
      type: input.be.extType,
      compatible: input.be.compatible,
    }
  )
  console.log(data)
  allowGa() &&
    gtag?.('event', 'build', {
      eventType: whetherUseBE ? 'be' : 'je',
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
        isBe: whetherUseBE,
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
const svgPath = {
  mdiLanguagePython,
  mdiLanguageTypescript,
  mdiArrowRight,
  mdiAbTesting,
  mdiPost,
  mdiGithub,
  mdiDisc,
  mdiCloudDownload,
  mdiBug,
  mdiDotsVertical,
  mdiInformationOutline,
  mdiBrightness4,
  mdiBrightness7,
  mdiShareVariant,
  mdiClose,
  mdiCompass,
  mdiDotsHorizontal,
  mdiEarth,
  mdiPlus,
  mdiClock,
  mdiArchive,
  mdiCog,
  mdiViewModule,
  mdiSelectGroup,
  mdiGroup,
  mdiFolderInformation,
  mdiAccountChildCircle,
}
let tab = $ref<0 | 1>(0)
let logsPanel = $ref<number[]>()
let loading = $ref(false)
let inputBasic = $ref({
  format: 8 as 8 | 7 | 6 | 5 | 4 | 3,
})
let logs = $ref<ILog[]>([])
let input = $ref({
  be: {
    extType: 'mcpack',
    compatible: false,
    resource: [] as string[],
    language: [] as string[],
    collection: [] as string[],
    child: 0,
  },
  je: {
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
  je_modified: 0,
  be_modified: 0,
  beExtType: ['mcpack', 'zip'],
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
  je_modules: {
    resource: [] as IResource[],
    collection: [] as ICollection[],
  },
  be_modules: {
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
  let that = this
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
const whetherUseBE = $computed<boolean>(() => {
  return tab === 1
})
const fixedItems = $computed<{
  resource: string[]
  language: string[]
}>(() => {
  const base = whetherUseBE ? consts.be_modules : consts.je_modules
  const childBase = whetherUseBE ? input.be.child : input.je.child
  let child: string[] = []
  switch (childBase) {
    case 0:
      child = ['lang_sfc', 'lang_sfw']
      break
    case 1:
      child = ['lang_sfw']
      break
  }
  let items = base.collection.filter((v) =>
    input[whetherUseBE ? 'be' : 'je'].collection.includes(v.name)
  )
  const data = items.map((v) => v['contains']).flat()
  console.log(data)
  console.log(base.resource)
  return {
    resource: data.concat(child),
    language: data.concat(child),
  }
})
const collectionFixedItems = $computed<string[]>(() => {
  let version: string[] = []
  if (!whetherUseBE) {
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
const links = $computed<{
  web_builder: string
  github: string
  mcbbs: string
  disc: string
}>(() => {
  return {
    web_builder: 'https://github.com/Teahouse-Studios/mcwzh-meme-web-builder',
    github:
      'https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack' +
      (tab ? '-bedrock' : ''),
    mcbbs: `https://www.mcbbs.net/thread-${
      tab ? '1005191' : '1004643'
    }-1-1.html`,
    disc: tab
      ? 'https://wdf.ink/record-bedrock'
      : 'https://wdf.ink/record-java',
  }
})
watch($$(vuetifyTheme), (val) => {
  localStorage.setItem(
    'memeDarkMode',
    vuetifyTheme === 'dark' ? 'true' : 'false'
  )
})
watch($$(inputBasic.format), (val) => {
  if (val === 3) {
    input.je.compatible = true
  }
})

if (localStorage.getItem('memeInitialized') !== 'true') {
  localStorage.setItem(
    'memeDarkMode',
    window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'true'
      : 'false'
  )
  localStorage.setItem('memeNewsIgnored', '0')
}
vuetifyTheme =
  localStorage.getItem('memeDarkMode') === 'true' ? 'dark' : 'light'
let memeLang = localStorage.getItem('memeLang')
if (memeLang !== 'zhHans' && memeLang !== 'zhMeme' && memeLang !== 'en') {
  localStorage.removeItem('memeLang')
  memeLang = 'zhHans'
}
locale.value = memeLang
localStorage.setItem('memeInitialized', 'true')
</script>
