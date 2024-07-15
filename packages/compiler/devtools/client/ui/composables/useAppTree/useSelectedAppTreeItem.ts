import { ref, Ref, computed } from 'vue';
import { AppTreeItemComponent, AppTreeItem, useAppTree } from './useAppTree'

const selectedAppTreeItem = ref(null) as Ref<AppTreeItemComponent | null>

const tree = useAppTree()

const walk = (tree: AppTreeItem[], search: string | HTMLElement): AppTreeItem | null => {
  for (const item of tree) {
    if ('text' in item) {
      continue
    }

    if (typeof search === 'string' && item.ids.includes(search)) {
      return item
    } else if (search instanceof HTMLElement) {
      if (item.el?.isEqualNode(search)) {
        return item
      }

      if (item.repeatedElements?.some((el) => el.isEqualNode(search))) {
        return item
      }
    }

    const child = walk(item.children, search)

    if (child) {
      return child
    }
  }

  return null
}

export const useSelectedAppTreeItem = () => {
  return {
    selectedAppTreeItem,
    sameNodeItems: computed(() => {
      if (!selectedAppTreeItem.value) {
        return []
      }

      const items: AppTreeItemComponent[] = []

      const walk = (tree: AppTreeItem[]) => {
        for (const item of tree) {
          if ('text' in item) {
            continue
          }

          if (item.el?.isEqualNode(selectedAppTreeItem.value!.el)) {
            items.push(item)
          }

          if (item.repeatedElements?.some((el) => el.isEqualNode(selectedAppTreeItem.value!.el))) {
            items.push(item)
          }

          walk(item.children)
        }
      }

      walk(tree.value)

      return items
    }),
    selectAppTreeItem(search: string | HTMLElement | AppTreeItem | null) {
      if (search === null) {
        selectedAppTreeItem.value = null
        return
      }

      const item = typeof search === 'string' || search instanceof HTMLElement ? walk(tree.value, search) : search

      if (!item) {
        console.log(tree.value,
          search
        )
        throw new Error('Could not find item')
      }

      if ('text' in item) {
        throw new Error('Can not select text item')
      }

      selectedAppTreeItem.value = item
    }
  }
}
