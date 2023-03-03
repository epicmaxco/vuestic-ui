import { defineNuxtModule, addVitePlugin, addPluginTemplate } from '@nuxt/kit';
import { resolve } from 'pathe'
import { VuesticOptions } from './../../nuxt/src/types';
import originalNuxtModule from '../../nuxt/src/module'

/**
 * @vuestic/nuxt module wrapper with relative resolved vuestic from packages/ui
 */
export default defineNuxtModule<VuesticOptions>({
  meta: {
    name: '@vuestic/nuxt-dev',
    configKey: 'vuestic',
    compatibility: {
      nuxt: '^3.0.0-rc.8'
    }
  },

  defaults: {
    config: {},
    css: true,
    fonts: true,
  },

  setup (options, nuxt) {
    nuxt.options.alias['@vuestic/ag-grid-theme'] = resolve(__dirname, '../../ag-grid-theme/src/styles/index.scss');
    nuxt.options.alias['vuestic-ui/styles/typography.css'] = resolve(__dirname, '../../ui/src/styles/typography/typography.scss');
    nuxt.options.alias['vuestic-ui/styles/grid'] = resolve(__dirname, '../../ui/src/styles/grid/grid.scss');
    nuxt.options.alias['vuestic-ui/styles/grid.css'] = resolve(__dirname, '../../ui/src/styles/grid/grid.scss');
    nuxt.options.alias['vuestic-ui/styles/essential.css'] = resolve(__dirname, '../../ui/src/styles/essential.scss');
    nuxt.options.alias['vuestic-ui/styles/smart-helpers'] = resolve(__dirname, '../../ui/src/styles/smart-helpers/smart-helpers.scss');
    nuxt.options.alias['vuestic-ui/styles/smart-helpers.css'] = resolve(__dirname, '../../ui/src/styles/smart-helpers/smart-helpers.scss');
    nuxt.options.alias['vuestic-ui/src'] = resolve(__dirname, '../../ui/src/');
    nuxt.options.alias['vuestic-ui/styles'] = resolve(__dirname, '../../ui/src/styles/');
    nuxt.options.alias['vuestic-ui/css'] =  resolve(__dirname, '../../ui/src/styles/index.scss');
    nuxt.options.alias['vuestic-ui/dist/styles/index.css'] =  resolve(__dirname, '../../ui/src/styles/index.scss');
    nuxt.options.alias['vuestic-ui/package.json'] = resolve(__dirname, '../../ui/package.json');
    nuxt.options.alias['vuestic-ui/web-components'] = resolve(__dirname, '../../ui/src/main.ts');
    nuxt.options.alias['vuestic-ui'] = resolve(__dirname, '../../ui/src/main.ts');

    originalNuxtModule(options, nuxt)

    nuxt.options.build.transpile.push('lodash')
  }
})

export * from '../../nuxt/src/types'
