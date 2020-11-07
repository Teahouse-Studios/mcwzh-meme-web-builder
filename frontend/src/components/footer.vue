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
    </v-container>
  </v-footer>
</template>

<script>
import {mdiScript, mdiLock, mdiCashUsd} from '@mdi/js'

export default {
  name: "footer",
  data: () => ({
    mdiCashUsd, mdiLock, mdiScript
  })
}
</script>

<style scoped>

</style>
