/*       */

import { createWriteFunction } from './write'
import { createRenderFunction } from './render'

export function createBasicRenderer ({
  modules = [],
  directives = {},
  isUnaryTag = () => false,
  cache,
} = {}) {
  const render = createRenderFunction(modules, directives, isUnaryTag, cache)

  return function renderToString (
    component,
    context,
    done,
  ) {
    if (typeof context === 'function') {
      done = context
      context = {}
    }
    let result = ''
    const write = createWriteFunction(text => {
      result += text
      return false
    }, done)
    try {
      render(component, write, context, () => {
        done(null, result)
      })
    } catch (e) {
      done(e)
    }
  }
}
