import { provide, inject, getCurrentInstance, computed, ref } from 'vue'

const key = 'VaSidebar'

export const useSidebar = () => {
  const { props } = getCurrentInstance()!

  provide(key, {
    color: computed(() => props.color),
  })
}

export const useSidebarItem = () => {
  const { color } = inject(key, { color: ref('') })

  return {
    sidebarColor: color,
  }
}
