/*       */

import { getAndRemoveAttr, addRawAttr } from 'compiler/helpers'

function containVOnce (el) {
  for (const attr in el.attrsMap) {
    if (/^v\-once$/i.test(attr)) {
      return true
    }
  }
  return false
}

export function preTransformVOnce (el) {
  if (containVOnce(el)) {
    getAndRemoveAttr(el, 'v-once', true)
    addRawAttr(el, '[[once]]', true)
  }
}
