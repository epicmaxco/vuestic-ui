import type { ComponentConfig } from '../component-config'
import type { ColorConfig, CustomColorVariables } from '../color'
import type { IconConfig } from '../icon'
import type { BreakpointConfig } from '../breakpoint'
import type { I18nConfig, CustomI18NKeys } from '../i18n'
import type { Ref, Component } from 'vue'
import type { ColorsClassesConfig } from '../colors-classes'

export type GlobalConfig = {
  colors: ColorConfig,
  icons: IconConfig,
  components: ComponentConfig,
  breakpoint: BreakpointConfig,
  i18n: I18nConfig,
  colorsClasses: ColorsClassesConfig,
  routerComponent: Component | undefined,
}

type DeepPartial<T> = T extends Record<string, any> ? {
  // Prevent deep nesting so we ignore 'components' here. 'components' is anyway partial
  [P in keyof T]?: P extends 'components' ? T[P] : DeepPartial<T[P]>;
} : T;

export type PartialGlobalConfig = DeepPartial<GlobalConfig> & {
  // Need to maintain ability to extend through module augmentation
  colors?: {
    variables?: Partial<CustomColorVariables>
  }
  i18n?: Partial<CustomI18NKeys>
}

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

export type ProvidedGlobalConfig = {
  globalConfig: Ref<GlobalConfig>,
  getGlobalConfig: () => GlobalConfig,
  /**
   * Set new global config
   * @see mergeGlobalConfig if you want to update existing config
   */
  setGlobalConfig: (updater: GlobalConfig | GlobalConfigUpdater<GlobalConfig>) => void,
  mergeGlobalConfig: (updater: PartialGlobalConfig | GlobalConfigUpdater<PartialGlobalConfig>) => void
}

export const defineVuesticConfig = <Config extends DeepPartial<GlobalConfig>>(config: Config) => config
