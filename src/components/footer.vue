<template>
  <v-footer :color="$vuetify.theme.dark ? '#1E1E1E' : '#323437'" dark elevation="6" class="pb-16">
    <v-container>
      <v-row>
        <v-col class="text-center mb-2 mt-2" cols="12">
          <span class="text-body-2">{{ $t("footer.slogan") }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-md-left test-sm-center" md="6" sm="6">
          <v-btn class="white--text" href="https://teahou.se/terms/" text>
            <v-icon left>{{mdiScript}}</v-icon>
            {{ $t("footer.terms") }}
          </v-btn>
          <v-btn class="white--text" href="https://teahou.se/privacy-policy/" text>
            <v-icon left>{{mdiLock}}</v-icon>
            {{ $t("footer.privacy") }}
          </v-btn>
          <v-btn href="https://teahou.se/donate/" text>
            <v-icon left>{{mdiCashUsd}}</v-icon>
            {{ $t("footer.donate") }}
          </v-btn>
        </v-col>
        <v-col class="text-md-right test-sm-center" md="6" sm="6">
          <a href="https://teahou.se/">
            <v-img
              alt="Teahouse Studios"
              contain
              max-height="48"
              position="right"
              src="../assets/logo.svg"
              style="filter: invert(1)"
            />
          </a>
        </v-col>
      </v-row>
      <div class="text-right body-2 mt-2">
        <a
          v-if="beian"
          class="white--text text-decoration-none"
          href="https://beian.miit.gov.cn/">
          蜀 ICP 备 19006420 号-1
        </a>
        <span> | </span>
        <a
          v-if="beian"
          class="white--text text-decoration-none"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51010502011232">
          <img src="https://attachment.mcbbs.net/data/myattachment/forum/201904/18/174618efzrjz22n825mfds.png" height="14px">
          蜀公网安备 11010102002019 号
        </a>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
import {mdiScript, mdiLock, mdiCashUsd} from '@mdi/js'

export default {
  name: "footer",
  data: () => ({
    mdiCashUsd, mdiLock, mdiScript,
    beian: window.location.host === 'meme.wd-ljt.com' || process.env.NODE_ENV === 'development'
  })
}
</script>
