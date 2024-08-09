import { ref, Ref, computed } from 'vue';
import { AppTreeItemComponent, AppTreeItem, _appTree, walkTree } from './useAppTree'

const selectedAppTreeItem = ref(null) as Ref<AppTreeItemComponent | null>

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

      walk(_appTree.value)

      return items
    }),
    selectAppTreeItem(search: string | HTMLElement | AppTreeItem | null) {
      if (search === null) {
        selectedAppTreeItem.value = null
        return
      }

      const item = typeof search === 'string' || search instanceof HTMLElement ? walkTree(search) : search

      if (!item) {
        console.log(_appTree.value,
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
