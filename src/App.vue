<template>
  <v-app :class="{you: you}">
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
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              @click="you = !you"
            >
              <v-icon>{{
                svgPath.mdiAbTesting
              }}</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("appbar.superSecretSetting") }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            >
              <v-icon v-if="$vuetify.theme.dark">{{
                svgPath.mdiBrightness7
              }}</v-icon>
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
        {{ $t("alert.main")
        }}<a href="https://teahou.se/memepack-1st-anniversary/">{{
          $t("alert.feedback")
        }}</a
        >{{ $t("alert.period") }}
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
                />
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
                />
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
                ></functional-selector>
              </v-col>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.je.modOption"
                  :hint="$t('form.mod.option.hint')"
                  :items="consts.modOption"
                  :label="$t('form.mod.option.label')"
                  :outlined="you"
                  persistent-hint
                />
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
                ></v-select>
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
                </functional-selector>
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
                />
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
                />
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
                </functional-selector>
              </v-col>
            </v-row>
            <v-checkbox
              v-model="input.be.compatible"
              :hint="$t('form.compatible.hint')"
              :label="$t('form.compatible.label')"
              class="mb-3"
              persistent-hint
            />
          </v-tab-item>
        </v-tabs-items>
        <v-alert
          :icon="svgPath.mdiInformationOutline"
          class="mt-3 mb-3 text-body-2"
          dense
          :outlined="!you"
          type="info"
          >{{ $t("hints")[hint] }}
        </v-alert>
        <v-btn
          :disabled="loading"
          :loading="loading"
          color="primary"
          @click="submit"
        >
          <v-icon left>{{ svgPath.mdiCloudDownload }}</v-icon>
          {{ $t("form.submit") }}
        </v-btn>
        <div v-if="logs.length >= 1">
          <v-divider style="margin:15px 0"></v-divider>
          <p ref="logs" class="headline">{{ $t("log.headline") }}</p>
          <v-expansion-panels v-model="logsPanel" multiple>
            <v-expansion-panel v-for="(item, i) in logs" :key="i">
              <v-expansion-panel-header>
                {{ new Date(Number(item.ts)).toLocaleString() }}
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
                      open($api + 'builds/' + item.filename);
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
        <v-row class="mb-3">
          <v-col col="12" md="6">
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{ $t("sponsor.overline") }}</div>
                  <v-list-item-title class="headline mb-1">{{
                    $t("sponsor.spg.headline")
                  }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ $t("sponsor.spg.subtitle") }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar color="grey" size="80" tile>
                  <v-img
                    src="https://www.mcbbs.net/uc_server/data/avatar/002/44/43/78_avatar_big.jpg"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn
                  href="https://www.mcbbs.net/?2444378"
                  rel="noopener noreferrer"
                  text
                  >{{ $t("sponsor.spg.mcbbs") }}
                </v-btn>
                <v-btn
                  href="https://www.mcbbs.net/thread-926724-1-1.html"
                  rel="noopener noreferrer"
                  text
                >
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
                  <v-list-item-title class="headline mb-1">{{
                    $t("sponsor.qiuxi.headline")
                  }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ $t("sponsor.qiuxi.subtitle") }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar color="grey" size="80" tile>
                  <v-img src="./assets/qiuxi.jpg"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn
                  href="https://space.bilibili.com/678013610"
                  rel="noopener noreferrer"
                  text
                >
                  {{ $t("sponsor.qiuxi.bilibili") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mb-3">
          <v-col col="12" md="6">
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{ $t("sponsor.overline") }}</div>
                  <v-list-item-title class="headline mb-1">{{
                    $t("sponsor.kkg.headline")
                  }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ $t("sponsor.kkg.subtitle") }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar color="grey" size="80" tile>
                  <v-img
                    src="https://attachment.mcbbs.net/uc_server/data/avatar/000/01/02/40_avatar_big.jpg"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn
                  href="https://www.mcbbs.net/?10240"
                  rel="noopener noreferrer"
                  text
                  >{{ $t("sponsor.kkg.mcbbs") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col col="12" md="6">
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{ $t("sponsor.overline") }}</div>
                  <v-list-item-title class="headline mb-1">{{
                    $t("sponsor.liu.headline")
                  }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ $t("sponsor.liu.subtitle") }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar color="transparent" size="80" tile>
                  <v-img
                    src="https://avatars.githubusercontent.com/u/65127014"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn
                  href="https://www.wd-ljt.com/"
                  rel="noopener noreferrer"
                  text
                  >{{ $t("sponsor.liu.website") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <div
          :style="
            $vuetify.theme.dark !== true
              ? 'color: rgba(0,0,0,.6)'
              : 'color: rgba(256,256,256,.7)'
          "
          class="text-body-2 mb-3 pa-1"
        >
          {{ $t("sponsor.disclaimer") }}
        </div>
      </v-container>
      <TeahouseFooter></TeahouseFooter>
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
          text
          color="primary"
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
          text
          color="primary"
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
    <v-dialog persistent v-model="dialogFetchListFailed" width="500">
      <v-card>
        <v-card-title class="headline">{{
          $t("dialog.fetchListFailed.headline")
        }}</v-card-title>
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
    <v-dialog v-model="dialogNews" max-width="700px" scrollable v-if="news">
      <v-card>
        <v-card-title>
          梗中新闻 #{{ news.id }} - {{ news.title }}
          <v-btn class="ml-auto" icon @click="newsIgnore()">
            <v-icon>{{ svgPath.mdiClose }}</v-icon>
          </v-btn>
        </v-card-title>
        <v-sheet v-if="news.video" class="v-card--hero mb-4">
          <v-lazy min-height="300">
            <iframe
              class="v-card--hero__iframe"
              :src="news.video"
              scrolling="no"
              border="0"
              frameborder="no"
              framespacing="0"
              allowfullscreen="true"
            >
            </iframe>
          </v-lazy>
        </v-sheet>
        <v-img v-else-if="news.image" :src="news.image" class="mb-4"></v-img>
        <v-divider v-else class="mb-4"></v-divider>
        <v-card-text style="height: 500px;">
          <div v-html="news.content"></div>
          <v-btn v-if="news.detail" :href="news.detail" plain
            ><v-icon left>{{ svgPath.mdiArrowRight }}</v-icon> 阅读更多</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import axios from "axios";
import functionalSelector from "@/components/functionalSelector";
import help from "./components/help";
import langMenu from "./components/langMenu";
import {
  mdiAbTesting,
  mdiArrowRight,
  mdiBrightness4,
  mdiBrightness7,
  mdiBug,
  mdiCloudDownload,
  mdiClose,
  mdiDisc,
  mdiDotsVertical,
  mdiGithub,
  mdiInformationOutline,
  mdiPost,
  mdiShareVariant,
} from "@mdi/js";
import TeahouseFooter from "@/components/footer";
import allowGa from "@/allowGa";

export default {
  methods: {
    newsIgnore() {
      this.dialogNews = false;
      localStorage.memeNewsIgnored = this.news.id;
    },
    share(item) {
      let p = new URLSearchParams();
      p.set("type", item.isBe ? "be" : "je");
      p.set("ver", "1");
      p.set("input", JSON.stringify(this.input[p.get("type")]));
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
    sendHelpTrack(label) {
      allowGa() &&
        window.gtag?.("event", "help", {
          eventCategory: label,
        });
    },
    trackShare(item) {
      allowGa() &&
        window.gtag?.("event", "share", {
          eventLabel: item.filename,
          eventType: item.isBe ? "be" : "je",
        });
    },
    trackBuild(item) {
      allowGa() &&
        window.gtag?.("event", "download", {
          eventLabel: item.filename,
          eventType: item.isBe ? "be" : "je",
        });
    },
    collectionDesc(item) {
      let result = [];
      if (item["contains"]?.resource?.length) {
        result.push(
          `${this.$t("form.collections.description_prefix")}${
            item["contains"]?.resource.length
          }${this.$t("form.collections.resource_suffix")}`
        );
      }
      if (item["contains"]?.language?.length) {
        result.push(
          `${this.$t("form.collections.description_prefix")}${
            item["contains"]?.language.length
          }${this.$t("form.collections.language_suffix")}`
        );
      }
      if (result.length) {
        return `(${result.join(", ")})`;
      }
      return "";
    },
    open(name) {
      window.open(name);
    },
    async fetchList() {
      this.loading_backend = true;
      let req;
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
        modList: [{ header: this.$t("form.mod.header") }]
          .concat(backend.mods)
          .concat({ header: this.$t("form.mod.enHeader") })
          .concat(backend.enmods),
        je_modules: backend.je_modules,
        be_modules: backend.be_modules,
      };
      this.loading_backend = false;
      this.dialogFetchListFailed = false;
      this.input.be.collection = ["no_blue_ui"];
      this.input.je.collection = ["choice_modules_1"];

      let p = new URLSearchParams(window.location.search);
      let type = p.get("type");
      let ver = p.get("ver");
      let inputBasic = p.get("inputBasic");
      let input = p.get("input");
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
        this.input[type] = _input;
        this.inputBasic = _inputBasic;
      }
    },
    submit() {
      this.loading = true;

      const base = this.whetherUseBE
        ? this.consts.be_modules
        : this.consts.je_modules;
      const inputBase = this.whetherUseBE ? this.input.be : this.input.je;
      let data = Object.assign(
        {},
        this.inputBasic,
        {
          _be: this.whetherUseBE,
          modules: {
            language: inputBase.language,
            resource: inputBase.resource.filter(
              (v) => !(base.mixed || []).map((v) => v.name).includes(v)
            ),
            collection: inputBase.collection,
          },
          mod:
            this.input.je.modOption === "all"
              ? ["all"]
              : this.input.je.modOption === "custom"
              ? this.input.je.mod
              : [],
          hash: true,
          type: this.inputBasic.format === 3 ? "legacy" : "normal",
        },
        this.whetherUseBE && {
          type: this.input.be.extType,
          compatible: this.input.be.compatible,
        }
      );
      console.log(data);
      allowGa() &&
        window.gtag?.("event", "build", {
          eventType: this.whetherUseBE ? "be" : "je",
        });
      axios({ url: "/ajax", baseURL: this.$api, method: "POST", data })
        .then(
          function(res) {
            console.log(res.data);
            this.logs.unshift({
              title: this.$t("log.buildSucceeded"),
              ts: new Date().valueOf(),
              content: res.data.logs,
              filename: res.data.filename,
              github: this.links.github,
              isBe: this.whetherUseBE,
            });
            this.logsPanel = this.logsPanel.map((v) => v + 1);
            this.logsPanel.unshift(0);
            this.$nextTick(
              function() {
                this.$refs.logs.scrollIntoView();
              }.bind(this)
            );
            this.snackbarBuildSucceeded = true;
            this.loading = false;
          }.bind(this)
        )
        .catch(
          function(err) {
            this.logs.unshift({
              title: this.$t("log.buildFailed"),
              ts: new Date().valueOf(),
              content: err.toString(),
            });
            this.logsPanel = this.logsPanel.map((v) => v + 1);
            this.logsPanel.unshift(0);
            this.$nextTick(
              function() {
                this.$refs.logs.scrollIntoView();
              }.bind(this)
            );
            this.snackbarBuildFailed = true;
            this.loading = false;
          }.bind(this)
        );
    },
  },
  components: {
    "functional-selector": functionalSelector,
    help,
    langMenu,
    TeahouseFooter,
  },
  data: () => ({
    you: true,
    news: null,
    snackbarBuildSucceeded: false,
    snackbarBuildFailed: false,
    dialogFetchListFailed: false,
    dialogNews: false,
    fetchListIgnored: false,
    shareLinkParsed: false,
    shareCopyedToClipboard: false,
    svgPath: {
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
    },
    tab: null,
    logsPanel: [],
    loading: false,
    inputBasic: {
      format: 6,
    },
    logs: [],
    input: {
      be: {
        extType: "mcpack",
        compatible: false,
        resource: [],
        language: [],
        collection: [],
      },
      je: {
        modOption: "all",
        mod: [],
        resource: [],
        language: [],
        collection: [],
      },
    },
    hint: 0,
    loading_backend: true,
    consts: {
      modOption: [
        { text: "所有", value: "all" },
        { value: "none", text: "无" },
        {
          value: "custom",
          text: "自定义",
        },
      ],
      beExtType: ["mcpack", "zip"],
      modList: [],
      je_modules: {
        resource: [],
        collection: [],
      },
      be_modules: {
        resource: [],
        collection: [],
      },
      versions: [
        { text: "1.16.2+", value: 6 },
        { text: "1.15 - 1.16.1", value: 5 },
        {
          text: "1.13 - 1.14.4",
          value: 4,
        },
        {
          text: "1.11 - 1.12.2",
          value: 3,
        },
      ],
    },
  }),
  async mounted() {
    let that = this;
    setInterval(() => {
      that.hint = that.hint === 3 ? 0 : ++that.hint;
    }, 4000);

    this.fetchList();

    await axios
      .get(
        "https://cdn.jsdelivr.net/gh/Teahouse-Studios/mcwzh-meme-resourcepack@master/news.json"
      )
      .then((response) => (this.news = response.data))
      .then(() => {
        this.dialogNews =
          this.news.id > localStorage.getItem("memeNewsIgnored");
      });
  },
  computed: {
    whetherUseBE() {
      return this.tab === 1;
    },
    fixedItems() {
      const base = this.whetherUseBE
        ? this.consts.be_modules
        : this.consts.je_modules;
      let items = base.collection.filter((v) =>
        this.input[this.whetherUseBE ? "be" : "je"].collection.includes(v.name)
      );
      const data = items.map((v) => v["contains"]).flat();
      return {
        resource: data.filter(
          (v) =>
            !base.resource.find((r) => r.name === v).name.startsWith("lang_")
        ),
        language: data.filter((v) =>
          base.resource.find((r) => r.name === v).name.startsWith("lang_")
        ),
      };
    },
    links() {
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
          ? "https://dianliang-oss-1301161188.file.myqcloud.com/zh-meme-respack/Meme_resourcepack_records.mcpack"
          : "https://wdf.ink/record-java",
      };
    },
  },
  watch: {
    "$vuetify.theme.dark"(val) {
      localStorage.setItem("memeDarkMode", val);
    },
  },
  created() {
    if (localStorage.getItem("memeInitialized") !== "true") {
      localStorage.setItem(
        "memeDarkMode",
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "true"
          : "false"
      );
      localStorage.setItem("memeNewsIgnored", "0");
    }
    this.$vuetify.theme.dark = localStorage.getItem("memeDarkMode") === "true";
    let memeLang = localStorage.getItem("memeLang");
    if (memeLang !== "zhHans" && memeLang !== "zhMeme") {
      localStorage.removeItem("memeLang");
      memeLang = "zhHans";
    }
    this.$i18n.locale = memeLang;
    localStorage.setItem("memeInitialized", "true");
  },
};
</script>
<style lang="scss">
.v-tabs-items {
  background-color: inherit !important;
}

.v-btn__content .v-icon {
  font-size: 24px;
  height: 24px;
  width: 24px;
}

.v-card--hero {
  background: #000;
  border-radius: 6px;
  height: 0;
  margin: 0;
  overflow: hidden;
  padding-bottom: 70%;
  position: relative;
  width: 100%;
}

.v-card--hero__iframe {
  display: block;
  vertical-align: middle;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}


/* Material "NEXT" / "YOU" */
#app.you {
  .v-dialog {
    box-shadow: none;
  }
  .v-menu__content {
    box-shadow: none;
    >.theme--light {
      background: #fafafa;
    }
  }
  .v-card {
    box-shadow: none;
    &.theme--light {
      background: #f8f9fa;
    }
  }
  .v-chip.theme--light {
    background: #efefef;
  }
  .primary {
    background-color: #4285F4 !important;
  }
  .v-btn--is-elevated {
    box-shadow: none;
  }
  .v-sheet.v-card {
    border-radius: 12px;
  }
  .v-app-bar.theme--light {
    background: #f8f9fa !important;
  }
  .v-alert.theme--light {
    background: #fafafa !important;
  }
  .info {
    &.theme--light {
      background-color: #4f90f7 !important;
    }
    &.theme--dark {
      background: #4285f4 !important;
    }
  }
  .v-btn:not(.v-btn--fab) {
    border-radius: 24px;
  }
  .v-expansion-panel {
    &::before {
      box-shadow: none;
    }
    &.theme--light {
      background: #f8f9fa;
    }
    border-radius: 12px;
  }
}
.theme--light.v-btn.v-btn--icon {
  color: inherit;
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
