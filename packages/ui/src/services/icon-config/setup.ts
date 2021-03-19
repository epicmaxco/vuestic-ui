import { useGlobalConfig } from '../GlobalConfigPlugin'
import { getIconConfig } from './icon-config'

function copyObjectWithoutUndefined (obj: any) {
  return Object.keys({ ...obj }).reduce((acc, key) => {
    return obj[key] !== undefined ? { [key]: obj[key], ...acc } : acc
  }, {})
}

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
