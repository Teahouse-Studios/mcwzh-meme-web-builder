import { defineStore } from 'pinia'
import type { Edition } from '@/types'

export const useEditionStore = defineStore('edition', {
  state: (): {
    edition: Edition
  } => {
    return {
      edition: 'java',
    }
  },
  getters: {
    isBedrock(state): boolean {
      return state.edition === 'bedrock'
    },
    links(state) {
      return {
        web_builder:
          'https://github.com/Teahouse-Studios/mcwzh-meme-web-builder',
        github:
          'https://github.com/Teahouse-Studios/mcwzh-meme-resourcepack' +
          (state.edition === 'bedrock' ? '-bedrock' : ''),
        mcbbs: `https://www.mcbbs.net/thread-${
          state.edition === 'bedrock' ? '1005191' : '1004643'
        }-1-1.html`,
        disc:
          state.edition === 'bedrock'
            ? 'https://wdf.ink/record-bedrock'
            : 'https://wdf.ink/record-java',
      }
    },
  },
})
