<template>
  <v-app :class="{ you: you }">
    <v-main>
      <v-app-bar :color="$vuetify.theme.dark ? 'dark' : 'white'" flat>
        <v-toolbar-title>{{ $t("appbar.title") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="$vuetify.breakpoint.name !== 'xs'">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-btn :href="links.mcbbs" rel="noopener noreferrer" text>
                  <v-icon left>{{ svgPath.mdiPost }}</v-icon>
                  {{ $t("appbar.mcbbs") }}
                </v-btn>
                <v-btn :href="links.github" rel="noopener noreferrer" text>
                  <v-icon left>{{ svgPath.mdiGithub }}</v-icon>
                  {{ $t("appbar.github") }}
                </v-btn>
                <v-btn :href="links.disc" rel="noopener noreferrer" text>
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
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon>{{ svgPath.mdiDotsVertical }}</v-icon>
              </v-btn>
            </template>

            <v-list dense>
              <v-list-item :href="links.mcbbs" rel="noopener noreferrer">
                <v-list-item-icon class="ml-0">
                  <v-icon>{{ svgPath.mdiPost }}</v-icon>
                </v-list-item-icon>
                <v-list-item-text>
                  {{ $t("appbar.mcbbs") }}
                </v-list-item-text>
              </v-list-item>
              <v-list-item :href="links.github" rel="noopener noreferrer">
                <v-list-item-icon class="ml-0">
                  <v-icon>{{ svgPath.mdiGithub }}</v-icon>
                </v-list-item-icon>
                <v-list-item-text>
                  {{ $t("appbar.github") }}
                </v-list-item-text>
              </v-list-item>
              <v-list-item :href="links.disc" rel="noopener noreferrer">
                <v-list-item-icon class="ml-0">
                  <v-icon>{{ svgPath.mdiDisc }}</v-icon>
                </v-list-item-icon>
                <v-list-item-text>
                  {{ $t("appbar.discPack") }}
                </v-list-item-text>
              </v-list-item>
              <langMenu />
              <div class="text-center">
                （{{ !this.tab ? $t("java") : $t("bedrock") }}）
              </div>
            </v-list>
          </v-menu>
        </div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon @click="you = !you">
              <v-icon>{{ svgPath.mdiAbTesting }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("appbar.superSecretSetting") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon @click="toggleApi">
              <v-icon>{{
                $api === "https://meme.wd-api.com"
                  ? svgPath.mdiLanguagePython
                  : svgPath.mdiLanguageTypescript
              }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("appbar.endpointSetting") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            >
              <v-icon v-if="$vuetify.theme.dark"
                >{{ svgPath.mdiBrightness7 }}
              </v-icon>
              <v-icon v-else>{{ svgPath.mdiBrightness4 }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("appbar.nightModeSwitch") }}</span>
        </v-tooltip>
      </v-app-bar>
      <v-alert
        v-for="a in alerts"
        :key="a.name"
        :color="$vuetify.theme.dark ? 'dark' : 'white'"
        :icon="svgPath.mdiInformationOutline"
        class="mb-0"
        dense
        tile
      >
        <span v-html="a.message"></span>
      </v-alert>
      <v-tabs v-model="tab" background-color="transparent" fixed-tabs>
        <v-tab>
          {{ $t("java") }}
        </v-tab>
        <v-tab>
          {{ $t("bedrock") }}
        </v-tab>
      </v-tabs>

      <v-container>
        <v-tabs-items v-model="tab" class="pt-2">
          <v-tab-item>
            <v-row>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="inputBasic.format"
                  :hint="$t('form.version.hint')"
                  :items="consts.versions"
                  :label="$t('form.version.label')"
                  :outlined="you"
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
                  :hint="$t('form.resource.hint')"
                  :items="
                    consts.je_modules.resource.filter(
                      (v) => !v.name.startsWith('lang_')
                    )
                  "
                  :label="$t('form.resource.label')"
                  :loading="loading_backend"
                  :outlined="you"
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
                  :hint="$t('form.language.hint')"
                  :items="
                    consts.je_modules.resource.filter((v) =>
                      v.name.startsWith('lang_')
                    )
                  "
                  :label="$t('form.language.label')"
                  :loading="loading_backend"
                  :outlined="you"
                >
                  <template #prepend>
                    <v-icon>{{ svgPath.mdiCog }}</v-icon>
                  </template>
                </functional-selector>
              </v-col>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.je.modOption"
                  :hint="$t('form.mod.option.hint')"
                  :items="modOption"
                  :label="$t('form.mod.option.label')"
                  :outlined="you"
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
                  :hint="$t('form.mod.list.hint')"
                  :items="consts.modList"
                  :label="$t('form.mod.list.label')"
                  :outlined="you"
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
                  :hint="$t('form.collections.hint')"
                  :items="consts.je_modules.collection"
                  :label="$t(`form.collections.label`)"
                  :outlined="you"
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
                  :hint="
                    inputBasic.format === 3
                      ? $t('form.compatible.disabled')
                      : $t('form.compatible.hint')
                  "
                  :label="$t('form.compatible.label')"
                  class="mt-n2"
                  persistent-hint
                />
              </v-col>
              <v-col cols="12">
                <v-slider
                  v-model="input.je.child"
                  :tick-labels="$t('form.child.ticks')"
                  :max="2"
                  :label="$t('form.child.label')"
                  step="1"
                  ticks="always"
                  tick-size="3"
                  :hint="$t('form.child.hints')[input.je.child]"
                  persistent-hint
                >
                  <template #prepend>
                    <v-icon>{{ svgPath.mdiAccountChildCircle }}</v-icon>
                  </template>
                </v-slider>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.be.extType"
                  :hint="$t('form.beExtType.hint')"
                  :items="consts.beExtType"
                  :label="$t('form.beExtType.label')"
                  :outlined="you"
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
                  :hint="$t('form.resource.hint')"
                  :items="consts.be_modules.resource"
                  :label="$t('form.resource.label')"
                  :loading="loading_backend"
                  :outlined="you"
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
                  :hint="$t('form.collections.hint')"
                  :items="consts.be_modules.collection"
                  :label="$t(`form.collections.label`)"
                  :outlined="you"
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
                  :hint="$t('form.compatible.hint')"
                  :label="$t('form.compatible.label')"
                  persistent-hint
                />
              </v-col>
              <v-col cols="12">
                <v-slider
                  v-model="input.be.child"
                  :tick-labels="$t('form.child.ticks')"
                  :max="2"
                  :label="$t('form.child.label')"
                  step="1"
                  ticks="always"
                  tick-size="3"
                  :hint="$t('form.child.hints')[input.be.child]"
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
              <i18n
                for="bedrock_hint.readme"
                path="bedrock_hint.text"
                tag="label"
              >
                <a
                  href="https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack-bedrock"
                  rel="nofollow noopener"
                  target="_blank"
                  >{{ $t("bedrock_hint.readme") }}</a
                >
              </i18n>
            </p>
          </v-tab-item>
        </v-tabs-items>
        <v-alert
          :icon="svgPath.mdiInformationOutline"
          :outlined="!you"
          class="mt-3 mb-3 text-body-2"
          dense
          type="info"
          >{{ $t("hints")[hint] }}
        </v-alert>
        <div>
          <v-btn
            :disabled="loading"
            :loading="loading"
            color="primary"
            @click="submit"
          >
            <v-icon left>{{ svgPath.mdiCloudDownload }}</v-icon>
            {{ $t("form.submit") }}
          </v-btn>
          <p
            v-if="consts.be_modified && consts.je_modified"
            class="ml-2 caption"
            style="display:inline-block;vertical-align: middle; margin: auto"
          >
            {{ $t("form.modified") }}
            {{
              new Date(
                tab === 0 ? consts.je_modified : consts.be_modified
              ).toLocaleString($t("metadata.dateLocale".toString()))
            }}
          </p>
        </div>
        <div v-if="logs.length >= 1">
          <v-divider style="margin:15px 0"></v-divider>
          <p ref="logs" class="headline">{{ $t("log.headline") }}</p>
          <v-expansion-panels v-model="logsPanel" multiple>
            <v-expansion-panel v-for="(item, i) in logs" :key="i">
              <v-expansion-panel-header>
                {{
                  new Date(Number(item.ts)).toLocaleString(
                    $t("metadata.dateLocale".toString())
                  )
                }}
                {{ item.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <pre
                  style="padding-bottom:15px;white-space: pre-wrap;font-family: 'Cascadia Code', 'Fira Code','Consolas', monospace;"
                  >{{ item.content }}</pre
                >
                <v-btn
                  v-if="item.filename"
                  :color="$vuetify.theme.dark ? 'white' : 'primary'"
                  outlined
                  @click="
                    () => {
                      open(item.root + item.filename);
                      trackBuild(item);
                    }
                  "
                >
                  <v-icon left>{{ svgPath.mdiCloudDownload }}</v-icon>
                  {{ $t("log.download") }}
                </v-btn>
                <v-btn
                  v-if="item.filename"
                  :color="$vuetify.theme.dark ? 'white' : 'primary'"
                  class="ml-2"
                  icon
                  @click="
                    () => {
                      share(item);
                      trackShare(item);
                    }
                  "
                >
                  <v-icon>{{ svgPath.mdiShareVariant }}</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  :color="$vuetify.theme.dark ? 'dark' : ''"
                  dark
                  @click="open(item.github + '/issues/new/choose')"
                >
                  <v-icon left>{{ svgPath.mdiBug }}</v-icon>
                  {{ $t("log.feedback") }}
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <v-divider style="margin:15px 0"></v-divider>
        <Sponsors />
      </v-container>
      <teahouse-footer />
    </v-main>
    <help ref="help" />
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
    <v-snackbar v-model="shareLinkParsed">
      {{ $t("snackbar.shareLinkParsed") }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          color="primary"
          text
          @click="shareLinkParsed = false"
        >
          {{ $t("snackbar.close") }}
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="shareCopyedToClipboard">
      {{ $t("snackbar.shareCopyedToClipboard") }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          color="primary"
          text
          @click="shareCopyedToClipboard = false"
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
    <v-dialog v-model="dialogFetchListFailed" persistent width="500">
      <v-card>
        <v-card-title class="headline"
          >{{ $t("dialog.fetchListFailed.headline") }}
        </v-card-title>
        <v-card-text>
          {{ $t("dialog.fetchListFailed.text") }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="fetchList()">
            {{ $t("dialog.fetchListFailed.retry") }}
          </v-btn>
          <v-btn
            text
            @click="(dialogFetchListFailed = false), ($refs.help.dialog = true)"
          >
            {{ $t("dialog.fetchListFailed.feedback") }}
          </v-btn>
          <v-btn
            color="error"
            text
            @click="
              (dialogFetchListFailed = false),
                (fetchListIgnored = true),
                (loading_backend = false)
            "
          >
            {{ $t("dialog.fetchListFailed.ignore") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <news />
    <webview />
  </v-app>
</template>
<script lang="ts">
import "./app.scss";
import axios, { AxiosResponse } from "axios";
import functionalSelector from "@/components/functionalSelector.vue";
import help from "./components/help.vue";
import langMenu from "./components/langMenu.vue";
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
} from "@mdi/js";
import footer from "./components/footer.vue";
import allowGa, { gtag } from "@/allowGa";
import sponsors from "./components/sponsors.vue";
import webview from "./components/webview.vue";
import news from "./components/news.vue";
import Vue from "vue";
import { ICollection, ILog, IReq, IResource, IResp } from "@/types";

export default Vue.extend({
  methods: {
    toggleApi() {
      const newApi =
        this.$api === "https://meme.wd-api.com"
          ? "https://meme-ts.wd-api.com"
          : "https://meme.wd-api.com";
      this.$api = newApi;
      localStorage.setItem("api", newApi);
    },
    share(item: ILog) {
      let p = new URLSearchParams();
      const type = item.isBe ? "be" : "je";
      p.set("type", type);
      p.set("ver", "1");
      p.set("input", JSON.stringify(this.input[type]));
      p.set("inputBasic", JSON.stringify(this.inputBasic));
      let path = `${
        window.location.href.split("#")[0].split("?")[0]
      }?${p.toString()}`;
      let shareContent = {
        title: "梗体中文构建配置分享",
        text: "你的好友给你分享了 ta 的配置！",
        url: path,
      };
      if (navigator.share) {
        navigator.share(shareContent);
      } else {
        navigator.clipboard.writeText(path);
        this.shareCopyedToClipboard = true;
      }
    },
    sendHelpTrack(label: string) {
      allowGa() &&
        gtag?.("event", "help", {
          eventCategory: label,
        });
    },
    trackShare(item: { filename: string; isBe: boolean }) {
      allowGa() &&
        gtag?.("event", "share", {
          eventLabel: item.filename,
          eventType: item.isBe ? "be" : "je",
        });
    },
    trackBuild(item: { filename: string; isBe: boolean }) {
      allowGa() &&
        gtag?.("event", "download", {
          eventLabel: item.filename,
          eventType: item.isBe ? "be" : "je",
        });
    },
    collectionDesc(item: ICollection) {
      return `(${this.$t("form.collections.description_prefix")}${
        item["contains"].length
      }${this.$t("form.collections.resource_suffix")})`;
    },
    open(name: string) {
      window.open(name);
    },
    async fetchList() {
      this.loading_backend = true;
      let req: AxiosResponse<IResp>;
      try {
        req = await axios.get(this.$api);
      } catch (e) {
        this.dialogFetchListFailed = true;
        console.log(e);
        return;
      }
      const backend = req.data;
      this.consts = {
        ...this.consts,
        // @ts-ignore
        modList: [{ header: this.$t("form.mod.header").toString() }]
          // @ts-ignore
          .concat(backend.mods)
          .concat({ header: this.$t("form.mod.enHeader").toString() })
          // @ts-ignore
          .concat(backend.enmods),
        je_modules: backend.je_modules,
        be_modules: backend.be_modules,
      };
      this.loading_backend = false;
      this.dialogFetchListFailed = false;
      this.input.be.collection = ["choice_modules_1"];
      this.input.je.collection = ["choice_modules_1"];

      let p = new URLSearchParams(window.location.search);
      let type = p.get("type") as string;
      let ver = p.get("ver");
      let inputBasic = p.get("inputBasic");
      let input = p.get("input") as "be" | "je";
      if (["je", "be"].includes(type) && inputBasic && ver === "1") {
        let _inputBasic, _input;
        try {
          _inputBasic = JSON.parse(inputBasic);
          _input = JSON.parse(input);
        } catch (e) {
          return;
        }
        this.shareLinkParsed = true;
        this.tab = type === "je" ? 0 : 1;
        // @ts-ignore
        this.input[type] = _input;
        this.inputBasic = _inputBasic;
      }

      this.consts.be_modified = backend.be_modified;
      this.consts.je_modified = backend.je_modified;
    },
    async submit() {
      this.loading = true;

      const inputBase = this.whetherUseBE ? this.input.be : this.input.je;

      let packType: "normal" | "legacy" | "compat" = "normal";
      if (this.inputBasic.format === 3) {
        packType = "legacy";
      } else if (this.input.je.compatible) {
        packType = "compat";
      }

      let resource: string[] = inputBase.resource.concat(inputBase.language);

      switch (inputBase.child) {
        case 0: // 13+
          if (!resource.includes("lang_sfw")) {
            resource.push("lang_sfw");
          }
          if (!resource.includes("lang_sfc")) {
            resource.push("lang_sfc");
          }
          break;
        case 1: // 16+
          if (!resource.includes("lang_sfw")) {
            resource.push("lang_sfw");
          }
          if (resource.includes("lang_sfc")) {
            resource = resource.filter((item) => item !== "lang_sfc");
          }
          break;
        case 2: // 18+
          if (resource.includes("lang_sfw")) {
            resource = resource.filter((item) => item !== "lang_sfw");
          }
          if (resource.includes("lang_sfc")) {
            resource = resource.filter((item) => item !== "lang_sfc");
          }
          break;
      }

      let data: IReq = Object.assign(
        {
          format: this.inputBasic.format,
          _be: this.whetherUseBE,
          modules: {
            resource: resource,
            collection: inputBase.collection,
          },
          mod:
            this.input.je.modOption === "all"
              ? ["all"]
              : this.input.je.modOption === "custom"
              ? this.input.je.mod
              : [],
          type: packType,
        },
        this.whetherUseBE && {
          type: this.input.be.extType,
          compatible: this.input.be.compatible,
        }
      );
      console.log(data);
      allowGa() &&
        gtag?.("event", "build", {
          eventType: this.whetherUseBE ? "be" : "je",
        });
      const that = this;
      axios({ url: "/ajax", baseURL: this.$api, method: "POST", data })
        .then((res) => {
          console.log(res.data);
          that.logs.unshift({
            title: that.$t("log.buildSucceeded") as string,
            ts: new Date().valueOf(),
            content: res.data.logs,
            filename: res.data.filename,
            root: res.data.root,
            github: that.links.github,
            isBe: that.whetherUseBE,
          });
          that.logsPanel = that.logsPanel.map((v) => v + 1);
          that.logsPanel.unshift(0);
          that.$nextTick(() => {
            (that.$refs.logs as Element).scrollIntoView();
          });

          that.snackbarBuildSucceeded = true;
          that.loading = false;
        })
        .catch((err) => {
          that.logs.unshift({
            title: that.$t("log.buildFailed") as string,
            ts: new Date().valueOf(),
            content: err.response.data.logs || err.toString(),
          });
          that.logsPanel = that.logsPanel.map((v) => v + 1);
          that.logsPanel.unshift(0);
          that.$nextTick(() => {
            (that.$refs.logs as Element).scrollIntoView();
          });
          that.snackbarBuildFailed = true;
          that.loading = false;
        });
    },
  },
  components: {
    Sponsors: sponsors,
    "functional-selector": functionalSelector,
    help,
    langMenu,
    "teahouse-footer": footer,
    webview,
    news,
  },
  data: () => ({
    $api: "",
    you: false,
    alerts: [],
    snackbarBuildSucceeded: false,
    snackbarBuildFailed: false,
    dialogFetchListFailed: false,
    fetchListIgnored: false,
    shareLinkParsed: false,
    shareCopyedToClipboard: false,
    svgPath: {
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
    },
    tab: 0 as 0 | 1,
    logsPanel: [] as number[],
    loading: false,
    inputBasic: {
      format: 7,
    },
    logs: [] as ILog[],
    input: {
      be: {
        extType: "mcpack",
        compatible: false,
        resource: [] as string[],
        language: [] as string[],
        collection: [] as string[],
        child: 0,
      },
      je: {
        modOption: "all",
        compatible: false,
        mod: [] as string[],
        resource: [] as string[],
        language: [] as string[],
        collection: [] as string[],
        child: 1,
      },
    },
    hint: 0,
    loading_backend: true,
    consts: {
      je_modified: 0,
      be_modified: 0,
      beExtType: ["mcpack", "zip"],
      modList: [] as {
        text: string | number | object;
        value: string | number | object;
        disabled: boolean;
        divider: boolean;
        header: string;
      }[],
      je_modules: {
        resource: [] as IResource[],
        collection: [] as ICollection[],
      },
      be_modules: {
        resource: [] as IResource[],
        collection: [] as ICollection[],
      },
      versions: [
        { text: "1.17+", value: 7 },
        { text: "1.16.2 - 1.16.5", value: 6 },
        { text: "1.15 - 1.16.1", value: 5 },
        { text: "1.13 - 1.14.4", value: 4 },
        { text: "1.11 - 1.12.2", value: 3 },
      ],
    },
  }),
  beforeMount() {
    if (process.env.NODE_ENV === "production") {
      const endpoint = {
        py: "https://meme.wd-api.com",
        ts: "https://meme-ts.wd-api.com",
      };
      let local = localStorage.getItem("api")?.toString() || "";
      let using = Object.values(endpoint).includes(local)
        ? local
        : endpoint["ts"];
      this.$api = using;
    } else {
      this.$api = "http://localhost:8000";
    }
  },
  async mounted() {
    let that = this;
    setInterval(() => {
      that.hint = that.hint === 3 ? 0 : ++that.hint;
    }, 4000);

    this.fetchList();

    await axios
      .get(
        "https://cdn.jsdelivr.net/gh/Teahouse-Studios/mcwzh-meme-resourcepack@master/alerts.json"
      )
      .then((response) => (this.alerts = response.data));
  },
  computed: {
    modOption(): Record<string, string>[] {
      return [
        { text: this.$t("form.modOption.all").toString(), value: "all" },
        { value: "none", text: "无" },
        {
          value: "custom",
          text: "自定义",
        },
      ];
    },
    whetherUseBE(): boolean {
      return this.tab === 1;
    },
    fixedItems(): {
      resource: string[];
      language: string[];
    } {
      // @ts-ignore
      const base = this.whetherUseBE
        ? this.consts.be_modules
        : this.consts.je_modules;
      const childBase = this.whetherUseBE
        ? this.input.be.child
        : this.input.je.child;
      let child: string[] = [];
      switch (childBase) {
        case 0: // 13+
          child = ["lang_sfc", "lang_sfw"];
          break;
        case 1: // 16+
          child = ["lang_sfw"];
          break;
      }
      let items = base.collection.filter((v) =>
        // @ts-ignore
        this.input[this.whetherUseBE ? "be" : "je"].collection.includes(v.name)
      );
      const data = items.map((v) => v["contains"]).flat();
      return {
        resource: data
          .filter(
            (v) =>
              !base.resource.find((r) => r.name === v)!.name.startsWith("lang_")
          )
          .concat(child),
        language: data
          .filter((v) =>
            base.resource.find((r) => r.name === v)!.name.startsWith("lang_")
          )
          .concat(child),
      };
    },
    links(): {
      web_builder: string;
      github: string;
      mcbbs: string;
      disc: string;
    } {
      return {
        web_builder:
          "https://github.com/Teahouse-Studios/mcwzh-meme-web-builder",
        github:
          "https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack" +
          (this.tab ? "-bedrock" : ""),
        mcbbs: `https://www.mcbbs.net/thread-${
          this.tab ? "1005191" : "1004643"
        }-1-1.html`,
        disc: this.tab
          ? "https://wdf.ink/record-bedrock"
          : "https://wdf.ink/record-java",
      };
    },
  },
  watch: {
    "$vuetify.theme.dark"(val) {
      localStorage.setItem("memeDarkMode", val);
    },
    you(val) {
      localStorage.setItem("memeYou", val);
    },
    "inputBasic.format"(val) {
      if (val === 3) {
        this.input.je.compatible = true;
      }
    },
  },
  created() {
    if (
      localStorage.getItem("memeYou") !== "true" &&
      localStorage.getItem("memeYou") !== "false"
    ) {
      localStorage.setItem(
        "memeYou",
        (Math.round(Math.random()) ? true : false).toString()
      ); // A/B testing
    }
    if (localStorage.getItem("memeInitialized") !== "true") {
      localStorage.setItem(
        "memeDarkMode",
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "true"
          : "false"
      );
      localStorage.setItem("memeNewsIgnored", "0");
      localStorage.setItem(
        "memeYou",
        (Math.round(Math.random()) ? true : false).toString()
      );
    }
    this.$vuetify.theme.dark = localStorage.getItem("memeDarkMode") === "true";
    let memeLang = localStorage.getItem("memeLang");
    if (memeLang !== "zhHans" && memeLang !== "zhMeme" && memeLang !== "en") {
      localStorage.removeItem("memeLang");
      memeLang = "zhHans";
    }
    this.$i18n.locale = memeLang;
    if (localStorage.getItem("memeYou") === "true") {
      this.you = true;
    }
    localStorage.setItem("memeInitialized", "true");
  },
});
</script>
