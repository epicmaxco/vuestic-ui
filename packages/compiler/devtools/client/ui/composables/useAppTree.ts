import { onMounted, ref, type VNode } from "vue";
import { PREFIX } from "../../../shared/CONST";

export type AppTreeItem = {
  type: 'vue:component' | 'native:element' | 'vue:element',
  el: HTMLElement,
  name: string,
  children: AppTreeItem[],
  node?: VNode
  vFor?: number,
}

const getComponentName = (node: VNode) => {
  if (!('ctx' in node) || typeof node.ctx !== 'object' || node.ctx === null) { return }

  if (!('type' in node.ctx) || typeof node.ctx.type !== 'object' || node.ctx.type === null) { return }

  if (!('name' in node.ctx.type) || typeof node.ctx.type.name !== 'string') { return }

  return node.ctx.type.name
}

const getTagName = (node: VNode) => {
  if (typeof node.type === 'string') {
    return node.type
  }
}

const hasVNode = (el: HTMLElement): el is HTMLElement & { __vnode: VNode } => {
  return '__vnode' in el
}

const compareNodeUid = (a: VNode | undefined, b: VNode | undefined) => {
  if (!a || !b) { return false }

  const aCtx = (a as any).ctx
  const bCtx = (b as any).ctx

  if (!aCtx || !bCtx) { return false }

  const aUid = aCtx.uid
  const bUid = bCtx.uid

  return aUid === bUid
}

const getAppTree = () => {
  const app = document.querySelector('#app')

  if (!app) { throw new Error('App element not found when building app tree') }

  const parseNode = (el: Element): AppTreeItem | null => {
    if (!(el instanceof HTMLElement)) {
      return null
    }

    const children = (Array
      .from(el.children)
      .map(parseNode)
      .filter(Boolean) as AppTreeItem[])
      .reduce((acc, node) => {
        const sameVNode = acc.find((n) => compareNodeUid(n.node, node.node))

        if (sameVNode) {
          sameVNode.vFor = (sameVNode.vFor || 1) + 1
          return acc
        }

        acc.push(node)

        return acc
      }, [] as AppTreeItem[])

    if (!(PREFIX in el.dataset) || !hasVNode(el)) {
      return {
        type: 'native:element',
        el: el,
        name: el.tagName.toLowerCase(),
        children: children.filter(Boolean),
      }
    }

    const componentName = getComponentName(el.__vnode)
    const tagName = getTagName(el.__vnode)

    if (componentName) {
      return {
        type: 'vue:component',
        name: componentName,
        el,
        children,
        node: el.__vnode,
      }
    }

    if (tagName) {
      return {
        type: 'vue:element',
        name: tagName,
        el,
        children,
        node: el.__vnode,
      }
    }

    return null
  }

  return parseNode(app)
}

export const useAppTree = () => {
  const appTree = ref<AppTreeItem | null>(null)

  const refresh = () => {
    appTree.value = getAppTree()

    console.log(appTree.value)
  }

  onMounted(() => {
    refresh()
  })

  return {
    appTree,
    refresh,
  }
}
