import { Plugin } from 'vite'
import { createFilter, FilterPattern } from '@rollup/pluginutils'
import { transformFile } from './compiler'
import { createDevtoolsServer } from './server'

type PluginOptions = {
  include?: FilterPattern
  exclude?: FilterPattern
}

const server = createDevtoolsServer()

server.listen(8088, () => {
  console.log('Server listening on http://localhost:8088');
});

export const vuesticDevtools = (options: PluginOptions = {}): Plugin => {
  const filter = createFilter(
    options.include ?? ['**/*.vue'],
    options.exclude ?? ['node_modules/**']
  )

  return {
    name: 'vuestic:devtools',

    transform(code, id) {
      if (!filter(id)) {
        return
      }

      return transformFile(code, id)
    },
  }
}
