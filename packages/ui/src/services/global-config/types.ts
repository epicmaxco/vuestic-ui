import type { ComponentConfig } from '../component-config/component-config'
import type { ColorConfig } from '../color-config'
import type { IconConfig } from '../icon-config/types'
import type { BreakpointConfig } from '../breakpoint'

export type GlobalConfig = {
  colors: ColorConfig,
  icons: IconConfig,
  components: ComponentConfig,
  breakpoint: BreakpointConfig,
}

export type DeepPartial<T> = T extends Record<string, any> ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type PartialGlobalConfig = DeepPartial<GlobalConfig>

export type SizeConfig = {
  defaultSize?: number,
  sizes?: { [sizeName: string]: number | string },
}

export type GlobalConfigUpdater<T> = (config: T) => T;
export type {
  ColorConfig,
  ComponentConfig,
  IconConfig,
  BreakpointConfig,
}
