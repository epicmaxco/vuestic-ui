import { useGlobalConfig } from '../GlobalConfigPlugin'
import { getIconConfig } from './get-icon-config'
import { copyObjectWithoutUndefined } from './utils'

export const setupIcons = (props: any) => {
  const getIcon = (name: string) => {
    const globalConfig = useGlobalConfig().getGlobalConfig()
    const iconsConfig = globalConfig.icons
    const config = getIconConfig(name, iconsConfig)
    const iconPropsArray = copyObjectWithoutUndefined(props)
    return { ...config, ...iconPropsArray }
  }

  return {
    getIcon,
  }
}
