import { Plugin } from 'vite'
import { compile } from './compiler'

/** Add css layers to Vuestic files */
export const virtualComponents: Plugin = {
  name: 'vuestic:virtual-components',

  transform(code, id) {
    // Only transform CSS files
    if (!id.endsWith('.vue')) return null

    if (!id.includes('playground/src')) return null

    return compile(code, id)
  }
}
