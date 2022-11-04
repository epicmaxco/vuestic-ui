import { defineNuxtModule } from '@nuxt/kit';
import {
  useCompiler,
  useComponents,
} from './composables'
import { DefinePageConfigOptions } from './types';

/** Module used to add current file path to page-config */
export default defineNuxtModule<DefinePageConfigOptions>({
  meta: {
    name: 'vuestic:define-page-config',
  },

  defaults: {
    include: './page-config/**/index.ts',
    exclude: './page-config/**/*.{.vue,.md}',
  },

  setup(options) {
    useCompiler(options)
    useComponents()
  }
})
