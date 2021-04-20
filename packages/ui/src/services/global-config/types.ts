import { ColorConfig } from '../color-config/color-config'
import { ComponentConfig } from '../component-config/component-config'
import { IconConfig } from '../icon-config/types'

export type GlobalConfig = {
  colors?: ColorConfig,
  icons?: IconConfig,
  components?: ComponentConfig
}

export type GlobalConfigUpdater = (config: GlobalConfig) => GlobalConfig;
export type {
  ColorConfig,
  ComponentConfig,
  IconConfig,
}
