import { inject, provide, ExtractPropTypes } from 'vue'

const VaSidebarKey = Symbol('VaSidebar')

export const useSidebarProps = {
  color: { type: String, default: 'background-secondary' },
  textColor: { type: String },
}

export const useSidebar = (props: ExtractPropTypes<typeof useSidebarProps>) => {
  provide(VaSidebarKey, props)
}

export const useSidebarItem = () => {
  return inject<ExtractPropTypes<typeof useSidebarProps>>(VaSidebarKey, {
    color: 'background-secondary',
    // activeColor: 'primary',
  })
}
