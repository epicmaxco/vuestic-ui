import { defineNuxtModule, addPluginTemplate } from '@nuxt/kit';
import { resolve } from 'pathe'
import packageJson from '../../../ui/package.json'
import { execSync } from 'child_process'

const getLastCommitHash = () => {
  return execSync('git rev-parse HEAD').toString().trim()
}

/** Module used to add current file path to page-config */
export default defineNuxtModule<any>({
  meta: {
    name: 'vuestic:banner',
  },

  defaults: {
    include: './page-config/**/index.ts',
    exclude: './page-config/**/*.{.vue,.md}',
  },

  setup(options) {
    return // Disabled for railway

    addPluginTemplate({
      src: resolve(__dirname, './runtime/banner.ts'),

      options: {
        VERSION: packageJson.version,
        DATE: new Date().toLocaleString(),
        COMMIT: getLastCommitHash(),
      }
    })
  }
})
