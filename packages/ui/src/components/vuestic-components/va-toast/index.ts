import VaToast from './VaToast'
import { NotificationOptions } from './types'
import { VNode, App, createVNode, render, cloneVNode } from 'vue'

const Z_INDEX = 100
const GAP = 5
let seed = 1

let toastInstances: VNode[] = []

type OptionKeys = keyof NotificationOptions;

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

const getNodeProps = (vNode: VNode) => {
  // Here we assume that vNode is a `withConfigTransport` wrapped component
  // so we can derive computedProps from it

  // @ts-ignore
  return vNode.component?.proxy?.computedProps as Record<OptionKeys, any>
}

const closeNotification = (targetInstance: VNode | null, destroyElementFn: () => void) => {
  if (!targetInstance) {
    return
  }

  if (!toastInstances.length) {
    seed = 1
    return
  }
  const targetInstanceIndex = toastInstances.findIndex((instance) => instance === targetInstance)

  if (targetInstanceIndex < 0) {
    return
  }

  const nodeProps = getNodeProps(targetInstance)

  const {
    offsetX: targetOffsetX,
    offsetY: targetOffsetY,
    position: targetPosition,
  } = nodeProps
  const redundantHeight: number | null = targetInstance.el?.offsetHeight

  destroyElementFn()

  toastInstances = toastInstances.reduce((acc: any[], instance, index) => {
    if (instance === targetInstance) {
      return acc
    }
    if (instance.component) {
      const { offsetX, offsetY, position } = getNodeProps(instance)
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

const destroy = (el: HTMLElement | null | undefined, node: VNode | null) => {
  if (el) {
    render(null, el)
    el.remove()
  }
  el = null
  node = null
}

const mount = (component: any, {
  props,
  children,
  element,
  app,
}: { props?: { [key: string]: any }; children?: any; element?: HTMLElement; app?: App } = {}): { vNode: VNode; el?: HTMLElement } => {
  let el: HTMLElement | null | undefined = element

  // eslint-disable-next-line prefer-const
  let vNode: VNode | null

  const onClose = () => {
    closeNotification(vNode, () => destroy(el, vNode))

    if (props?.onClose) {
      props.onClose()
    }
  }

  vNode = createVNode(component, { ...props, onClose }, children)

  if (app?._context) {
    vNode.appContext = app._context
  }
  if (el) {
    render(vNode, el)
  } else if (typeof document !== 'undefined') {
    render(vNode, el = document.createElement('div'))
  }

  return { vNode, el }
}

const closeAllNotifications = () => {
  if (!toastInstances.length) {
    seed = 1
    return
  }
  toastInstances.forEach(instance => getNodeProps(instance).onClose())
}

const closeById = (id: string) => {
  const targetInstance = toastInstances.find(instance => instance.el?.id === id)

  if (targetInstance) {
    const nodeProps = getNodeProps(targetInstance)
    nodeProps.onClose()
  }
}

const createToastInstance = (customProps: NotificationOptions, app: App): VNode | null => {
  const { vNode, el } = mount(VaToast, { app, props: customProps })

  const nodeProps = getNodeProps(vNode)

  if (el && vNode.el && nodeProps) {
    document.body.appendChild(el)
    const { offsetX, offsetY, position } = nodeProps

    vNode.el.style.display = 'block'
    vNode.el.id = 'notification_' + seed
    vNode.el.style.zIndex = Z_INDEX + ''

    let transformY = 0
    toastInstances.filter(item => {
      const {
        offsetX: itemOffsetX,
        offsetY: itemOffsetY,
        position: itemPosition,
      } = getNodeProps(item)

      return itemOffsetX === offsetX && itemOffsetY === offsetY && position === itemPosition
    }).forEach((item) => {
      transformY += getTranslateValue(item, position)
    })
    vNode.el.style.transform = `translate(0, ${transformY}px)`

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
