import { useNuxt } from '@nuxt/kit'
import type { Plugin } from 'vite'

const definePlugin = (plugin: Plugin) => plugin

/** Fix missing .js in nuxt build. Node can't find lodash import without extension so we add .js in build process */
export const useLodashImportFixer = () => {
  const { hook, options: { dev } } = useNuxt()

  if (dev) { return }

  hook('vite:extendConfig', (vite) => {
    vite.plugins?.push(definePlugin({
      name: 'vuestic:lodash-import-fixer',

      transform (code, id) {
        if (!id.includes('vuestic-ui')) {
          return
        }

        return code.replaceAll(/import \w* from ['|"]lodash\/(\w*)['|"]/g, 'import $1 from "lodash/$1.js"')
      }
    }))
  })
}
