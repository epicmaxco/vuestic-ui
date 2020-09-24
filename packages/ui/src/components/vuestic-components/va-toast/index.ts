import VaToast from './VaToast.vue'
import { NotificationOptions } from './types'
import { VNode } from 'vue/types/umd'
import { Constructor } from 'vue-property-decorator'

const Z_INDEX = 100
let seed = 1

const NotificationConstructor: Constructor = VaToast
let toastInstances: any[] = []
let toastInstance: any

type OptionKeys = keyof NotificationOptions;

const isVNode = (node: any) => node !== null && typeof node === 'object' &&
  Object.prototype.hasOwnProperty.call(node, 'componentOptions')

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

const createToastInstance = (options: NotificationOptions): VaToast => {
  const id: string = 'notification_' + seed++
  toastInstance = new NotificationConstructor({
    propsData: options,
  })

  const position: string = toastInstance.position

  if (isVNode(options.message)) {
    toastInstance.$slots.default = [options.message as VNode]
    options.message = 'REPLACED_BY_VNODE'
  }
  toastInstance.id = id
  toastInstance.$mount()
  document.body.appendChild(toastInstance.$el)
  toastInstance.visible = true
  ;(toastInstance.$el as HTMLElement).style.zIndex = Z_INDEX + ''

  const offsetX = options.offsetX || (toastInstance as NotificationOptions).offsetX
  let offsetY = options.offsetY || (toastInstance as NotificationOptions).offsetX

  toastInstances.filter(item => item.position === position).forEach((item: any) => {
    offsetY += item.$el.offsetHeight + 16
  })
  toastInstance.offsetX = offsetX
  toastInstance.offsetY = offsetY
  return toastInstance
}

const closeNotification = (id: any) => {
  if (!toastInstances.length) {
    seed = 1
    return
  }
  const closableInstance = toastInstances.find((toastInstance: any) => toastInstance.id === id)
  if (!closableInstance) {
    return
  }

  const closableInstanceIndex = toastInstances.findIndex((toastInstance: any) => toastInstance.id === id)

  const closableInstancePosition = closableInstance.position
  const removedHeight = toastInstance.$el.offsetHeight

  toastInstances = toastInstances.reduce((acc: any[], toastInstance: any, index: number) => {
    if (index === closableInstanceIndex) {
      toastInstance.$el.style.visibility = 'hidden'
      return acc
    }
    // Check for following instance and modify it position if true
    const isFollowingInstance: boolean = index > closableInstanceIndex && toastInstance.position === closableInstancePosition
    if (isFollowingInstance) {
      toastInstance.$el.style[toastInstance.positionY] =
        parseInt(toastInstance.$el.style[toastInstance.positionY], 10) - removedHeight - 16 + 'px'
      acc.push(toastInstance)
      return acc
    }
    return [...acc, toastInstance]
  }, [])
  if (!toastInstances.length) { seed = 1 }
}

const closeAllNotifications = () => {
  if (!toastInstances.length) {
    seed = 1
    return
  }

  toastInstances.forEach((toastInstance: any) => {
    closeNotification(toastInstance.id)
  })
}

const getToastOptions = (options: string | NotificationOptions): any => {
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }

  const onCloseHandler = options.onClose
  const id: string = 'notification_' + seed
  options.onClose = () => {
    if (onCloseHandler) {
      onCloseHandler()
    }
    closeNotification(id)
  }
  return merge({}, options)
}

const initNotification = (options: NotificationOptions | string) => {
  const toastInstance: VaToast = createToastInstance(getToastOptions(options))
  toastInstances.push(toastInstance)
  return toastInstance
}

class Notification {
  init (options: NotificationOptions) {
    initNotification(options)
  }

  close (id: any) {
    closeNotification(id)
  }

  closeAll () {
    closeAllNotifications()
  }
}

export default Notification
