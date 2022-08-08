import { defineNuxtModule } from '@nuxt/kit';

export const addPathToDefinePageConfig = (code: string, path: string) => {
  return code.replaceAll(
    'definePageConfig({',
    `definePageConfig({ path: '${path}', `
  );
}

export const removeDefinePageConfig = (code: string) => {
  return code.replace(/definePageConfig\(([\w|\W]*)\)/, '$1')
}

export const replaceComponentImport = (code: string) => {
  return code.replaceAll(/block.component\(['|"](.*)['|"]\)/g, "import('./components/$1')")
}

/** Module used to add current file path to page-config */
export default defineNuxtModule({
  meta: {
    name: 'vuestic:define-page-config',
  },

  defaults: {
    dir: 'page-config',
  },

  setup(options, nuxt) {
    nuxt.hook('vite:extendConfig', (vite) => {
      vite.plugins?.push({
        name: 'vuestic:define-page-config',

        transform(code, id) {
          // TODO: Make better check with filters
          if (!id.includes(options.dir)) { return }

          // TODO: We could also make tree-shaking  imports here. For example:
          // if block is component('test') we can replace it with import('./components/test')
          code = addPathToDefinePageConfig(code, id)
          code = removeDefinePageConfig(code)
          code = replaceComponentImport(code)
          return code
        }
      })
    })
  }
})
