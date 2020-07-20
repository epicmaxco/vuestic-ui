import Vue from 'vue'
import Toast from './Toast.vue'
import { NotificationOptions } from './types'
import { VNode } from 'vue/types/umd';

const NotificationConstructor = Vue.extend(Toast) 

type OptionKeys = keyof NotificationOptions;

let instance
const instances: any[] = []
let seed = 1
const Z_INDEX = 100
const isVNode = (node: any) => node !== null && typeof node === 'object' &&
  Object.prototype.hasOwnProperty.call(node, 'componentOptions')
const merge = (target: NotificationOptions | any, ...args: NotificationOptions[]): NotificationOptions => {
  args.forEach((source) => {
    if (typeof source !== 'object') { return }
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

const Notification = function (options: NotificationOptions) {
  if (Vue.prototype.$isServer) { return }
  if (typeof options === 'string') {
    options = {
      message: options,
    }
  }
  options = merge({}, options)
  const userOnClose = options.onClose
  const id: string = 'notification_' + seed++
  const position = options.position || 'top-right'

  options.onClose = function () {
    Notification.close(id, userOnClose)
  }

  instance = new NotificationConstructor({
    propsData: options,
  })

  if (isVNode(options.message)) {
    instance.$slots.default = [options.message as VNode]
    options.message = 'REPLACED_BY_VNODE'
  }
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true
  // instance.$el as HTMLElement
  (instance.$el as HTMLElement).style.zIndex = Z_INDEX

  let verticalOffset = options.offset || 0
  instances.filter(item => item.position === position).forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  return instance
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Notification[type] = options => {
    if (typeof options === 'string' || isVNode(options)) {
      options = {
        message: options,
      }
    }
    options.type = type
    return Notification(options)
  }
})

Notification.close = function (id, userOnClose) {
  let index = -1
  const len = instances.length
  const instance = instances.filter((instance, i) => {
    if (instance.id === id) {
      index = i
      return true
    }
    return false
  })[0]
  if (!instance) { return }

  if (typeof userOnClose === 'function') {
    userOnClose(instance)
  }
  instances.splice(index, 1)

  if (len <= 1) { return }
  const position = instance.position
  const removedHeight = instance.$el.offsetHeight
  for (let i = index; i < len - 1; i++) {
    if (instances[i].position === position) {
      instances[i].$el.style[instance.verticalProperty] =
        parseInt(instances[i].$el.style[instance.verticalProperty], 10) - removedHeight - 16 + 'px'
    }
  }
}

Notification.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default Notification
