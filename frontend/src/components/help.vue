<template>
  <v-dialog v-model="dialog" max-width="700px" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :aria-label="$t('dialog.help.title')"
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
        {{ $t("dialog.help.title") }}
        <v-btn class="ml-auto" icon @click="dialog = false">
          <v-icon>{{svgPath.mdiClose}}</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-card-text style="height: 500px;">
        <h2 class="text-h5 mb-1">{{ $t("dialog.help.?") }}</h2>
        <p class="text-body-1">
          {{ $t("dialog.help.thinkTwice") }}
        <ul>
          <li>{{ $t("dialog.help.thinkList.1") }}</li>
          <li>{{ $t("dialog.help.thinkList.2") }}</li>
          <li>{{ $t("dialog.help.thinkList.3") }}</li>
        </ul>
        </p>
        <p class="text-body-1">
          {{ $t("dialog.help.sure") }}
        </p>
        <p class="text-body-1">
          {{ $t("dialog.help.needToKnow") }}
          <ul>
            <li>{{ $t("dialog.help.needToKnowList.1") }}</li>
            <li>{{ $t("dialog.help.needToKnowList.2") }}</li>
            <li>{{ $t("dialog.help.needToKnowList.3") }}</li>
            <li>{{ $t("dialog.help.needToKnowList.4") }}</li>
            <li>{{ $t("dialog.help.needToKnowList.5") }}</li>
          </ul>
        </p>
        <p class="text-body-1">
          {{ $t("dialog.help.ready") }}
        </p>
        <p class="text-body-1">
          <v-btn class="mr-1 mb-1"
                 href="https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack/issues/new/choose"
                 target="_blank">
            {{ $t("java") }}
          </v-btn>
          <v-btn class="mr-1 mb-1"
                 href="https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack-bedrock/issues/new/choose"
                 target="_blank">
            {{ $t("bedrock") }}
          </v-btn>
          <v-btn class="mr-1 mb-1"
                 href="https://github.com/Teahouse-Studios/mcwzh-meme-web-builder/issues/new/choose"
                 target="_blank">
            {{ $t("dialog.help.webBuilder") }}
          </v-btn>
        </p>
        <h2 class="text-h5 mb-1"></h2>
        <v-list>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{ $t("dialog.help.dev.lcnb.name") }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("dialog.help.dev.lcnb.des") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{ $t("dialog.help.dev.cat.name") }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("dialog.help.dev.cat.des") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{ $t("dialog.help.dev.lake.name") }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("dialog.help.dev.lake.des") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">{{ $t("dialog.help.dev.dll.name") }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("dialog.help.dev.dll.des") }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <h2 class="text-h5 mb-1">{{ $t("dialog.help.poweredBy") }}</h2>
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
