import { ColorConfig } from '../../composables'
import type { ComponentConfig, Props } from '../component-config/component-config'
import type { IconConfig } from '../icon-config/types'
import { BreakpointsConfig } from '../breakpoints'

export type GlobalConfig = {
  colors?: ColorConfig,
  icons?: IconConfig,
  components?: ComponentConfig
  componentsAll?: Props,
  breakpoints?: BreakpointsConfig,
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
  BreakpointsConfig,
}
