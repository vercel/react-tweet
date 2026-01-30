import path, { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __dirname = dirname(fileURLToPath(import.meta.url))

const entries = {
  index: resolve(__dirname, 'src/index.ts'),
  "index.client": resolve(__dirname, 'src/index.client.ts'),
  api: resolve(__dirname, 'src/api.ts'),
  swr: resolve(__dirname, 'src/swr.vue'),
  'twitter-theme/theme': resolve(__dirname, 'src/twitter-theme/theme.css')
}

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    cssCodeSplit: true,
    lib: {
      entry: entries,
      formats: ['es'],
      name: 'vue-better-tweet',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          const original = assetInfo.originalFileName
          if (!original) {
            return 'assets/[name][extname]'
          }

          const relative = path.relative(__dirname, original)
          if (!relative.startsWith('..')) {
            return relative.replace(/^src[\\/]/, '')
          }

          return 'assets/[name][extname]'
        }
      }
    }
  }
})
