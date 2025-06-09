import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
      outDir: 'dist/types',
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@vuestic/vueform',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'vuestic-ui'],
      output: {
        globals: {
          vue: 'Vue',
          'vuestic-ui': 'Vuestic'
        }
      }
    }
  }
})
