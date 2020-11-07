<template>
  <v-app>
    <v-main>
      <v-app-bar
        :color="$vuetify.theme.dark ? 'dark' : 'white'" flat
      >
        <v-toolbar-title>{{ $t("appbar.title") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="$vuetify.breakpoint.name !== 'xs'">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs"
                   v-on="on">
                <v-btn :href="links.mcbbs" rel="noopener noreferrer" text>
                  <v-icon left>{{ svgPath.mdiPost }}</v-icon>
                  {{ $t("appbar.mcbbs") }}
                </v-btn>
                <v-btn :href="links.github" rel="noopener noreferrer"
                       text>
                  <v-icon left>{{ svgPath.mdiGithub }}</v-icon>
                  {{ $t("appbar.github") }}
                </v-btn>
                <v-btn :href="links.disc" rel="noopener noreferrer"
                       text>
                  <v-icon left>{{ svgPath.mdiDisc }}</v-icon>
                  {{ $t("appbar.discPack") }}
                </v-btn>
                <langMenu />
              </div>
            </template>
            <span>{{ !this.tab ? $t("java") : $t("bedrock") }}</span>
          </v-tooltip>
        </div>
        <div v-else>
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
              >
                <v-icon>{{ svgPath.mdiDotsVertical }}</v-icon>
              </v-btn>
            </template>

            <v-list dense>
              <v-list-item :href="links.mcbbs"
                           rel="noopener noreferrer">
                <v-list-item-icon class="ml-0">
                  <v-icon>{{ svgPath.mdiPost }}</v-icon>
                </v-list-item-icon>
                <v-list-item-text>
                  {{ $t("appbar.mcbbs") }}
                </v-list-item-text>
              </v-list-item>
              <v-list-item :href="links.github"
                           rel="noopener noreferrer">
                <v-list-item-icon class="ml-0">
                  <v-icon>{{ svgPath.mdiGithub }}</v-icon>
                </v-list-item-icon>
                <v-list-item-text>
                  {{ $t("appbar.github") }}
                </v-list-item-text>
              </v-list-item>
              <v-list-item :href="links.disc"
                           rel="noopener noreferrer">
                <v-list-item-icon class="ml-0">
                  <v-icon>{{ svgPath.mdiDisc }}</v-icon>
                </v-list-item-icon>
                <v-list-item-text>
                  {{ $t("appbar.discPack") }}
                </v-list-item-text>
              </v-list-item>
              <langMenu />
              <div class="text-center">（{{ !this.tab ? $t("java") : $t("bedrock") }}）</div>
            </v-list>
          </v-menu>
        </div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" @click="$vuetify.theme.dark = !$vuetify.theme.dark">
              <v-icon v-if="$vuetify.theme.dark">{{ svgPath.mdiBrightness7 }}</v-icon>
              <v-icon v-else>{{ svgPath.mdiBrightness4 }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("appbar.nightModeSwitch") }}</span>
        </v-tooltip>
      </v-app-bar>
      <v-alert
        :color="$vuetify.theme.dark ? 'dark' : 'white'"
        :icon="svgPath.mdiInformationOutline"
        class="mb-0"
        dense
        tile
      >
        {{ $t("alert.main") }}<a href="https://github.com/Teahouse-Studios/mcwzh-meme-web-builder/issues/new">{{ $t("alert.feedback")}}</a>{{ $t("alert.period") }}
      </v-alert>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        fixed-tabs
      >
        <v-tab>
          {{ $t("java") }}
        </v-tab>
        <v-tab>
          {{ $t("bedrock") }}
        </v-tab>
      </v-tabs>

      <v-container>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="inputBasic.format"
                  :items="consts.versions"
                  :hint="$t('form.version.hint')"
                  :label="$t('form.version.label')"
                  persistent-hint
                />
              </v-col>
              <v-col cols="12" sm="4">
                <functional-selector
                  v-model="input.resource"
                  :disabled="fetchListIgnored"
                  :items="consts.je_modules.resource"
                  :loading="loading_backend"
                  :hint="$t('form.resource.hint')"
                  :label="$t('form.resource.label')"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <functional-selector v-model="input.language" :disabled="fetchListIgnored"
                                     :items="consts.je_modules.language" :loading="loading_backend"
                                     :hint="$t('form.language.hint')"
                                     :label="$t('form.resource.label')"
                ></functional-selector>
              </v-col>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.modOption"
                  :items="consts.modOption"
                  :hint="$t('form.mod.option.hint')"
                  :label="$t('form.mod.option.label')"
                  persistent-hint
                />

              </v-col>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.mod"
                  :disabled="input.modOption !== 'custom'"
                  :items="consts.modList"
                  :hint="$t('form.mod.list.hint')"
                  :label="$t('form.mod.list.label')"
                  multiple
                  persistent-hint
                ></v-select>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.beExtType"
                  :items="consts.beExtType"
                  :hint="$t('form.beExtType.hint')"
                  :label="$t('form.beExtType.hint')"
                  persistent-hint
                />
              </v-col>
              <v-col cols="6" sm="6">
                <functional-selector
                  v-model="input.resource"
                  :disabled="fetchListIgnored"
                  :items="consts.be_modules.resource"
                  :loading="loading_backend"
                  :hint="$t('form.resource.hint')" :label="$t('form.resource.label')"/>
              </v-col>
            </v-row>
            <v-checkbox
              v-model="input.compatible"
              class="mb-3"
              :hint="$t('form.compatible.hint')"
              :label="$t('form.compatible.label')"
              persistent-hint
            />
          </v-tab-item>
        </v-tabs-items>
        <v-alert :icon="svgPath.mdiInformationOutline" class="mt-3 mb-3 text-body-2" dense outlined
                 type="info">{{ $t('hints')[hint] }}
        </v-alert>
        <v-btn :disabled="loading" :loading="loading" color="primary" @click="submit">
          <v-icon left>{{ svgPath.mdiCloudDownload }}</v-icon>
            {{ $t("form.submit") }}
        </v-btn>
        <div v-if="logs.length >= 1">
          <v-divider style="margin:15px 0"></v-divider>
          <p ref="logs" class="headline">{{ $t("log.headline") }}</p>
          <v-expansion-panels v-model="logsPanel" multiple>
            <v-expansion-panel v-for="(item,i) in logs" :key="i">
              <v-expansion-panel-header>
                {{ new Date(Number(item.ts)).toLocaleString() }} {{ item.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <pre
                  style="padding-bottom:15px;white-space: pre-wrap;font-family: 'Cascadia Code', 'Fira Code','Consolas', monospace;">{{
                    item.content
                  }}</pre>
                <v-btn v-if="item.filename" :color="$vuetify.theme.dark ? 'white' : 'primary'"
                       outlined @click="open($api + 'builds/' + item.filename)">
                  {{ $t("log.download") }}
                </v-btn>
                <v-btn v-else
                       :color="$vuetify.theme.dark ? 'dark' : ''"
                       dark @click="open(item.github + '/issues/new/choose')">
                  <v-icon left>{{ svgPath.mdiBug }}</v-icon>
                  {{ $t("log.feedback") }}
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <v-divider style="margin:15px 0"></v-divider>
        <v-row class="mb-3">
          <v-col col="12" md="6">
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{ $t("sponsor.overline") }}</div>
                  <v-list-item-title class="headline mb-1">{{ $t("sponsor.spg.headline") }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ $t("sponsor.spg.subtitle") }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar color="grey" size="80" tile>
                  <v-img src="https://www.mcbbs.net/uc_server/data/avatar/002/44/43/78_avatar_big.jpg"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn href="https://www.mcbbs.net/?2444378" rel="noopener noreferrer" text>{{ $t("sponsor.spg.mcbbs") }}
                </v-btn>
                <v-btn href="https://www.mcbbs.net/thread-926724-1-1.html" rel="noopener noreferrer"
                       text>
                  {{ $t("sponsor.spg.dhp") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col col="12" md="6">
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{ $t("sponsor.overline") }}</div>
                  <v-list-item-title class="headline mb-1">{{ $t("sponsor.qiuxi.headline") }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ $t("sponsor.qiuxi.subtitle") }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar color="grey" size="80" tile>
                  <v-img src="./assets/qiuxi.jpg"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn href="https://space.bilibili.com/678013610" rel="noopener noreferrer" text>
                  {{ $t("sponsor.qiuxi.bilibili") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <div :style="$vuetify.theme.dark !== true ? 'color: rgba(0,0,0,.6)' : 'color: rgba(256,256,256,.7)'"
             class="text-body-2 mb-3 pa-1">
          {{ $t("sponsor.disclaimer") }}
        </div>
      </v-container>
      <TeahouseFooter></TeahouseFooter>
    </v-main>
    <help/>
    <v-snackbar v-model="snackbarBuildSucceeded">
      {{ $t("snackbar.buildSucceeded") }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          color="blue"
          text
          @click="snackbarBuildSucceeded = false"
        >
          {{ $t("snackbar.close") }}
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarBuildFailed">
      {{ $t("snackbar.buildFailed") }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          color="red"
          text
          @click="open(links.web_builder + '/issues/new/choose')"
        >
          {{ $t("snackbar.feedback") }}
        </v-btn>
        <v-btn
          v-bind="attrs"
          color="blue"
          text
          @click="snackbarBuildSucceeded = false"
        >
          {{ $t("snackbar.close") }}
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="dialogFetchListFailed"
      width="500"
    >
      <v-card>
        <v-card-title class="headline">{{ $t("dialog.fetchListFailed.headline") }}</v-card-title>
        <v-card-text>
          {{ $t("dialog.fetchListFailed.text") }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="fetchList()"
          >
            {{ $t("dialog.fetchListFailed.retry") }}
          </v-btn>
          <v-btn
            text
            @click="open(links.web_builder + '/issues/new/choose')"
          >
            {{ $t("dialog.fetchListFailed.feedback") }}
          </v-btn>
          <v-btn
            color="error"
            text
            @click="dialogFetchListFailed = false, fetchListIgnored = true, loading_backend = false"
          >
            {{ $t("dialog.fetchListFailed.ignore") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogModuleConflicted"
      width="500"
    >
      <v-card>
        <v-card-title class="headline">{{ $t("dialog.moduleConflicted.headline") }}</v-card-title>
        <v-card-text>
          <p>{{ $t("dialog.moduleConflicted.text.main") }}</p>
          <p>{{ $t("dialog.moduleConflicted.text.conflicted") }}<code>questioning_totem</code> {{ $t("dialog.moduleConflicted.text.and") }} <code>totem_model</code></p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialogModuleConflicted = false"
          >
            {{ $t("dialog.moduleConflicted.fix") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import axios from 'axios'
import functionalSelector from "@/components/functionalSelector";
import help from './components/help'
import langMenu from './components/langMenu'
import {
  mdiPost,
  mdiGithub,
  mdiDisc,
  mdiCloudDownload,
  mdiBug,
  mdiDotsVertical,
  mdiInformationOutline,
  mdiBrightness4,
  mdiBrightness7
} from '@mdi/js'
import TeahouseFooter from '@/components/footer'

export default {
  methods: {
    open(name) {
      window.open(name)
    },
    async fetchList() {
      this.loading_backend = true
      let req;
      try {
        req = await axios.get(this.$api)
      } catch (e) {
        this.dialogFetchListFailed = true
        console.log(e)
        return;
      }
      const backend = req.data
      this.consts = {
        ...this.consts,
        modList: [{header: this.$t("form.mod.header")}].concat(backend.mods).concat({header: this.$t("form.mod.enHeader")})
          .concat(backend.enmods),
        je_modules: backend.je_modules,
        be_modules: backend.be_modules,
      }
      this.loading_backend = false
      this.dialogFetchListFailed = false
    },
    submit() {
      this.loading = true

      if (this.input.resource.includes('questioning_totem') && this.input.resource.includes('totem_model')) {
        this.dialogModuleConflicted = true
        this.loading = false
      } else {
        let data = Object.assign({}, this.inputBasic, {
          _be: this.whetherUseBE,
          modules: {
            language: [...new Set(
              this.input.language.concat(this.inputBasic.format === 3 ? ['attributes', 'old_strings', 'diamond_hoe'] : [])
            )],
            resource: this.input.resource,
            mixed: []
          },
          mod: this.input.mod,
          hash: true,
          type: this.inputBasic.format === 3 ? 'legacy' : 'normal'
        }, this.whetherUseBE && {
          type: this.input.beExtType,
          compatible: this.input.compatible
        })
        console.log(data)
        window.location.host === 'dl.meme.teahou.se' && window.ga && window.ga('send', 'event', this.whetherUseBE ? 'be' : 'je', 'build');
        axios({url: '/ajax', baseURL: this.$api, method: 'POST', data}).then(function (res) {
          console.log(res.data)
          this.logs.unshift({
            title: this.$t("log.buildSucceeded"),
            ts: new Date().valueOf(),
            content: res.data.logs,
            filename: res.data.filename,
            github: this.links.github
          })
          this.logsPanel = this.logsPanel.map(v => v + 1)
          this.logsPanel.unshift(0)
          this.$nextTick(function () {
            this.$refs.logs.scrollIntoView()
          }.bind(this))
          this.snackbarBuildSucceeded = true
          this.loading = false
        }.bind(this)).catch(function (err) {
          this.logs.unshift({
            title: this.$t("log.buildFailed"),
            ts: new Date().valueOf(),
            content: err.toString()
          })
          this.logsPanel = this.logsPanel.map(v => v + 1)
          this.logsPanel.unshift(0)
          this.$nextTick(function () {
            this.$refs.logs.scrollIntoView()
          }.bind(this))
          this.snackbarBuildFailed = true
          this.loading = false
        }.bind(this))
      }
    }
  },
  components: {
    'functional-selector': functionalSelector,
    help,
    langMenu,
    TeahouseFooter
  },
  data: () => ({
    snackbarBuildSucceeded: false,
    snackbarBuildFailed: false,
    dialogFetchListFailed: false,
    dialogModuleConflicted: false,
    fetchListIgnored: false,
    svgPath: {
      mdiPost,
      mdiGithub,
      mdiDisc,
      mdiCloudDownload,
      mdiBug,
      mdiDotsVertical,
      mdiInformationOutline,
      mdiBrightness4,
      mdiBrightness7
    },
    tab: null,
    logsPanel: [],
    loading: false,
    inputBasic: {
      format: 6
    },
    logs: [],
    input: {
      compatible: false,
      modOption: "all",
      mod: [],
      resource: [],
      language: [],
      beExtType: 'mcpack'
    },
    hint: 0,
    loading_backend: true,
    consts: {
      modOption: [{text: "所有", value: "all"}, {value: "none", text: "无"}, {
        value: "custom",
        text: "自定义"
      }],
      beExtType: ['mcpack', 'zip'],
      modList: [], je_modules: [], be_modules: [],
      versions: [{text: '1.16.2+', value: 6}, {text: '1.15 - 1.16.1', value: 5}, {
        text: '1.13 - 1.14.4', value: 4
      }, {
        text: '1.11 - 1.12.2', value: 3
      }]
    }
  }),
  async mounted() {
    let that = this
    setInterval(() => {
      that.hint = that.hint === 3 ? 0 : ++that.hint
    }, 4000)

    this.fetchList()
  },
  computed: {
    whetherUseBE() {
      return this.tab === 1
    },
    links() {
      return {
        web_builder: 'https://github.com/Teahouse-Studios/mcwzh-meme-web-builder',
        github: 'https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack' + (this.tab ? '-bedrock' : ''),
        mcbbs: `https://www.mcbbs.net/thread-${this.tab ? '1005191' : '1004643'}-1-1.html`,
        disc: 'https://dianliang-oss-1301161188.file.myqcloud.com/zh-meme-respack/' + (this.tab ? 'Meme_resourcepack_records.mcpack' : 'record-java.zip')
      }
    }
  },
  watch: {
    tab(newTab) {
      this.input.resource = newTab ? (this.consts.be_modules.resource || []).map(v => v.name) : []
    },
    "$vuetify.theme.dark"(val) {
      localStorage.setItem("memeDarkMode", val);
    }
  },
  created() {
    if (localStorage.getItem("memeInitialized") !== "true") {
      localStorage.setItem("memeDarkMode", window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "true" : "false");
    }
    this.$vuetify.theme.dark = localStorage.getItem("memeDarkMode") === "true"
    this.$i18n.locale = localStorage.getItem("memeLang");
    localStorage.setItem("memeInitialized", "true");
  }
};
</script>
<style>
.v-tabs-items {
  background-color: inherit !important;
}

.v-btn__content .v-icon {
  font-size: 24px;
  height: 24px;
  width: 24px;
}

/* latin */
@font-face {
  font-family: 'Fira Code';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firacode/v9/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_A9sJVD7MOzlojwUKQ.woff) format('woff');
}

/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: local('Roboto Thin'), local('Roboto-Thin'), url(https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxIIzIXKMny.woff2) format('woff2');
}

/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: local('Roboto Light'), local('Roboto-Light'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fBBc4AMP6lQ.woff2) format('woff2');
}

/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
}

/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local('Roboto Medium'), local('Roboto-Medium'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2) format('woff2');
}

/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2) format('woff2');
}

/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: local('Roboto Black'), local('Roboto-Black'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmYUtfBBc4AMP6lQ.woff2) format('woff2');
}
</style>
