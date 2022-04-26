import { defineStore } from 'pinia'

export const useSnackbarsStore = defineStore('snackbars', {
  state: () => {
    return {
      buildSucceeded: false,
      buildFailed: false,
      shareCopyedToClipboard: false,
      shareLinkParsed: false,
    }
  },
})
