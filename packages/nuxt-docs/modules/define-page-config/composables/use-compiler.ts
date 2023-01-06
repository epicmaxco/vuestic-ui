import { DefinePageConfigOptions } from './../types';
import { useNuxt } from '@nuxt/kit';
import { transformPageConfig } from '../compiler'
import { createFilter } from '@rollup/pluginutils'

export const useCompiler = (options: DefinePageConfigOptions) => {
  const nuxt = useNuxt()

  const filter = createFilter(options.include, options.exclude)

  nuxt.hook('vite:extendConfig', (vite) => {
    vite.plugins?.push({
      name: 'vuestic:define-page-config:compiler',

      enforce: 'pre',

      async transform(inCode, id) {
        if (!filter(id)) { return }

        const { code, files } = await transformPageConfig.call(this, inCode, id)

        files.forEach((file) => {
          // TODO: This doesn't work for now: https://github.com/vitejs/vite/pull/9723
          this.addWatchFile(file)
        })

        this.addWatchFile(id)

        return {
          code,
        }
      },
    })
  })
}
