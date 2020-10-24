<template>
  <v-app>
    <v-main>
      <v-app-bar
        color="white" flat
        outlined
      >
        <v-toolbar-title>梗体中文 · 在线构建</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="$vuetify.breakpoint.name !== 'xs'">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs"
                   v-on="on">
                <v-btn :href="links.mcbbs" rel="noopener noreferrer" text>
                  <v-icon left>mdi-post</v-icon>
                  MCBBS
                </v-btn>
                <v-btn :href="links.github" rel="noopener noreferrer"
                       text>
                  <v-icon left>mdi-github</v-icon>
                  GitHub
                </v-btn>
                <v-btn :href="links.disc" rel="noopener noreferrer"
                       text>
                  <v-icon left>mdi-disc</v-icon>
                  唱片包
                </v-btn>
              </div>
            </template>
            <span>{{ !this.tab ? 'Java' : '基岩' }}版</span>
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
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense>
              <v-list-item :href="links.mcbbs"
                           rel="noopener noreferrer">
                <v-list-item-icon class="ml-0">
                  <v-icon>mdi-post</v-icon>
                </v-list-item-icon>
                <v-list-item-text>
                  MCBBS
                </v-list-item-text>
              </v-list-item>
              <v-list-item :href="links.github"
                           rel="noopener noreferrer">
                <v-list-item-icon class="ml-0">
                  <v-icon>mdi-github</v-icon>
                </v-list-item-icon>
                <v-list-item-text>
                  GitHub
                </v-list-item-text>
              </v-list-item>
              <v-list-item :href="links.disc"
                           rel="noopener noreferrer">
                <v-list-item-icon class="ml-0">
                  <v-icon>mdi-disc</v-icon>
                </v-list-item-icon>
                <v-list-item-text>
                  唱片包
                </v-list-item-text>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-app-bar>
      <v-alert
        dense
        tile
        type="info"
      >
        在线构建尚处于测试阶段。若您发现了任何问题或想提出建议，欢迎进行<a class="blue--text text--lighten-5"
                                           href="https://github.com/Teahouse-Studios/mcwzh-meme-web-builder/issues/new">反馈</a>。
      </v-alert>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        fixed-tabs
      >
        <v-tab>
          Java版
        </v-tab>
        <v-tab>
          基岩版
        </v-tab>
      </v-tabs>

      <v-container v-if="consts !== null" class="mb-12">
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="inputBasic.format"
                  :items="consts.versions"
                  hint="选择您游玩的游戏版本区间。"
                  label="游戏版本"
                  persistent-hint
                />
              </v-col>
              <v-col cols="12" sm="4">
                <functional-selector
                  v-model="input.resource"
                  :items="consts.je_modules.resource"
                  hint="请选择您需要的附加内容模块。" label="附加内容/材质选择"/>
              </v-col>
              <v-col cols="12" sm="4">
                <functional-selector v-model="input.language" :items="consts.je_modules.language"
                                     hint="请选择您需要的旧/特殊版本字符串。" label="语言选择"
                ></functional-selector>
              </v-col>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.modOption"
                  :items="consts.modOption"
                  hint="您是否需要Mod支持？"
                  label="Mod内容选择"
                  persistent-hint
                />

              </v-col>
              <v-col cols="6" sm="6">
                <v-select
                  v-model="input.mod"
                  :disabled="input.modOption !== 'custom'"
                  :items="consts.modList"
                  hint="请选择您需要的Mod。"
                  label="Mod内容选择"
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
                  hint="请选择您需要的附加包格式。"
                  label="附加包格式"
                  persistent-hint
                />
              </v-col>
              <v-col cols="6" sm="6">
                <functional-selector
                  v-model="input.resource"
                  :items="consts.be_modules.resource"
                  hint="请选择您需要的附加内容模块。" label="附加内容/材质选择"/>
              </v-col>
            </v-row>
            <v-checkbox
              v-model="input.compatible"
              class="mb-3"
              hint="使此附加包与其他附加包兼容。此选项只会生成zh_CN.lang，因此在选项中只需选择简体中文即可体验。"
              label="使用兼容选项"
              persistent-hint
            />
          </v-tab-item>
        </v-tabs-items>
        <v-alert class="mt-3 mb-3 text-body-2" dense icon="mdi-information-outline" outlined
                 type="info"> {{ consts.hints[hint] }}
        </v-alert>
        <v-btn :disabled="loading" :loading="loading" color="primary" @click="submit">
          <v-icon left>mdi-cloud-download</v-icon>
          提交构建选项
        </v-btn>
        <div v-if="logs.length >= 1">
          <v-divider style="margin:15px 0"></v-divider>
          <p ref="logs" class="headline">构建日志</p>
          <v-expansion-panels v-model="logsPanel" multiple>
            <v-expansion-panel v-for="(item,i) in logs" :key="i">
              <v-expansion-panel-header>
                {{ new Date(Number(item.ts)).toLocaleString() }} {{ item.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <pre
                  style="padding-bottom:15px;white-space: pre-wrap;font-family: 'Cascadia Code', 'Fira Code','Consolas', monospace;">  {{ item.content }}  </pre>
                <v-btn v-if="item.filename" color="indigo"
                       outlined @click="open('builds/' + item.filename)">
                  下载
                </v-btn>
                <v-btn v-else
                       color="black"
                       dark @click="open(item.github + '/issues/new/choose')">
                  <v-icon left>mdi-bug</v-icon>
                  反馈
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
                  <div class="overline mb-4">SPONSOR</div>
                  <v-list-item-title class="headline mb-1">梗体中文 由 SPGoding 赞助</v-list-item-title>
                  <v-list-item-subtitle>SPGoding 是一位 Mojira 管理员、MCBBS 艺术家，代表作《大憨批》VSCode 插件。ta
                    热心的赠送了梗体中文 7 天的 MCBBS 广告位。
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar color="grey" size="80" tile>
                  <v-img src="https://www.mcbbs.net/uc_server/data/avatar/002/44/43/78_avatar_big.jpg"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn href="https://www.mcbbs.net/?2444378" rel="noopener noreferrer" text>MCBBS 资料页
                </v-btn>
                <v-btn href="https://www.mcbbs.net/thread-926724-1-1.html" rel="noopener noreferrer"
                       text>《大憨批》介绍
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col col="12" md="6">
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">SPONSOR</div>
                  <v-list-item-title class="headline mb-1">梗体中文 由 是秋夕呀mua 赞助</v-list-item-title>
                  <v-list-item-subtitle>是秋夕呀mua 是一位 Bilibili UP 主。她向她的 10w+ 粉丝<a
                    href="https://www.bilibili.com/video/BV1Vt4y1v7jP">推荐了梗体中文</a>。
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar color="grey" size="80" tile>
                  <v-img src="static/qiuxi.jpg"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn href="https://space.bilibili.com/678013610" rel="noopener noreferrer" text>
                  Bilibili 主页
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-body-2 mb-3 pa-1" style="color: rgba(0,0,0,.6);">这些赞助者均未给予 Teahouse Studios
          梗体中文团队真实金钱，亦未强迫 Teahouse Studios
          梗体中文团队将其添加至赞助者列表——这只是 Teahouse Studios 梗体中文团队对他们的支持最诚挚的感谢。❤️
        </div>
      </v-container>
    </v-main>
    <v-dialog v-model="dialog" max-width="700px" scrollable>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on" bottom color="primary" fab fixed
          large
          right
        >
          <v-icon class="rotate-question">mdi-help</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          帮助 & 关于
          <v-btn class="ml-auto" icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text style="height: 500px;">
          <h2 class="text-h5 mb-1">你是否有很多问号?¿?¿?¿</h2>
          <p class="text-body-1">
            在问问题前，先想想！
          <ul>
            <li>你是否已经读过每一个选项框下方的提示？</li>
            <li>你是否阅读过下载按钮前面的滚动提示？</li>
            <li>有没有考虑过是你自己游戏、Mod的问题？</li>
          </ul>
          </p>
          <p class="text-body-1">
            如果你确信梗体中文有问题，你便可以向我们汇报。如果你有一个建议，也是可以的！
          </p>
          <p class="text-body-1">
            你需要知道的是：
          <ul>
            <li>根据协议，开发者没有义务解决每一个问题。</li>
            <li>请确保你提交的问题没有被他人提交过。</li>
            <li>请使用正式的普通话。</li>
            <li>过多的垃圾问题可能导致你被封禁。</li>
            <li>请在对应的项目提出对应的问题。</li>
          </ul>
          </p>
          <p class="text-body-1">
            好了，准备好提交问题了吗？
          </p>
          <p class="text-body-1">
            <v-btn class="mr-1 mb-1"
                   href="https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack/issues/new/choose"
                   target="_blank">
              Java版
            </v-btn>
            <v-btn class="mr-1 mb-1"
                   href="https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack-bedrock/issues/new/choose"
                   target="_blank">
              基岩版
            </v-btn>
            <v-btn class="mr-1 mb-1"
                   href="https://github.com/Teahouse-Studios/mcwzh-meme-web-builder/issues/new/choose"
                   target="_blank">
              在线构建
            </v-btn>
          </p>
          <h2 class="text-h5 mb-1">开发者</h2>
          <v-list>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">_LittleC_</v-list-item-title>
                <v-list-item-subtitle>
                  梗体中文资源包构建系统核心开发者，梗体中文在线构建前端核心开发者。
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">MysticNebula70</v-list-item-title>
                <v-list-item-subtitle>
                  梗体中文资源包构建系统核心开发者，梗体中文在线构建后端核心开发者。
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">LakeJason</v-list-item-title>
                <v-list-item-subtitle>
                  梗体中文资源包构建系统早期开发者，梗体中文在线构建早期核心开发者。
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">Dianliang233</v-list-item-title>
                <v-list-item-subtitle>
                  梗体中文在线构建前端开发者。
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <h2 class="text-h5 mb-1">由以下技术驱动</h2>
          <p class="text-body-1">
            <v-btn class="mr-1" href="https://github.com/Teahouse-Studios/mcwzh-meme-web-builder" icon target="_blank">
              <v-icon>mdi-github</v-icon>
            </v-btn>
            <v-btn class="mr-1" href="https://analytics.google.com/analytics/web/" icon target="_blank">
              <v-icon>mdi-google-analytics</v-icon>
            </v-btn>
            <v-btn class="mr-1" href="https://vuetifyjs.com/" icon target="_blank">
              <v-icon>mdi-vuetify</v-icon>
            </v-btn>
            <v-btn class="mr-1" href="https://cn.vuejs.org/" icon target="_blank">
              <v-icon>mdi-vuejs</v-icon>
            </v-btn>
            <v-btn class="mr-1" href="https://materialdesignicons.com/" icon target="_blank">
              <v-icon>mdi-vector-square</v-icon>
            </v-btn>
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import axios from 'axios'
import functionalSelector from "@/components/functionalSelector";

export default {
  methods: {
    open(name) {
      window.open(name)
    },
    submit() {
      this.loading = true

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
      axios({url: '/ajax', method: 'POST', data}).then(function (res) {
        console.log(res.data)
        this.logs.unshift({
          title: '构建成功',
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
        this.loading = false
      }.bind(this)).catch(function (err) {
        this.logs.unshift({
          title: '构建失败',
          ts: new Date().valueOf(),
          content: err.toString()
        })
        this.logsPanel = this.logsPanel.map(v => v + 1)
        this.logsPanel.unshift(0)
        this.$nextTick(function () {
          this.$refs.logs.scrollIntoView()
        }.bind(this))
        this.loading = false
      }.bind(this))
    }
  },
  components: {
    'functional-selector': functionalSelector
  },
  data: () => ({
    dialog: false,
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
    consts: null
  }),
  async mounted() {
    let that = this
    setInterval(() => {
      that.hint = that.hint === 3 ? 0 : ++that.hint
    }, 4000)
    const apiAddress = process.env.NODE_ENV === 'production' ? 'https://dlserver.meme.teahou.se/' : 'http://127.0.0.1:8000/'
    const req = await axios.get(apiAddress);
    const backend = req.data
    this.consts = {
      type: [{text: "1.13以上", value: "normal"}, {text: "1.12.2", value: "compat"}],
      resourceOption: [{text: "所有", value: "all"}, {text: "无", value: "none"}, {
        text: "自定义",
        value: "custom"
      }],
      modOption: [{text: "所有", value: "all"}, {value: "none", text: "无"}, {
        value: "custom",
        text: "自定义"
      }],
      languageOption: [{value: "none", text: "无"}, {
        value: "custom",
        text: "自定义"
      }],
      beExtType: ['mcpack', 'zip'],
      modList: [{header: 'Mod文件'}].concat(backend.mods).concat({header: 'Mod文件（未汉化）'})
        .concat(backend.enmods),
      je_modules: backend.je_modules,
      be_modules: backend.be_modules,
      versions: [{text: '1.16.2+', value: 6}, {text: '1.15 - 1.16.1', value: 5}, {
        text: '1.13 - 1.14.4', value: 4
      }, {
        text: '1.11 - 1.12.2', value: 3
      }],
      hints: [
        "若您不知道如何构建，请直接点击下方按钮下载。",
        "若需要基岩版的MCBBS/GitHub/唱片包，您可以点击基岩版选项卡后，再点击相应跳转按钮。",
        "若您发现问题，您可以点击上方链接向我们报告。",
        "梗体中文是一个持续更新的项目，欢迎常回来看看。"
      ]
    }

  },
  computed: {
    whetherUseBE() {
      return this.tab === 1
    },
    links() {
      return {
        github: 'https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack' + (this.tab ? '-bedrock' : ''),
        mcbbs: `https://www.mcbbs.net/thread-${this.tab ? '1005191' : '1004643'}-1-1.html`,
        disc: 'https://dianliang-oss-1301161188.file.myqcloud.com/zh-meme-respack/' + (this.tab ? 'Meme_resourcepack_records.mcpack' : 'record-java.zip')
      }
    }
  },
  watch: {
    tab(newTab) {
      this.input.resource = newTab ? this.consts.be_modules.resource.map(v => v.name) : []
    }
  }
};
</script>
