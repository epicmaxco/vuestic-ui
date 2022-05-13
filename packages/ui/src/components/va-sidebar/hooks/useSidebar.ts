import { provide, inject, getCurrentInstance, computed, ComputedRef } from 'vue'

const key = 'VaSidebar'

export const useSidebar = () => {
  const { props } = getCurrentInstance()!

  provide(key, {
    color: computed(() => props.color),
  })
}

export const useSidebarItem = () => {
  const { color } = inject<{ color: ComputedRef<string> }>(key, { color: computed(() => '') })

  return {
    sidebarColor: color,
  }
}
