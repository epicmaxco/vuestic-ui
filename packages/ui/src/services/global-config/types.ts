import type { ColorConfig } from '../color-config/color-config'
import type { ComponentConfig } from '../component-config/component-config'
import type { IconConfig } from '../icon-config/types'

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
