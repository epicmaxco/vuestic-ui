import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import demos from './plugins/resolve-demos'

// https://vitejs.dev/config/
export default defineConfig({
  root: './web-components',
  build: {
    sourcemap: true,
    outDir: '../dist/vite-web-components',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      },
      watch: {
        include: './web-components/node_modules/.cache/demos.js'
      }
    },
  },
  esbuild: {
    keepNames: true
  },

  server: {
    fs: {
      allow: [
        '../../ui',
        '../../docs',
        './',
        '../'
      ]
    },
  },

  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => /va-.*/.test(tag) || /Va.*/.test(tag)
        }
      }
    }),
    {
      name: 'va:transform-template',
      enforce: 'pre',
      transform(code, id) {
        if (/examples\/.*.vue/.test(id)) {
          // Remove v-slot bind, on Custom Elements they're not allowed
          return code.replace(/\<template \#.*\>/gm, '<template>')
        }
        return code
      }
    },
    demos(),
  ]
})
