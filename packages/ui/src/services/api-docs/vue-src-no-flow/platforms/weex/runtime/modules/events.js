/*       */

import { updateListeners } from 'core/vdom/helpers/update-listeners'

let target

function createOnceHandler (event, handler, capture) {
  const _target = target // save current target element in closure
  return function onceHandler () {
    const res = handler.apply(null, arguments)
    if (res !== null) {
      remove(event, onceHandler, capture, _target)
    }
  }
}

function add (
  event,
  handler,
  capture,
  passive,
  params,
) {
  if (capture) {
    console.log('Weex do not support event in bubble phase.')
    return
  }
  target.addEvent(event, handler, params)
}

function remove (
  event,
  handler,
  capture,
  _target,
) {
  (_target || target).removeEvent(event)
}

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  const on = vnode.data.on || {}
  const oldOn = oldVnode.data.on || {}
  target = vnode.elm
  updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context)
  target = undefined
}

export default {
  create: updateDOMListeners,
  update: updateDOMListeners,
}
