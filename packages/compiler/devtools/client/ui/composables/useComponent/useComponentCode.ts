import { type Ref, computed, type VNode } from 'vue';
import { HTMLRootNode, parseSource } from '../../../parser/parseSource';
import { useComponentMeta } from './useComponentMeta'
import { printSource } from '../../../parser/printSource';

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

export const useComponentCode = (source: Ref<string | null>, vNode: Ref<VNode | null>) => {
  const ast = computed(() => {
    if (!source.value) return null

    try {
      return parseSource(source.value)
    }
    catch (e) {
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
          attributes: newAttributes,
          parent: newRoot,
        })

        return source.value = printSource(newRoot)
      }
    }

    const child = {
      ...element,
      attributes: {
        ...newAttributes,
        [transformPropName(name, type)]: value
      },
      parent: newRoot,
    }

    if (value === undefined) {
      delete child.attributes[name]
    }

    newRoot.children.push(child)

    source.value = printSource(newRoot)
  }

  return {
    ast,
    attributes,
    updateAttribute,
  }
}
