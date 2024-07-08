import { Plugin } from 'vite'
import MagicString from 'magic-string'

const addLayer = (ms: MagicString, layer: string) => {
  ms.prepend(`@layer ${layer} {\n`)
  ms.append(`\n}`)
  return {
    code: ms.toString(),
    map: ms.generateMap()
  }
}

/** Add css layers to Vuestic files */
export const cssLayers: Plugin = {
  name: 'vuestic:css-layer',

  transform(code, id) {
    // Only transform CSS files
    if (!id.endsWith('.css')) return null

    if (id.includes('vuestic-ui/dist/styles/')) {
      return addLayer(new MagicString(code), 'vuestic.styles')
    }

    if (id.includes('vuestic-ui/dist/es/')) {
      return addLayer(new MagicString(code), 'vuestic.components')
    }
  }
}
