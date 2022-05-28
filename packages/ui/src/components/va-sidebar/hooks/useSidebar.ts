import { inject, provide, ExtractPropTypes } from 'vue'

const VaSidebarKey = Symbol('VaSidebar')

export const useSidebarProps = {
  color: { type: String, default: 'background-mute' },
  textColor: { type: String },
  // activeColor: { type: String, default: 'primary' },
  // hoverColor: { type: String, default: undefined },
  // borderColor: { type: String, default: undefined },
}

export const useSidebar = (props: ExtractPropTypes<typeof useSidebarProps>) => {
  provide(VaSidebarKey, props)
}

export const useSidebarItem = () => {
  return inject<ExtractPropTypes<typeof useSidebarProps>>(VaSidebarKey, {
    color: 'background-mute',
    // activeColor: 'primary',
  })
}
