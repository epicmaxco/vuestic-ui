/*       */

import { enter, leave } from '../modules/transition'

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

export default {
  bind (el, { value }, vnode) {
    vnode = locateNode(vnode)
    const transition = vnode.data && vnode.data.transition
    const originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display
    if (value && transition) {
      vnode.data.show = true
      enter(vnode, () => {
        el.style.display = originalDisplay
      })
    } else {
      el.style.display = value ? originalDisplay : 'none'
    }
  },

  update (el, { value, oldValue }, vnode) {
    /* istanbul ignore if */
    if (!value === !oldValue) {
      return
    }
    vnode = locateNode(vnode)
    const transition = vnode.data && vnode.data.transition
    if (transition) {
      vnode.data.show = true
      if (value) {
        enter(vnode, () => {
          el.style.display = el.__vOriginalDisplay
        })
      } else {
        leave(vnode, () => {
          el.style.display = 'none'
        })
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none'
    }
  },

  unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy,
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay
    }
  },
}
