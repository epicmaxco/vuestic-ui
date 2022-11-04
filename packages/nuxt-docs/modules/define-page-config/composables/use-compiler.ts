import { DefinePageConfigOptions } from './../types';
import { useNuxt } from '@nuxt/kit';
import { compileComponentBlock, compileExampleBlock } from '../blocks'
import { createFilter } from '@rollup/pluginutils'

const removeDefinePageConfig = (code: string) => {
  return code.replace(/definePageConfig\(([\w|\W]*)\)/, '$1')
}

const transformCode = (code: string, id: string) => {
  code = removeDefinePageConfig(code)
  code = compileComponentBlock(code)
  code = compileExampleBlock(code)
  return code
}

export const useCompiler = (options: DefinePageConfigOptions) => {
  const nuxt = useNuxt()

  const filter = createFilter(options.include, options.exclude)

  nuxt.hook('vite:extendConfig', (vite) => {
    vite.plugins?.push({
      name: 'vuestic:define-page-config:compiler',

      transform(code, id) {
        if (!filter(id)) { return }

        console.log('Compiling Page config', id)

        return transformCode(code, id)
      }
    })
  })
}