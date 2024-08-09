import { computed } from 'vue';
import { useComponentCode } from "./useComponentCode"
import { useComponentSource } from "./useComponentSource"
import { defineGlobal } from '../base/defineGlobal'
import { useAppTree } from '../useAppTree';
import { useComponentOptions } from './useComponentOptions';

export const useComponent = defineGlobal(() => {
  const {
    selectedAppTreeItem,
    selectAppTreeItem
  } = useAppTree()

  const vNode = computed(() => {
    return selectedAppTreeItem.value?.vnode ?? null
  })

  const element = computed(() => {
    return (selectedAppTreeItem.value?.el as HTMLElement) ?? null
  })

  const uid = computed(() => {
    return selectedAppTreeItem.value?.ids[0]
  })

  const name = computed(() => {
    return selectedAppTreeItem.value?.name
  })

  const source = useComponentSource(uid)
  const code = useComponentCode(source, vNode)
  const options = useComponentOptions(code, source, vNode)

  return {
    uid,
    name,
    element,
    source,
    code,
    options,
    setComponent: selectAppTreeItem
  }
})
