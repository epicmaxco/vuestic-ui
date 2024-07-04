import { PREFIX } from './../../../shared/CONST';
import { type Ref, computed, ref, reactive, watch, type VNode } from 'vue'
import { useTargetElementStore } from '../store/useTargetElementStore'
import { HTMLContentNode, HTMLElementNode, parseSource, type HTMLRootNode } from '../../parser/parseSource'
import { getSlotName } from '../../parser/utils'
import { printSource } from '../../parser/printSource'

type SlotContent = string | HTMLElementNode

// FixMe: This is temporary. We need to store this globally. Maybe use pinia.

const useVueElementSource = (element: Ref<HTMLElement | null>) => {
  /** @notice Source is async and may not be available until loaded */
  const source = ref<string | null>(null)

  const q = computed(() => {
    if (!element.value) { return null }
    const paths = Object.keys(element.value.dataset)
      .filter((key) => key.startsWith(`${PREFIX}:`))

    return paths[0]
  })

  const reset = () => {
    source.value = null
  }

  const load = async () => {
    if (!element.value) { return reset() }
    if (!(PREFIX in element.value.dataset)) { return reset() }

    const paths = Object.keys(element.value.dataset)
      .filter((key) => key.startsWith(`${PREFIX}:`))

    const response = await fetch(`http://localhost:8088/node-source?q=${paths[0]}`)
    source.value = await response.text()
  }

  watch(element, async () => {
    load()
  }, { immediate: true })

  return {
    q,
    source,
    refresh: load,
  }
}

const { targetElement } = useTargetElementStore()

const vNode =  computed(() => {
  if (!targetElement.value) return null

  return (targetElement.value as any).__vnode as VNode ?? null
})

const props = computed(() => {
  if (!vNode.value) return null

  if (!('ctx' in vNode.value)) {
    return null
  }

  return (vNode.value.ctx as any)?.props as Record<string, any> ?? null
})

const getVNodeComponent = (vNode: VNode | null) => {
  if (!vNode) return null

  if (!('ctx' in vNode)) { return null }

  const ctx = vNode.ctx as any

  if (!ctx) { return null }

  return {
    name: ctx.type.__name as string || undefined,
    props: ctx.type.props as Record<string, { default?: unknown, type?: BooleanConstructor | StringConstructor }>,
  }
}

const meta = computed(() => {
  return {
    type: vNode.value?.type,
    component: getVNodeComponent(vNode.value),
  }
})

const { source, refresh, q } = useVueElementSource(targetElement)

const settings = reactive({
  textContent: null as string | null,
  newProps: {} as Record<string, string>,
  newSlots: {} as Record<string, SlotContent>,
})

const autoSave = ref(false)

watch(settings, () => {
  if (autoSave.value) {
    save()
  }
}, { deep: true })

const reset = () => {
  settings.textContent = null
  settings.newProps = {}
  refresh()
}

const parsed = computed(() => {
  if (!source.value) return null

  return parseSource(source.value)
})

const slots = computed(() => {
  if (!parsed.value) return null

  const el = parsed.value.children[0]

  if (el.type === 'content') { return null }

  return el
    .children
    .map((child, index) => {
      if (child.type === 'content') {
        return {
          index: index,
          content: child.text,
          name: 'default',
          update: (content: string) => {
            settings.newSlots['default'] = content
          }
        }
      }

      if (child.tag === 'template') {
        if (child.children.length === 1) {
          if (child.children[0].type !== 'content') {
            return null
          }

          const name = Object.keys(child.attributes).find((key) => key.startsWith('#'))

          if (!name) {
            return null
          }

          return {
            index: index,
            content: child.children[0].text,
            name: name,
            update: (content: string) => {
              settings.newSlots[name] = {
                ...child,
                children: [{ type: 'content', text: content, parent: child }],
              } satisfies HTMLElementNode
            }
          }
        }
      }

      return null
    })
    .filter((slot) => slot !== null) as { index: number, content: string, name: string, update: (content: SlotContent) => void }[]
})

const normalizeAttributeKey = (attribute: string) => {
  if (attribute.startsWith(':')) {
    return attribute.slice(1)
  }

  if (attribute.startsWith('v-bind:')) {
    return attribute.slice(7)
  }

  if (attribute.startsWith('v-model:')) {
    return attribute.slice(8)
  }

  return attribute
}

const newSource = computed(() => {
  if (!parsed.value) return null

  if (parsed.value?.children.length !== 1) {
    throw new Error('Cannot update props on multi-node vNode')
  }

  const rootChild = parsed.value.children[0]

  if (rootChild.type === 'content') {
    throw new Error('Cannot update props on content vNode')
  }

  const propsMeta = meta.value.component?.props
  const originalAttributeKeys = Object.keys(rootChild.attributes)
  const newPropKeys = Object.keys(settings.newProps)

  const newAttributes = [...originalAttributeKeys, ...newPropKeys].reduce((acc, key) => {
    if (key in settings.newProps) {
      acc[normalizeAttributeKey(key)] = settings.newProps[key]
    } else if (key in rootChild.attributes) {
      acc[key] = rootChild.attributes[key]
    }

    if (propsMeta && key in propsMeta) {
      const propMeta = propsMeta[key]

      if (propMeta.default === acc[key]) {
        delete acc[key]
      }
    }

    return acc
  }, {} as Record<string, string | true>)

  const newRoot: HTMLRootNode = {
    type: 'root',
    children: []
  }

  const newChildren = rootChild.children.map((child) => {
    const name = getSlotName(child)

    if (!name) {
      return child
    }

    if (name in settings.newSlots) {
      const slot = settings.newSlots[name]

      if (typeof slot === 'string') {
        return {
          type: 'content',
          text: slot,
          parent: newRoot,
        } satisfies HTMLContentNode
      }

      return slot
    }

    return child
  })

  newRoot.children.push({
    type: 'element',
    tag: rootChild.tag,
    attributes: newAttributes,
    children: newChildren,
    parent: newRoot,
  })

  return printSource(newRoot)
})

const save = async () => {
  const updated = await fetch(`http://localhost:8088/node-source?q=${q.value}`, {
    method: 'PATCH',
    body: newSource.value,
  })

  const newDataAttribute = await updated.text()

  targetElement.value!.dataset[PREFIX] = newDataAttribute

  reset()
}

watch(targetElement, () => {
  reset()
})

const isNativeElement = computed(() => {
  if (!parsed.value) return false

  if (parsed.value.children.length === 1) {
    if (parsed.value.children[0].type === 'element') {
      return parsed.value.children[0].tag === meta.value.type
    }
  }
  return true
})

const name = computed(() => {
  if (parsed.value?.children.length === 1) {
    // Get element tag from source, because component vnode not often contain correct name
    if (parsed.value.children[0].type === 'element') {
      const nameFromSourceCode = parsed.value.children[0].tag

      return nameFromSourceCode
    }
  }

  if (meta.value.component?.name) {
    return `vue:${meta.value.component?.name}`
  }

  return `html:${String(meta.value.type)}`
})

export const useVueElement = () => {
  return {
    isNativeElement,
    settings,
    element: targetElement,
    parsed,
    vNode,
    name,
    meta,
    props,
    slots,
    source,
    newSource,
    save,
    autoSave,
  }
}
