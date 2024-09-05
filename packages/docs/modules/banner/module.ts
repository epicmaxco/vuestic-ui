import { defineNuxtModule, addPluginTemplate } from '@nuxt/kit';
import { resolve } from 'pathe'
import packageJson from '../../../ui/package.json'

// This is an in-place way to figure out commit hash,
//  but as we use Netlify, we have to use their variables.
// import { execSync } from 'child_process'
// const getLastCommitHash = () => {
//   return execSync('git rev-parse HEAD').toString().trim()
// }

// Netlify has several Git metadata read-only variables: COMMIT_REF, BRANCH, etc.
// see https://docs.netlify.com/configure-builds/environment-variables/#git-metadata for more details

/** Module used to add current file path to page-config */
export default defineNuxtModule<any>({
  meta: {
    name: 'vuestic:banner',
  },

  defaults: {
    include: './page-config/**/index.ts',
    exclude: './page-config/**/*.{.vue,.md}',
  },

  setup() {
    if (!process.env.COMMIT_REF) {
      console.warn('Banner module is disabled because COMMIT_REF is not present in .env')
      return
    }

    addPluginTemplate({
      src: resolve(__dirname, './runtime/banner.ts'),

      options: {
        VERSION: packageJson.version,
        DATE: new Date().toLocaleString(),
        COMMIT: process.env.COMMIT_REF.slice(0,7), // same as GitHub commit shortcut
        BRANCH: process.env.BRANCH,
      }
    })
  }
})
