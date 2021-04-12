import { ColorConfig } from '../color-config/color-config'
import { ComponentConfig } from '../component-config/component-config'
import { IconsConfig } from '../icon-config/types'

export type GlobalConfig = {
  colors?: ColorConfig,
  icons?: IconsConfig,
  components?: ComponentConfig
}

export type GlobalConfigUpdater = (config: GlobalConfig) => GlobalConfig;
export type {
  ColorConfig,
  ComponentConfig,
  IconsConfig,
}
