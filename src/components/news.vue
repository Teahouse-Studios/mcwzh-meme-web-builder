<template>
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
      <v-card-text style="height: 500px">
        <div v-html="news.content"></div>
        <v-btn v-if="news.detail" :href="news.detail" plain>
          <v-icon left>{{ svgPath.mdiArrowRight }}</v-icon>
          阅读更多
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import { mdiClose, mdiArrowRight } from '@mdi/js'
export default {
  name: 'memeNews',
  methods: {
    newsIgnore() {
      this.dialogNews = false
      localStorage.memeNewsIgnored = this.news.id
    },
  },
  data: () => ({
    dialogNews: false,
    news: null,
    svgPath: {
      mdiClose,
      mdiArrowRight,
    },
  }),
  async mounted() {
    await axios
      .get(
        'https://fastly.jsdelivr.net/gh/Teahouse-Studios/mcwzh-meme-resourcepack@master/news.json'
      )
      .then((response) => (this.news = response.data))
      .then(() => {
        this.dialogNews = this.news.id > localStorage.getItem('memeNewsIgnored')
      })
  },
}
</script>
