import { computed, type PropType, type ComputedRef, VNode } from 'vue';
import type { useComponentCode } from './useComponentCode'
import type { useComponentSource } from './useComponentSource'

type Code = ReturnType<typeof useComponentCode>
type Source = ReturnType<typeof useComponentSource>

export type ComponentAttribute = {
  name: string,
  readonly currentValue: any,
  codeValue: string | null | undefined,
  codeAttribute?: {
    name: string,
    value: string | null,
    isDynamic: boolean,
    isVModel: boolean,
    isEvent: boolean,
  },
  updateAttribute: Code['updateAttribute'],
}

export type ComponentProp = {
  meta: {
    default?: any,
    type?: PropType<any>,
  }
} & ComponentAttribute

const findPropFromAttributes = (attributes: Record<string, string | null>, propName: string) => {
  const possibleNames = [
    propName,
    `:${propName}`,
    `v-bind:${propName}`,
    `@${propName}`,
    `v-model:${propName}`,
  ]

  for (const name of possibleNames) {
    if (name in attributes) {
      return {
        name: name,
        value: attributes[name],
        isDynamic: name.startsWith(':') || name.startsWith('v-bind'),
        isVModel: name.startsWith('v-model'),
        isEvent: name.startsWith('@'),
      }
    }
  }

  return null
}

export const useComponentOptions = (code: Code, source: Source, vNode: ComputedRef<VNode | null>) => {
  const props = computed(() => {
    if (!code.attributes.value) { return {} }

    const props = {} as Record<string, ComponentProp>

    for (const name in code.meta.value.props) {
      const propMeta = code.meta.value.props?.[name as string]!

      const attributeFromCode = findPropFromAttributes(code.attributes.value!, name)

      props[name] = {
        name: name,
        meta: propMeta,
        get currentValue() {
          return vNode.value?.props?.[name]
        },
        get codeValue() {
          return attributeFromCode?.value
        },
        set codeValue(newCodeValue: string | null | undefined) {
          source.update(code.updateAttribute(name, newCodeValue))
        },
        codeAttribute: attributeFromCode ?? undefined,
        updateAttribute: code.updateAttribute,
      }
    }

    return props
  })

  const slots = computed(() => {
    return code.slots.value?.map((slot) => {
      let timeout: ReturnType<typeof setTimeout>

      return {
        name: slot.name,
        get codeValue() {
          return slot.text
        },
        set codeValue(newCodeValue: string) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            source.update(code.updateSlot(slot.name, newCodeValue))
          }, 300)
        },
      }
    }) ?? []
  })

  const style = computed({
    get() {
      if (!code.attributes.value?.style) { return {} }

      return code.attributes.value.style.split(';').reduce((acc, style) => {
        const [key, value] = style.split(':')
        if (key && value) {
          acc[key.trim()] = value.trim()
        }
        return acc
      }, {} as Record<string, string>)
    },

    set(newStyle: Record<string, string>) {
      const style = Object.entries(newStyle).map(([key, value]) => `${key}: ${value}`).join('; ')
      source.update(code.updateAttribute('style', style))
    }
  })

  return {
    props,
    slots,
    style,
  }
}
