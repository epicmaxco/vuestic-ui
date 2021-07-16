import { VNode } from 'vue'

export const closeOverlay = {
  name: 'close-overlay',
  bind (el: HTMLElement | any, binding: any, vnode: VNode) {
    const handler = (ev: any) => {
      let vm: any = (vnode as any).componentInstance
      while ((vm = vm.$parent)) {
        const name = vm.$options.name
        if (name === 'va-popup' || name === 'QModal') {
          vm.hide(ev)
          break
        }
      }
    }
    const handlerKey = (ev: any) => {
      if (ev.keyCode === 13) {
        handler(ev)
      }
    }
    el.__qclose = { handler, handlerKey }
    el.addEventListener('click', handler)
    el.addEventListener('keyup', handlerKey)
  },
  unbind (el: any) {
    const ctx = el.__qclose
    if (!ctx) {
      return
    }
    el.removeEventListener('click', ctx.handler)
    el.removeEventListener('keyup', ctx.handlerKey)
    delete el.__qclose
  },
}
