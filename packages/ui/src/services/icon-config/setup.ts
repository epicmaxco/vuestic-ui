import { getGlobalConfig } from '../global-config/global-config'
import { getIconConfig } from './get-icon-config'
import { copyObjectWithoutUndefined } from './utils'

export const useIcons = (props: any) => {
  const getIcon = (name: string) => {
    const globalConfig = getGlobalConfig()
    const iconsConfig = globalConfig.icons
    const config = getIconConfig(name, iconsConfig)
    const iconPropsArray = copyObjectWithoutUndefined(props)
    return { ...config, ...iconPropsArray }
  }

  return {
    // TODO: export here function that can dynamically change icons config
    getIcon,
  }
}
