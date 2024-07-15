import { computed, PropType } from 'vue';
import { useComponentCode } from "./useComponentCode"
import { useComponentSource } from "./useComponentSource"
import { defineGlobal } from '../base/defineGlobal'
import { useSelectedAppTreeItem } from '../useAppTree';

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
  updateAttribute: (name: string, value: string | null) => void,
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

export const useComponent = defineGlobal(() => {
  const {
    selectedAppTreeItem,
    selectAppTreeItem
  } = useSelectedAppTreeItem()

  const vNode = computed(() => {
    return selectedAppTreeItem.value?.vnode ?? null
  })

  const element = computed(() => {
    return (selectedAppTreeItem.value?.el as HTMLElement) ?? null
  })

  const uid = computed(() => {
    return selectedAppTreeItem.value?.ids[0]
  })

  const { source, saveSource, openInVSCode, refreshSource, isSourceLoading } = useComponentSource(uid)
  const code = useComponentCode(source, vNode)

  const name = computed(() => {
    return selectedAppTreeItem.value?.name
  })

  const isParsed = computed(() => {
    return code.attributes.value !== null && code.slots.value !== null && !isSourceLoading.value && source.value !== null
  })

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
          code.updateAttribute(name, newCodeValue)
          if (source.value) {
            saveSource(source.value)
          }
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
            code.updateSlot(slot.name, newCodeValue)
          }, 300)
        },
      }
    }) ?? []
  })

  return {
    isParsed,
    name,
    source,
    vNode,
    element,
    uid,
    saveSource,
    refreshSource,
    openInVSCode,
    updateAttribute: code.updateAttribute,
    props,
    slots,
    selectAppTreeItem,
  }
})
