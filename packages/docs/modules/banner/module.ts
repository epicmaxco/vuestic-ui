import { defineNuxtModule, addPluginTemplate } from '@nuxt/kit';
import { resolve } from 'pathe'
import packageJson from '../../../ui/package.json'

// This is an in-place way to figure out commit hash,
//  but as we use railway, we have to use their variables.
// import { execSync } from 'child_process'
// const getLastCommitHash = () => {
//   return execSync('git rev-parse HEAD').toString().trim()
// }

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
    if (!process.env.RAILWAY_GIT_COMMIT_SHA) {
      console.warn("Banner module is disabled because RAILWAY_GIT_COMMIT_SHA is not present in .env")
      return
    }

    addPluginTemplate({
      src: resolve(__dirname, './runtime/banner.ts'),

      options: {
        VERSION: packageJson.version,
        DATE: new Date().toLocaleString(),
        COMMIT: process.env.RAILWAY_GIT_COMMIT_SHA.slice(0,7), // same as github commit shortcut
        BRANCH: process.env.RAILWAY_GIT_BRANCH,
      }
    })
  }
})
