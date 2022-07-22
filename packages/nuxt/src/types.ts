import type { GlobalConfig, VuesticComponentName } from 'vuestic-ui'

export interface VuesticOptions {
  /**
   * Vuestic Global Config
   *
   * @see https://vuestic.dev/en/services/global-config
   */
  config: GlobalConfig,

  /**
   * Choose which CSS modules will be added to nuxt
   *
   * If `true`, all CSS modules will be added. If `false`, no CSS modules will be added.
   * If an array, only CSS modules from this array will be added.
   *
   * @default true
   *
   * @see https://vuestic.dev/en/getting-started/tree-shaking#css-code-split
   */
  css: Array<'typography' | 'grid' | 'reset'> | boolean,

  /**
   * Component names that will be registered globally. Component name must starts with `Va` prefix.
   *
   * @default all components from vuestic-ui
   *
   * @example ['VaDropdown', 'VaToast', 'VaModal']
   *
   * @see https://vuestic.dev/en/getting-started/tree-shaking
   */
  components: VuesticComponentName[] | undefined,
}

/** Declare Vuestic module options in NuxtConfig */
 declare module '@nuxt/schema' {
  interface NuxtConfig {
    vuestic?: Partial<VuesticOptions>
  }
}