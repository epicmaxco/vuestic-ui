import type { ComponentConfig } from '../component-config/component-config'
import type { ColorConfig } from '../color-config'
import type { IconConfig } from '../icon-config/types'
import type { BreakpointConfig } from '../breakpoint'
import type { I18nConfig } from '../i18n'

export type GlobalConfig = {
  colors: ColorConfig,
  icons: IconConfig,
  components: ComponentConfig,
  breakpoint: BreakpointConfig,
  i18n: I18nConfig,
}

type DeepPartial<T> = T extends Record<string, any> ? {
  // Prevent deep nesting so we ignore 'components' here. 'components' is anyway partial
  [P in keyof T]?: P extends 'components' ? T[P] : DeepPartial<T[P]>;
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
