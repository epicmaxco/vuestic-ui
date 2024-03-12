import { ComponentInternalInstance, Ref, normalizeClass, normalizeStyle } from 'vue'
import { Props } from './shared'

export const createAttrs = (instance: ComponentInternalInstance, propsFromConfig: Ref<Props>) => {
  // Instance.attrs will be patched later, so we save original object here to prevent recursion
  const instanceAttrs = instance.attrs

  return new Proxy(instanceAttrs, {
    get: (target, key: string) => {
      if (typeof key !== 'string') { return target[key] }

      if (key === 'class') {
        return normalizeClass([propsFromConfig.value.class, instanceAttrs.class])
      }

      if (key === 'style') {
        return normalizeStyle([propsFromConfig.value.style, instanceAttrs.style])
      }

      const attrFromConfig = propsFromConfig.value?.[key]

      if (attrFromConfig !== undefined) {
        return attrFromConfig
      }

      return target[key]
    },
    ownKeys (target) {
      // TODO: Optimize
      return [...new Set([...Object.keys(instanceAttrs), ...Object.keys(propsFromConfig.value)])]
    },
    getOwnPropertyDescriptor (target, key) {
      return Reflect.getOwnPropertyDescriptor(propsFromConfig.value, key) ?? Reflect.getOwnPropertyDescriptor(instanceAttrs, key)
    },
  })
}
