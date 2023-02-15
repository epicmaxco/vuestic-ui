import { useCompiler } from './composables/useCompiler';
import { useRuntime } from './composables/useRuntime';
import { defineNuxtModule } from '@nuxt/kit';


/** Module used to add current file path to page-config */
export default defineNuxtModule<any>({
  meta: {
    name: 'vuestic:define-page-config',
  },

  defaults: {
    include: './page-config/**/index.ts',
    exclude: './page-config/**/*.{.vue,.md}',
  },

  setup(options) {
    useRuntime()
    useCompiler(options)
  }
})
