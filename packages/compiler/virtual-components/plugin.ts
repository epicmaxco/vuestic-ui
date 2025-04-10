import { Plugin } from 'vite'
import { transformVue } from './lib/ast-transform/transform-vue-file'
import { createVirtualComponent } from './lib/create-virtual-component'
import { readdir, readFile } from 'fs/promises'
import path, { resolve } from 'path'

const resolveComponentsFromComponentsDir = async (componentsDir: string = './src/components') => {
  return Promise.all((await readdir(componentsDir))
    .filter((file) => file.endsWith('.vue'))
    .map(async (file) => {
      const name = file.replace('.vue', '')
      const content = await readFile(path.resolve(componentsDir, file), 'utf-8')
      return await createVirtualComponent(name, content, resolve(componentsDir, file))
    }))
}

let components = await resolveComponentsFromComponentsDir()

/** Add css layers to Vuestic files */
export const virtualComponents: Plugin = {
  name: 'vuestic:virtual-components',

  enforce: 'pre',

  resolveId(id) {
    if (id.startsWith('virtual-components:')) {
      console.log('resolving', id)
      return id
    }
  },

  load(id) {
    if (id.startsWith('virtual-components:')) {
      console.log('loading', id)
      const componentName = id.replace('virtual-components:', '')
      const component = components.find((c) => c.name === componentName)

      if (!component) {
        return
      }

      const { functions } = component.script.scriptSetupMeta

      const bodies = functions.map((f) => {
        return f.source
      }).join('\n')

      const exports = 'export { ' + functions.map((f) => {
        return f.name
      }).join(', ') + ' }'

      return bodies + '\n' + exports
    }
  },

  transform(code, id) {
    if (id.startsWith('virtual-components:')) {
      console.log('transformed', id)
    }

    // Only transform CSS files
    if (!id.endsWith('.vue')) return null

    if (id.includes('node_modules')) return null
    const result = transformVue(code, components)

    console.log('transformed', id)

    return {
      code: result.toString(),
      map: result.generateMap({ hires: false })
    }
  },

  configureServer(server) {
    server.watcher.add('./src/components')
    server.watcher.on('change', async (file) => {
      if (file.endsWith('.vue')) {
        components = await resolveComponentsFromComponentsDir()
        // trigger hot reload
        server.ws.send({
          type: 'full-reload',
        })
      }
    })
  }
}
