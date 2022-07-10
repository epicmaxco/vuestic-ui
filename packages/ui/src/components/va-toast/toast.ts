import { VNode, createVNode, render, AppContext } from 'vue'

import { getGlobal } from '../../utils/ssr-utils'
import type { ToastOptions } from './types'

import { VaToast } from './index'

const GAP = 5
let seed = 1

declare global {
  interface Window {
    vaToastInstances: VNode[]
  }
}

getGlobal().vaToastInstances = []

type OptionKeys = keyof ToastOptions;

export type VaToastId = string

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

const getNodeProps = (vNode: VNode): Record<OptionKeys, any> => {
  return (vNode.component?.props as Record<OptionKeys, any>) || {}
}

const closeNotification = (targetInstance: VNode | null, destroyElementFn: () => void) => {
  if (!targetInstance) { return }

  if (!getGlobal().vaToastInstances.length) {
    seed = 1
    return
  }

  const targetInstanceIndex = getGlobal().vaToastInstances.findIndex((instance) => instance === targetInstance)

  if (targetInstanceIndex < 0) { return }

  const nodeProps = getNodeProps(targetInstance)

  const {
    offsetX: targetOffsetX,
    offsetY: targetOffsetY,
    position: targetPosition,
  } = nodeProps
  const redundantHeight: number | null = targetInstance.el?.offsetHeight

  destroyElementFn()

  getGlobal().vaToastInstances = getGlobal().vaToastInstances.reduce((acc: any[], instance, index) => {
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

  if (!getGlobal().vaToastInstances.length) {
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
  appContext,
}: { props?: { [key: string]: any }; children?: any; element?: HTMLElement; appContext?: AppContext } = {}): { vNode: VNode; el?: HTMLElement } => {
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

  if (appContext) {
    vNode.appContext = appContext
  }

  if (el) {
    render(vNode, el)
  } else if (typeof document !== 'undefined') {
    render(vNode, el = document.createElement('div'))
  }

  return { vNode, el }
}

export const closeAllNotifications = (appContext?: AppContext) => {
  if (!getGlobal().vaToastInstances.length) {
    seed = 1
    return
  }
  getGlobal().vaToastInstances.forEach(instance => {
    if (appContext && instance.appContext !== appContext) { return }
    getNodeProps(instance).onClose()
  })
}

export const closeById = (id: string) => {
  const targetInstance = getGlobal().vaToastInstances.find(instance => instance.el?.id === id)

  if (targetInstance) {
    const nodeProps = getNodeProps(targetInstance)
    nodeProps.onClose()
  }
}

const getToastOptions = (options: string | ToastOptions): any => {
  if (typeof options === 'string') {
    return {
      message: options,
    }
  }
  return options
}

export const createToastInstance = (customProps: ToastOptions | string, appContext?: AppContext): VaToastId | null => {
  const { vNode, el } = mount(VaToast, { appContext, props: getToastOptions(customProps) })

  const nodeProps = getNodeProps(vNode)

  if (el && vNode.el && nodeProps) {
    document.body.appendChild(el.childNodes[0])
    const { offsetX, offsetY, position } = nodeProps

    vNode.el.style.display = 'flex'
    vNode.el.id = 'notification_' + seed

    let transformY = 0
    getGlobal().vaToastInstances.filter(item => {
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

    getGlobal().vaToastInstances.push(vNode)

    return vNode.el.id as VaToastId
  }

  return null
}

export type { ToastOptions as NotificationOptions } from './types'
