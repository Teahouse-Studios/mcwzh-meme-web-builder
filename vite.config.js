import legacyPlugin from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import * as path from 'path'
import vuePlugin from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'

// @see https://cn.vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let rollupOptions = {}

  let optimizeDeps = {}

  let alias = {
    '.git': path.resolve(__dirname, './.git'),
    '.github': path.resolve(__dirname, './.github'),
    '.vscode': path.resolve(__dirname, './.vscode'),
    dist: path.resolve(__dirname, './dist'),
    node_modules: path.resolve(__dirname, './node_modules'),
    public: path.resolve(__dirname, './public'),
    src: path.resolve(__dirname, './src'),
    '@': path.resolve(__dirname, '.src'),
    vue$: 'vue/dist/vue.runtime.esm.js',
  }

  let proxy = {}

  let define = {
    'process.env.NODE_ENV':
      command === 'serve' ? '"development"' : '"production"',
  }

  let esbuild = {}

  return {
    base: './', // index.html文件所在位置
    root: './', // js导入的资源路径，src
    resolve: {
      alias,
    },
    define: define,
    server: {
      // 代理
      proxy,
    },
    build: {
      target: 'es2015',
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      manifest: false, // 是否产出maifest.json
      sourcemap: false, // 是否产出soucemap.json
      outDir: 'dist', // 产出目录
      rollupOptions,
    },
    esbuild,
    optimizeDeps,
    plugins: [
      vuePlugin({
        reactivityTransform: true,
      }),
      vuetify({
        autoImport: true,
      }),
      legacyPlugin({
        targets: [
          'Android > 39',
          'Chrome >= 60',
          'Safari >= 10.1',
          'iOS >= 10.3',
          'Firefox >= 54',
          'Edge >= 15',
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        },
      },
    },
  }
})
