import type { PartialGlobalConfig } from 'vuestic-ui'

export interface VuesticOptions {
  /**
   * Vuestic Global Config
   *
   * @see https://vuestic.dev/en/services/global-config
   */
  config: PartialGlobalConfig,

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
   * Use vuestic default fonts.
   *
   * If `false` you will need to install fonts manually. If you're going to use different font, don't forget to change `--va-font-family` CSS variable.
   *
   * @notice this option adds `Source Sans Pro` and `Material Icons` fonts.
   *
   * @default true
   *
   * @see https://vuestic.dev/en/getting-started/installation#assets-installation
   */
  fonts: boolean
}

/** Declare Vuestic module options in NuxtConfig */
 declare module '@nuxt/schema' {
  interface NuxtConfig {
    vuestic?: Partial<VuesticOptions>
  }
}
