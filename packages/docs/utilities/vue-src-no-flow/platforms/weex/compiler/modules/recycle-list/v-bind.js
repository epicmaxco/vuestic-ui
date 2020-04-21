/*       */

import { camelize } from 'shared/util'
import { generateBinding } from 'weex/util/parser'
import { bindRE } from 'compiler/parser/index'
import { getAndRemoveAttr, addRawAttr } from 'compiler/helpers'

function parseAttrName (name) {
  return camelize(name.replace(bindRE, ''))
}

export function preTransformVBind (el) {
  for (const attr in el.attrsMap) {
    if (bindRE.test(attr)) {
      const name = parseAttrName(attr)
      const value = generateBinding(getAndRemoveAttr(el, attr))
      delete el.attrsMap[attr]
      addRawAttr(el, name, value)
    }
  }
}
