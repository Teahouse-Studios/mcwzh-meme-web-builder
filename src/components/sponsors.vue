<template>
  <div>
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
              <v-img src="../assets/qiuxi.jpg"></v-img>
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
      <v-col col="12" md="6">
        <v-card>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ $t("sponsor.overline") }}</div>
              <v-list-item-title class="headline mb-1">{{ $t("sponsor.suda.headline") }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ $t("sponsor.suda.subtitle") }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar color="grey" size="80" tile>
              <v-img src="../assets/suda.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              href="https://space.bilibili.com/691415738"
              rel="noopener noreferrer"
              text
            >
              {{ $t("sponsor.suda.bilibili") }}
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
  </div>
</template>

<script>
export default {
  name: "sponsors.vue"
}
</script>

<style scoped>

</style>
