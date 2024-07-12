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
  currentValue: any,
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

  const { source, saveSource, paths, selectedPath, openInVSCode } = useComponentSource(targetElement)
  const { vNode } = useVNode(targetElement)
  const { updateAttribute, attributes } = useComponentCode(source, vNode)
  const meta = useComponentMeta(vNode)

  const props = computed(() => {
    if (!attributes.value) { return {} }

    return Object.keys(meta.value.props ?? {}).reduce((acc, name) => {
      const propMeta = meta.value.props?.[name as string]
      if (!attributes.value) { throw new Error('Error getting props: attributes not parsed yet') }

      const attributeFromCode = findPropFromAttributes(attributes.value, name)

      acc[name] = {
        name: name,
        meta: propMeta,
        get codeValue() {
          return attributeFromCode?.value
        },
        set codeValue(newCodeValue: string | null | undefined) {
          updateAttribute(name, newCodeValue)
        },
        get currentValue() {
          return vNode.value!.props![name]
        },
        set currentValue(newValue: any) {
          vNode.value!.props![name] = newValue
        },
        codeAttribute: attributeFromCode ?? undefined,
        updateAttribute,
      }

      return acc
    }, {} as Record<string, ComponentAttribute | ComponentProp>)
  })

  const elementsWithSameVNode = useComponentsWithSameVNode(targetElement)

  return {
    source,
    vNode,
    saveSource,
    openInVSCode,
    updateAttribute,
    props,
    meta,
    paths, 
    selectedPath,
    elementsWithSameVNode,
  }
})
