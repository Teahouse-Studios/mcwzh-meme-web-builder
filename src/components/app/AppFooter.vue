<template>
  <v-footer
    :style="'background: ' + isDarkTheme ? '#1E1E1E' : '#323437'"
    theme="dark"
    elevation="6"
    class="pb-16"
  >
    <v-container>
      <v-row>
        <v-col class="text-center mb-2 mt-2" cols="12">
          <span class="text-body-2">{{ t('footer.slogan') }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-md-left test-sm-center" md="6" sm="6">
          <v-btn
            class="text-white"
            href="https://teahou.se/terms/"
            variant="text"
            :prepend-icon="mdiScript"
          >
            {{ t('footer.terms') }}
          </v-btn>
          <v-btn
            class="text-white"
            href="https://teahou.se/privacy-policy/"
            variant="text"
            :prepend-icon="mdiLock"
          >
            {{ t('footer.privacy') }}
          </v-btn>
          <v-btn
            href="https://teahou.se/donate/"
            variant="text"
            :prepend-icon="mdiLock"
          >
            {{ t('footer.donate') }}
          </v-btn>
        </v-col>
        <v-col class="text-md-right test-sm-center" md="6" sm="6">
          <a href="https://teahou.se/">
            <v-img
              alt="Teahouse Studios"
              contain
              max-height="48"
              position="right"
              :src="logo"
              style="filter: invert(1)"
            />
          </a>
        </v-col>
      </v-row>
      <div class="text-right body-2 mt-2" v-if="beian">
        <a
          class="text-white text-decoration-none"
          href="https://beian.miit.gov.cn/"
        >
          蜀 ICP 备 19006420 号-1
        </a>
        <span> | </span>
        <a
          class="text-white text-decoration-none"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51010502011232"
        >
          <img height="14px" :src="policeLogo" />
          蜀公网安备 51010502011232 号
        </a>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { mdiScript, mdiLock, mdiCash } from '@mdi/js'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/ui'

const { isDarkTheme } = useThemeStore()

const { t } = useI18n({ useScope: 'global' })
const logo = new URL('../assets/logo.svg', import.meta.url).href
const beian = window.location.host === 'meme.wd-ljt.com' && import.meta.env.PROD
const policeLogo =
  'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAC3FBMVEUAAAD+/ODz6Kr//+PeqFfYrn3x167k0JXoxnyaaVzhs2ifaFXbrGLkvFnpyF7v2X/kwm3cp1nhsGfqw3rZqG3ntVzjrFPt3oDjvGnfr2fbnFGti3q0lH7ktoLryXn9v1T4znr/74bnvGz034v+2I/ktoDz6ZLkwY/Dfz7buoftzYbq2IPr0pjs3bLv6KPRrnbKhFv79ND488n/+dDZr4Lx38f/+cH/95f42oL7/97s2Y3++uzw1rvTk3DmuloAAHkBAm7uzWYAAGXktV3qvFr/0ljksE7fo0rWHxhrdocAAIAABHf143Pyy27w1GwGA2jtymHpwWDqxV/qyVyTeFrrwFflwFPislP+xVLpsErbmUfVkEbysETemUTpgj7ThT3XdTg5FDjdhTXWZTDaTCm7TCbTOCLXPiD9LA/QFg3UAwnOAQOEj5kcPpdyhZSptJEACJFpfo4AG44XMInFvYfTvIejmYSVkINyeoJzdoK9un6SjX7FrnwAEHp8enny2HjWwHjKtnhcX3jYzHeNhnfu2HWUjHWsonPNwnH70m9WTm8AAW//723pym3dtmn/0mbnxGa0o2ZeWWb8zGT/4mPtwmJuYmL/22D/vmB5ZGC9kF7/2l0MAF3uyFqnjVn4xFjYnli0mVi5i1jiqVfyyVbmtlbXkVNUOFPlvFLpt1LNrFKjfVLuvlBgHlDsuU/ouU9ONU/ov05ODk7/2E02Gk3jqkqEaUr/tUngjkf7n0bXikb6xERCJETdn0LckUG1gD/ooD3Ulj3jkz3TZT3WjjzOeDqBWDr3pDnglTlMADnbbTf2gjbkbzaTYDZpAjbplzTtcTTEazPXXzOeXzDscS3MPi38jizJWSrVSCrrXynzfCjVdCjZRyjTQCbFUiTlYCPXPSHLPSHWMR/wXh7iRh7GPh3PLBrSIRrWGhfMJxPGJxPRDBG/ABG2ABCxDg7BDAvEGArZAAbJAALPAADa4ry/AAAAPnRSTlMACEIaxqxpAvv7+ff19PDs7Ovn5uXk5OHg29LRy8fEw8G+vLqysaufnJiVk4yDfG9dXFpMSEFBNTApJyEcFO3QiBQAAAFzSURBVBjTYoACZjYZaTZmBmRgxsp9+di21ZysxggxxlmJZy/ev9LXnriIEa5VYUPIray0lOyd+ctVoKKWXFsmXXvu8exO5vsZnnuErcCC5m1e8x5nPXrxOu3TzSqHFguQmI18tff+Jx89HqR7fE5v7q5TtAYK6h8v81p4Ovv6wbAdmRc6HMpddYGCmudrCqbtTn2anHBq15SZ9iUx6kBBkSTfXIfUuBsPL909c9i/uP6EJFAQMJ6j2/Ps32Yk30uIy3jjXxgRLwEUVN07ubTo5LsPr16mXD1X29gZrgUUlN23uD/H28lp09o5TvYVs523ygEFORYsO+TbEOI5cVVTV+XUA1Fu/EBBoxXu0bfnT98cEePa45oUHR7MBHK9IV9Y/BFHFzc7R7/YqF4BsBiDqVBw0NLQoMAAF3c7vwmCEEFln1ZnZxe3wJWx7nZ2jj5qkNDU5l2/ZE3kusjQuRsDxPXYoQFqa6DBIiUmyqKkYwIWAgD35oZAL/mkFwAAAABJRU5ErkJggg=='
</script>
