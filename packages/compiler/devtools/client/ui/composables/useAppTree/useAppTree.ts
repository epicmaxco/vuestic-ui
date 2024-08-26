import { onMounted, VNode, VNodeNormalizedChildren, VNodeArrayChildren, isVNode, Fragment, App, ref } from 'vue';
import { PREFIX } from '../../../../shared/CONST';
import { useSelectedAppTreeItem } from './useSelectedAppTreeItem';

export type AppTreeItemComponent = {
  ids: string[],
  name: string,
  el: Element | null,
  vnode: VNode,
  children: AppTreeItem[],
  repeated?: number,
  repeatedElements?: Element[],
}

export type AppTreeItemText = {
  text: string
}

export type AppTreeItem = AppTreeItemComponent | AppTreeItemText

const isDevtoolsComponent = (vnode: VNode) => {
  const el = vnode.el as Element | null

  if (!el) {
    return false
  }

  if ('dataset' in el) {
    return Object.keys((el as HTMLElement).dataset).includes(PREFIX)
  }

  return false
}

const getItemName = (vnode: VNode) => {
  if (typeof vnode.type === 'string') {
    return vnode.type
  }

  if (typeof vnode.type === 'object') {
    if ('name' in vnode.type) {
      return vnode.type.name
    }

    if ('__name' in vnode.type) {
      return vnode.type.__name
    }
  }
}

const getItemChildren = (vnode: VNode) => {
  if (vnode.component) {
    if ((vnode.type as any).__hmrId) {
      return [(vnode.component.subTree)]
    }

    return getItemChildren(vnode.component.subTree)
  }

  if (Array.isArray(vnode.children)) {
    return vnode.children
  }

  if (vnode.children === null) {
    return null
  }

  if (typeof vnode.children === 'object') {
    // throw new Error('Object children not supported')
    return null
  }

  return [vnode.children]
}

const getAppTree = async () => {
  const app = document.querySelector('#app')

  if (!app) { throw new Error('App element not found when building app tree') }

  const traverseChildren = (vnode: VNodeNormalizedChildren): AppTreeItem[] | AppTreeItem => {
    if (vnode === null) {
      return [] as AppTreeItem[]
    }

    if (Array.isArray(vnode)) {
      return vnode
        .filter((vnode) => !!vnode)
        .map((vnode) => {
          if (Array.isArray(vnode)) {
            return traverseChildren(vnode)
          }

          if (isVNode(vnode)) {
            return traverse(vnode)
          }

          return {
            text: String(vnode),
          }
        })
        .flat()
    }

    return {
      text: String(vnode),
    }
  }

  const traverse = (vnode: VNode): AppTreeItem | AppTreeItem[] => {
    if (vnode.type === Fragment) {
      return traverseChildren(vnode.children)
    }

    const name = getItemName(vnode)

    if (!isDevtoolsComponent(vnode)) {
      return traverseChildren(getItemChildren(vnode))
    }


    const ids = vnode.props && Object
      .keys(vnode.props)
      .filter((p) => p.startsWith(`data-${PREFIX}-`))
      .map((p) => p.replace(`data-`, ''))

    if (!ids) {
      return traverseChildren(getItemChildren(vnode))
    }

    const removeInheritedId = (children: AppTreeItem[]) => {
      if (ids) {
        children.forEach((child) => {
          if ('ids' in child) {
            child.ids = child.ids.filter((id) => !ids.includes(id))
          }
        })
      }

      const grouped = [] as AppTreeItem[]

      children.forEach((child) => {
        if ('ids' in child) {
          const [id] = child.ids

          const existing = grouped.find((group) => 'ids' in group && group.ids.includes(id)) as AppTreeItemComponent | undefined

          if (!existing) {
            grouped.push(child)
          } else {
            existing.repeated = (existing.repeated || 1) + 1
            existing.repeatedElements = existing.repeatedElements || []
            existing.repeatedElements.push(child.el as Element)
          }
        } else {
          grouped.push(child)
        }
      })

      return grouped
    }

    return {
      ids: ids ?? [],
      el: vnode.el as Element | null,
      vnode,
      name: name ?? 'unknown',
      children: removeInheritedId(getItemChildren(vnode)?.map((child) => {
        if (Array.isArray(child)) {
          return traverseChildren(child)
        }

        if (isVNode(child)) {
          return traverse(child)
        }

        return {
          text: String(child),
        }
      })
      .flat() ?? [])
    }
  }

  const getAppVNode = () => {
    return new Promise<VNode>((resolve) => {
      if ('_vnode' in app) {
        return resolve(app._vnode as VNode)
      }

      requestAnimationFrame(async () => {
        resolve(await getAppVNode())
      })
    })
  }

  const vnode = await getAppVNode()

  return traverse(vnode)
}


export const walkTree = (search: AppTreeItem | HTMLElement | string, tree: AppTreeItem[] = appTree.value): AppTreeItem | null => {
  for (const item of tree) {
    if ('text' in item) {
      continue
    }

    if (typeof search === 'string') {
      if (item.ids.includes(search)) {
        return item
      }
    } else if (search instanceof HTMLElement) {
      if (item.el?.isEqualNode(search)) {
        return item
      }

      if (item.repeatedElements?.some((el) => el.isEqualNode(search))) {
        return item
      }
    } else if ('name' in search) {
      const searchEl = search.el
      const searchName = search.name

      const isSameNode = item.el?.isEqualNode(searchEl) || item.repeatedElements?.some((el) => el.isEqualNode(el))
      const isSameName = item.name === searchName

      if (isSameName && isSameNode) {
        return item
      }
    }

    const child = walkTree(search, item.children)

    if (child) {
      return child
    }
  }

  return null
}

// TODO: Right now global, for better performance, should be moved to a composable
const appTree = ref<AppTreeItem[]>([])

export const _appTree = appTree

export const useAppTree = () => {
  const { selectedAppTreeItem, sameNodeItems, selectAppTreeItem } = useSelectedAppTreeItem()

  const refresh = async () => {
    const oldSelectedAppTreeItem = selectedAppTreeItem.value
    const tree = await getAppTree()

    if (!Array.isArray(tree)) {
      appTree.value = [tree]
    } else {
      appTree.value = tree
    }

    // Keep node selected when app tree is refreshed
    if (oldSelectedAppTreeItem) {
      const selectedNode = walkTree(oldSelectedAppTreeItem)

      if (selectedNode && 'el' in selectedNode) {
        selectedAppTreeItem.value = selectedNode
      }
    }
  }

  onMounted(() => {
    if (appTree.value.length === 0) {
      if (import.meta.hot) {
        import.meta.hot.on('vite:afterUpdate', () => {
          refresh()
        })
      }
      refresh()
    }
  })

  return {
    appTree,
    refresh,
    selectAppTreeItem,
    selectedAppTreeItem,
    sameNodeItems,
  }
}
