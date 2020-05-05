/*       */

import {
  escape,
  isSSRUnsafeAttr,
  propsToAttrMap,
  isRenderableAttr,
} from 'web/server/util'
import { isObject, extend } from 'shared/util'
import { renderAttr } from 'web/server/modules/attrs'
import { renderClass } from 'web/util/class'
import { genStyle } from 'web/server/modules/style'
import { normalizeStyleBinding } from 'web/util/style'

import {
  normalizeChildren,
  simpleNormalizeChildren,
} from 'core/vdom/helpers/normalize-children'

const ssrHelpers = {
  _ssrEscape: escape,
  _ssrNode: renderStringNode,
  _ssrList: renderStringList,
  _ssrAttr: renderAttr,
  _ssrAttrs: renderAttrs,
  _ssrDOMProps: renderDOMProps,
  _ssrClass: renderSSRClass,
  _ssrStyle: renderSSRStyle,
}

export function installSSRHelpers (vm) {
  if (vm._ssrNode) {
    return
  }
  let Vue = vm.constructor
  while (Vue.super) {
    Vue = Vue.super
  }
  extend(Vue.prototype, ssrHelpers)
  if (Vue.FunctionalRenderContext) {
    extend(Vue.FunctionalRenderContext.prototype, ssrHelpers)
  }
}

class StringNode {
  constructor (
    open,
    close,
    children,
    normalizationType,
  ) {
    this.isString = true
    this.open = open
    this.close = close
    if (children) {
      this.children = normalizationType === 1
        ? simpleNormalizeChildren(children)
        : normalizationType === 2
          ? normalizeChildren(children)
          : children
    } else {
      this.children = void 0
    }
  }
}

function renderStringNode (
  open,
  close,
  children,
  normalizationType,
) {
  return new StringNode(open, close, children, normalizationType)
}

function renderStringList (
  val,
  render,
) {
  let ret = ''
  let i, l, keys, key
  if (Array.isArray(val) || typeof val === 'string') {
    for (i = 0, l = val.length; i < l; i++) {
      ret += render(val[i], i)
    }
  } else if (typeof val === 'number') {
    for (i = 0; i < val; i++) {
      ret += render(i + 1, i)
    }
  } else if (isObject(val)) {
    keys = Object.keys(val)
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i]
      ret += render(val[key], key, i)
    }
  }
  return ret
}

function renderAttrs (obj) {
  let res = ''
  for (const key in obj) {
    if (isSSRUnsafeAttr(key)) {
      continue
    }
    res += renderAttr(key, obj[key])
  }
  return res
}

function renderDOMProps (obj) {
  let res = ''
  for (const key in obj) {
    const attr = propsToAttrMap[key] || key.toLowerCase()
    if (isRenderableAttr(attr)) {
      res += renderAttr(attr, obj[key])
    }
  }
  return res
}

function renderSSRClass (
  staticClass,
  dynamic,
) {
  const res = renderClass(staticClass, dynamic)
  return res === '' ? res : ` class="${escape(res)}"`
}

function renderSSRStyle (
  staticStyle,
  dynamic,
  extra,
) {
  const style = {}
  if (staticStyle) {
    extend(style, staticStyle)
  }
  if (dynamic) {
    extend(style, normalizeStyleBinding(dynamic))
  }
  if (extra) {
    extend(style, extra)
  }
  const res = genStyle(style)
  return res === '' ? res : ` style=${JSON.stringify(escape(res))}`
}
