import { provide, inject, getCurrentInstance, toRef, ref } from 'vue'

const key = Symbol('VaSidebar')

export const useSidebar = () => {
  const { props } = getCurrentInstance() as unknown as { props: { color?: string } }

  provide(key, {
    color: toRef(props, 'color'),
  })
}

export const useSidebarItem = () => {
  const { color } = inject(key, { color: ref('white') })

  return {
    sidebarColor: color,
  }
}
