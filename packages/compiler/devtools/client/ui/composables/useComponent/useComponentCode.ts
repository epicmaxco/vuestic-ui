import { type Ref, computed, type VNode, type ComputedRef } from 'vue';
import { HTMLContentNode, HTMLRootNode, parseSource } from '../../../parser/parseSource';
import { useComponentMeta } from './useComponentMeta'
import { printSource } from '../../../parser/printSource';
import { ComponentSource } from './useComponentSource'

const transformPropName = (name: string, type: 'attr' | 'bind' | 'v-model' | 'event') => {
  switch (type) {
    case 'attr':
      return name
    case 'bind':
      return `:${name}`
    case 'v-model':
      return `v-model:${name}`
    case 'event':
      return `@${name}`
  }
}

const extractSlotName = (keys: string[]) => {
  for (const key of keys) {
    if (key.startsWith('v-slot:')) {
      return key.slice(7)
    }
    if (key.startsWith('#')) {
      return key.slice(1)
    }
  }
}

/** Mutates attrs */
const removeDuplicatedAttributes = (attrs: Record<string, string>) => {
  Object
    .keys(attrs)
    .forEach((attributeName, i, keys) => {
      const attributeNameNormalized = attributeName.replace(/^:|^v-model:|^v-bind:/, '')

      if (attributeNameNormalized === attributeName) { return }

      if (keys.includes(attributeNameNormalized)) {
        delete attrs[attributeName]
      }
    })

  return attrs
}

export const useComponentCode = (source: ComponentSource, vNode: Ref<VNode | null>) => {
  const ast = computed(() => {
    if (!source.value) return null

    try {
      return parseSource(source.value)
    }
    catch (e) {
      console.log(e)
      return null
    }
  })

  const meta = useComponentMeta(vNode)

  const attributes = computed(() => {
    if (!ast.value) return null
    const element = ast.value.children[0]
    if (!element) return null

    if (element.type === 'content') { return null }

    return element.attributes
  })

  const slots = computed(() => {
    if (!ast.value) return null
    const element = ast.value.children[0]

    if (element.type === 'content') {
      return [{ name: 'default', text: element.text }]
    }

    const slots = [] as { name: string, text: string }[]

    for (const child of element.children) {
      if (child.type === 'content') {
        slots.push({ name: 'default', text: child.text.trim() })
        continue
      }

      if (child.tag === 'template') {
        const slotName = extractSlotName(Object.keys(child.attributes))

        const slotText = child.children.length === 1 && child.children[0].type === 'content' ? child.children[0].text : null

        if (slotName && slotText) {
          slots.push({ name: slotName, text: slotText.trim() })
        }
      }
    }

    return slots
  })

  /**
   * Updated attribute value in the source code
   *
   * string - meaning attribute have value - `to="value"`
   * null - meaning attribute don't have a value `to`
   * undefined - meaning attribute should be removed ``
   */
  const updateAttribute = (name: string, value: string | null | undefined, type: 'attr' | 'bind' | 'v-model' | 'event' = 'attr') => {
    if (!ast.value) {
      throw new Error('Unable to update attribute: no AST available')
    }

    if (ast.value.children.length !== 1) {
      throw new Error('Unable to update attribute: multi-node')
    }

    const element = ast.value.children[0]

    if (element.type === 'content') {
      throw new Error('Unable to update attribute: content node can not have attributes')
    }

    const currentAttributesNames = Object.keys(element.attributes)
    const newAttributes = currentAttributesNames.reduce((acc, attributeName) => {
      if (attributeName === name) { return acc }
      acc[attributeName] = element.attributes[attributeName]
      return acc
    }, {} as Record<string, any>)

    const newRoot: HTMLRootNode = {
      type: 'root',
      children: []
    }

    const propsMeta = meta.value.props

    if (propsMeta && name in propsMeta) {
      const propMeta = propsMeta[name]

      // If new value is default, remove the attribute
      if (propMeta.default === value && value !== undefined) {
        newRoot.children.push({
          ...element,
          attributes: removeDuplicatedAttributes(newAttributes),
          parent: newRoot,
        })

        return printSource(newRoot)
      }
    }

    const child = {
      ...element,
      attributes: removeDuplicatedAttributes({
        ...newAttributes,
        [transformPropName(name, type)]: value
      }),
      parent: newRoot,
    }

    if (value === undefined) {
      delete child.attributes[name]
    }

    newRoot.children.push(child)

    return printSource(newRoot)
  }

  const updateSlot = (name: string, value: string) => {
    if (!ast.value) {
      throw new Error('Unable to update slot: no AST available')
    }

    if (ast.value.children.length !== 1) {
      throw new Error('Unable to update slot: multi-node')
    }

    const element = ast.value.children[0]

    const newRoot: HTMLRootNode = {
      type: 'root',
      children: []
    }


    if (element.type === 'content') {
      if (name !== 'default') {
        throw new Error('Unable to update slot: content node can only have default slot')
      }

      newRoot.children.push({
        type: 'content',
        text: value,
        parent: newRoot,
      })

      return printSource(newRoot)
    }

    const newChildren = element.children.map((child) => {
      // Replace content with default slot
      if (child.type === 'content') {
        if (name === 'default') {
          return {
            ...child,
            text: value,
          }
        }

        return child
      }

      if (child.tag === 'template') {
        const slotName = extractSlotName(Object.keys(child.attributes))

        if (slotName === name) {
          return {
            ...child,
            children: [{ type: 'content' as const, text: value, parent: child }],
          }
        }
      }

      return child
    })

    newRoot.children.push({
      ...element,
      children: newChildren,
      parent: newRoot,
    })

    return printSource(newRoot)
  }

  const appendChild = (code: string) => {
    if (!ast.value) {
      throw new Error('Unable to append child: no AST available')
    }

    if (ast.value.children.length !== 1) {
      throw new Error('Unable to append child: multi-node')
    }

    const element = ast.value.children[0]

    const newRoot: HTMLRootNode = {
      type: 'root',
      children: []
    }

    if (element.type === 'content') {
      throw new Error('Unable to append child: content node can not have children')
    }

    const newChildren = [
      ...element.children,
      {
        type: 'content',
        text: code,
        parent: element,
      } satisfies HTMLContentNode
    ]

    newRoot.children.push({
      ...element,
      children: newChildren,
      parent: newRoot,
    })

    return printSource(newRoot)
  }

  const isParsed = computed(() => {
    return attributes.value !== null && slots.value !== null && !source.isLoading && source.value !== null
  })

  return {
    isParsed,
    meta,
    // ast,
    attributes,
    slots,
    updateAttribute,
    updateSlot,
    appendChild,
  }
}

export type ComponentCode = ReturnType<typeof useComponentCode>
