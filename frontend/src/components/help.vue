<template>
  <v-dialog v-model="dialog" max-width="700px" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        aria-label="帮助 & 关于"
        v-bind="attrs"
        v-on="on" bottom :color="$vuetify.theme.dark ? 'dark' : 'primary'" fab fixed
        large
        right
      >
        <v-icon class="rotate-question">{{svgPath.mdiHelp}}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        帮助 & 关于
        <v-btn class="ml-auto" icon @click="dialog = false">
          <v-icon>{{svgPath.mdiClose}}</v-icon>
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
            <v-icon>{{svgPath.mdiGithub}}</v-icon>
          </v-btn>
          <v-btn class="mr-1" href="https://analytics.google.com/analytics/web/" icon target="_blank">
            <v-icon>{{svgPath.mdiGoogleAnalytics}}</v-icon>
          </v-btn>
          <v-btn class="mr-1" href="https://vuetifyjs.com/" icon target="_blank">
            <v-icon>{{svgPath.mdiVuetify}}</v-icon>
          </v-btn>
          <v-btn class="mr-1" href="https://cn.vuejs.org/" icon target="_blank">
            <v-icon>{{svgPath.mdiVuejs}}</v-icon>
          </v-btn>
          <v-btn class="mr-1" href="https://materialdesignicons.com/" icon target="_blank">
            <v-icon>{{svgPath.mdiVectorSquare}}</v-icon>
          </v-btn>
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mdiGithub, mdiGoogleAnalytics, mdiVuetify, mdiVuejs, mdiVectorSquare, mdiClose, mdiHelp} from '@mdi/js'
export default {
name: "help",
  data: () => ({
    dialog: false,
    svgPath: {
      mdiGithub, mdiGoogleAnalytics, mdiVuetify, mdiVuejs, mdiVectorSquare, mdiClose, mdiHelp
    }
  })
}
</script>

<style scoped>
.rotate-question {
  transform: rotate(180deg);
}

.rotate-question:hover {
  transform: rotate(0deg);
}
</style>
