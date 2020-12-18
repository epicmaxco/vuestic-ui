import VaToast from './VaToast.vue'
import { NotificationOptions } from './types'
import { VNode, App, createVNode, render } from 'vue'

const Z_INDEX = 100
const GAP = 5
let seed = 1

let toastInstances: VNode[] = []

type OptionKeys = keyof NotificationOptions;

const mount = (component: any, {
  props,
  children,
  element,
  app,
}: { props?: { [key: string]: any }; children?: any; element?: HTMLElement; app?: App } = {}): { vNode: VNode; destroy: typeof destroy; el?: HTMLElement } => {
  let el: HTMLElement | null | undefined = element

  let vNode: VNode | null = createVNode(component, props, children)
  if (app?._context) {
    vNode.appContext = app._context
  }
  if (el) {
    render(vNode, el)
  } else if (typeof document !== 'undefined') {
    render(vNode, el = document.createElement('div'))
  }

  const destroy = () => {
    if (el) {
      render(null, el)
      el.remove()
    }
    el = null
    vNode = null
  }

  return { vNode, destroy, el }
}

const merge = (target: NotificationOptions | any, ...args: NotificationOptions[]): NotificationOptions => {
  args.forEach((source) => {
    if (typeof source !== 'object') {
      return
    }
    for (const prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        const value = source[prop as OptionKeys]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  })
  return target
}

const getTranslateValue = (item: VNode, position: string) => {
  if (item.el) {
    const direction = position.includes('bottom') ? -1 : 1
    return (item.el.offsetHeight + GAP) * direction
  }
  return 0
}

const getNewTranslateValue = (transformY: string, redundantHeight: number, position: string) => {
  const direction = position.includes('bottom') ? -1 : 1
  return parseInt(transformY, 10) - (redundantHeight + GAP) * direction
}

const closeNotification = (targetInstance: VNode, destroyElementFn: () => void) => {
  if (!toastInstances.length) {
    seed = 1
    return
  }
  const targetInstanceIndex = toastInstances.findIndex((instance) => instance === targetInstance)

  if (targetInstanceIndex < 0) {
    return
  }

  const { offsetX: targetOffsetX, offsetY: targetOffsetY, position: targetPosition } = targetInstance.component?.props as Record<OptionKeys, any>
  const redundantHeight: number | null = targetInstance.el?.offsetHeight

  destroyElementFn()

  toastInstances = toastInstances.reduce((acc: any[], instance, index) => {
    if (instance === targetInstance) {
      return acc
    }
    if (instance.component) {
      const { offsetX, offsetY, position } = instance.component.props as Record<OptionKeys, any>
      const isNextInstance = index > targetInstanceIndex && targetOffsetX === offsetX && targetOffsetY === offsetY && targetPosition === position
      if (isNextInstance && instance.el && redundantHeight) {
        const [_, transformY] = instance.el.style.transform.match(/[\d-]+(?=px)/g)
        const transformYNew = getNewTranslateValue(transformY, redundantHeight, position)
        instance.el.style.transform = `translate(0, ${transformYNew}px)`
      }
    }
    return [...acc, instance]
  }, [])

  if (!toastInstances.length) {
    seed = 1
  }
}

const closeAllNotifications = () => {
  if (!toastInstances.length) {
    seed = 1
    return
  }
  toastInstances.forEach(instance => (instance.component?.props as Record<OptionKeys, any>).onClose())
}

const closeById = (id: string) => {
  const targetInstance = toastInstances.find(instance => instance.el?.id === id)
  if (targetInstance) {
    (targetInstance.component?.props as Record<OptionKeys, any>).onClose()
  }
}

const createToastInstance = (customProps: NotificationOptions, app: App): VNode | null => {
  const { vNode, destroy, el } = mount(VaToast, { app, props: customProps })
  if (el && vNode.el && vNode.component?.props) {
    document.body.appendChild(el)
    const nodeProps = vNode.component.props as Record<OptionKeys, any>
    const { offsetX, offsetY, position } = nodeProps

    vNode.el.style.display = 'block'
    vNode.el.id = 'notification_' + seed
    vNode.el.style.zIndex = Z_INDEX + ''

    let transformY = 0
    toastInstances.filter(item => {
      const { offsetX: itemOffsetX, offsetY: itemOffsetY, position: itemPosition } = item.component?.props as Record<OptionKeys, any>
      return itemOffsetX === offsetX && itemOffsetY === offsetY && position === itemPosition
    }).forEach((item) => {
      transformY += getTranslateValue(item, position)
    })
    vNode.el.style.transform = `translate(0, ${transformY}px)`

    if (!customProps.onClose) {
      nodeProps.onClose = () => {
        closeNotification(vNode, destroy)
      }
    }

    seed += 1
    return vNode
  }
  return null
}

const getToastOptions = (options: string | NotificationOptions): any => {
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }
  return merge({}, options)
}

const initNotification = (options: NotificationOptions | string, app: App) => {
  const toastInstance = createToastInstance(getToastOptions(options), app)
  if (toastInstance) {
    toastInstances.push(toastInstance)
  }
}

class Notification {
  app: App;

  constructor (app: App) {
    this.app = app
  }

  init (options: NotificationOptions) {
    initNotification(options, this.app)
  }

  close (id: string) {
    closeById(id)
  }

  closeAll () {
    closeAllNotifications()
  }
}

export default Notification
