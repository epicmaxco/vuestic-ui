import { getIconConfiguration } from './icon-helpers'
import { IconConfig, useGlobalConfig } from '../global-config/global-config'

export const useIcons = (props: any) => {
  const { getGlobalConfig } = useGlobalConfig()

  const getIconConfig = (): IconConfig => {
    return getGlobalConfig().icons || []
  }

  return {
    // TODO: export here function that can dynamically change icons config
    getIcon: (name: string) => getIconConfiguration(name, getIconConfig()),
  }
}
