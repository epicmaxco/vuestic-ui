/*       */

import { parseText } from 'compiler/parser/text-parser'
import { getAndRemoveAttr, getBindingAttr, baseWarn } from 'compiler/helpers'

function transformNode (el, options) {
  const warn = options.warn || baseWarn
  const staticClass = getAndRemoveAttr(el, 'class')
  const { dynamic, classResult } = parseStaticClass(staticClass, options)
  if (process.env.NODE_ENV !== 'production' && dynamic && staticClass) {
    warn(
      `class="${staticClass}": ` +
      'Interpolation inside attributes has been deprecated. ' +
      'Use v-bind or the colon shorthand instead.',
      el.rawAttrsMap['class'],
    )
  }
  if (!dynamic && classResult) {
    el.staticClass = classResult
  }
  const classBinding = getBindingAttr(el, 'class', false /* getStatic */)
  if (classBinding) {
    el.classBinding = classBinding
  } else if (dynamic) {
    el.classBinding = classResult
  }
}

function genData (el) {
  let data = ''
  if (el.staticClass) {
    data += `staticClass:${el.staticClass},`
  }
  if (el.classBinding) {
    data += `class:${el.classBinding},`
  }
  return data
}

function parseStaticClass (staticClass, options) {
  // "a b c" -> ["a", "b", "c"] => staticClass: ["a", "b", "c"]
  // "a {{x}} c" -> ["a", x, "c"] => classBinding: '["a", x, "c"]'
  let dynamic = false
  let classResult = ''
  if (staticClass) {
    const classList = staticClass.trim().split(' ').map(name => {
      const result = parseText(name, options.delimiters)
      if (result) {
        dynamic = true
        return result.expression
      }
      return JSON.stringify(name)
    })
    if (classList.length) {
      classResult = '[' + classList.join(',') + ']'
    }
  }
  return { dynamic, classResult }
}

export default {
  staticKeys: ['staticClass'],
  transformNode,
  genData,
}
