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

  watchChange(id) {
    if (id.includes('src/components')) {
      components = resolveComponentsFromComponentsDir()
    }
  }
}
