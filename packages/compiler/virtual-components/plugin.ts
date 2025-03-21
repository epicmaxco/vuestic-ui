import { Plugin } from 'vite'
import { transformVue } from './lib/ast-transform/transform-vue-file'
import { createVirtualComponent } from './lib/create-virtual-component'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'

const resolveComponentsFromComponentsDir = (componentsDir: string = './src/components') => {
  return readdirSync(componentsDir)
    .filter((file) => file.endsWith('.vue'))
    .map((file) => {
      const name = file.replace('.vue', '')
      const content = readFileSync(path.resolve(componentsDir, file), 'utf-8')
      return createVirtualComponent(name, content)
    })
}

let components = resolveComponentsFromComponentsDir()

/** Add css layers to Vuestic files */
export const virtualComponents: Plugin = {
  name: 'vuestic:virtual-components',

  resolveId(id) {
    if (id.startsWith('virtual-components:')) {
      return id
    }
  },

  load(id) {
    if (id.startsWith('virtual-components:')) {
      const componentName = id.replace('virtual-components:', '')
      const component = components.find((c) => c.name === componentName)

      if (!component) {
        return
      }

      const { functions, functionNames } = component.script.scriptSetupContent

      return functions.join('\n') + `export { ${functionNames.join(', ')} }`
    }
  },

  transform(code, id) {
    // Only transform CSS files
    if (!id.endsWith('.vue')) return null

    if (!id.includes('playground/src')) return null

    const result = transformVue(code, components)

    return {
      code: result.toString(),
      map: result.generateMap({ hires: false })
    }
  },

  configureServer(server) {
    server.watcher.add('./src/components')
    server.watcher.on('change', (file) => {
      if (file.endsWith('.vue')) {
        components = resolveComponentsFromComponentsDir()
      }
    })
  }
}
