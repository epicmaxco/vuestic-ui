import type { ComponentConfig } from '../component-config/component-config'
import type { ColorConfig } from '../color-config'
import type { IconConfig } from '../icon-config/types'

export type GlobalConfig = {
  colors?: ColorConfig,
  icons?: IconConfig,
  components?: ComponentConfig
}

export type SizeConfig = {
  defaultSize?: number,
  sizes?: { [sizeName: string]: number | string },
}

export type GlobalConfigUpdater = (config: GlobalConfig) => GlobalConfig;
export type {
  ColorConfig,
  ComponentConfig,
  IconConfig,
}
