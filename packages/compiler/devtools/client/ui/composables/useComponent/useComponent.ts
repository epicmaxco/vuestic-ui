import { computed, PropType } from 'vue';
import { useTargetElementStore } from "../../store/useTargetElementStore"
import { useComponentCode } from "./useComponentCode"
import { useComponentMeta } from "./useComponentMeta"
import { useComponentSource } from "./useComponentSource"
import { useVNode } from "./useVNode"
import { defineGlobal } from '../base/defineGlobal'
import { useComponentsWithSameVNode } from './useComponentsWithSameVNode';

export type ComponentAttribute = {
  name: string,
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
  const { targetElement } = useTargetElementStore()

  const { source, saveSource, paths, selectedPath, openInVSCode, refreshSource } = useComponentSource(targetElement)
  const { vNode } = useVNode(targetElement)
  const code = useComponentCode(source, vNode)
  const meta = useComponentMeta(vNode)

  const props = computed(() => {
    if (!code.attributes.value) { return {} }

    const props = {} as Record<string, ComponentProp>

    for (const name in meta.value.props) {
      const propMeta = meta.value.props?.[name as string]!

      const attributeFromCode = findPropFromAttributes(code.attributes.value!, name)

      props[name] = {
        name: name,
        meta: propMeta,
        get codeValue() {
          return attributeFromCode?.value
        },
        set codeValue(newCodeValue: string | null | undefined) {
          code.updateAttribute(name, newCodeValue)
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

  const elementsWithSameVNode = useComponentsWithSameVNode(targetElement)

  return {
    source,
    vNode,
    saveSource,
    refreshSource,
    openInVSCode,
    updateAttribute: code.updateAttribute,
    props,
    slots,
    meta,
    paths,
    selectedPath,
    elementsWithSameVNode,
  }
})
