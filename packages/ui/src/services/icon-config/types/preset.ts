import IconProps from './icon-props'

export interface IconPresetConfigBase extends IconProps {
  name: RegExp,
}

export interface IconCssConfig extends IconPresetConfigBase {
  type: 'css',
  /**
   * This will transform icon class if its match regex
   *
   * @example
   * ```
   * {
   *  name: /(fas|far|fal|fad|fab) (.*)/
   *  iconClass: (font: string, icon: string) => `${font} fa-${code}`,
   *  color: '#eee' // Additional styling for icon
   * }
   * ```
   * `<va-icon name="fal home" />`
   *  ->
   *
   * `<i class="fal fa-home" style="#eee"/>`
   *
   * @see https://fontawesome.com/icons/home?style=solid
  */
   iconClass: (...regexGroups: string[]) => string
}

export interface IconComponentConfig extends IconPresetConfigBase {
  type: 'component',
  /** Vue component */
  component: any,
  /**
   * You can use custom component, bind some props to it.
   *
   * @example
   * ```
   * {
   *  name: /(brandico, eva, ant-design) (.*)/,
   *  component: IconifyComponent,
   *  componentProps: (font: string, icon: string) => ({ icon: `${font}:${icon}` })
   *  color: '#eee' // Additional styling for icon
   * }
   * ```
   *
   * IconifyComponent example component:
   * ```html
   * <template>
   *  <div class="iconify" :data-icon="icon" data-inline="false" />
   * </template>
   *
   * <script>
   * export defualt {
   *  props: ['icon']
   * }
   * </script>
   * ```
   *
   * @see https://iconify.design/icon-sets/brandico/
   */
  componentProps: (...regexGroups: string[]) => Record<string, any>
}

export interface IconLigatureConfig extends IconPresetConfigBase {
  type: 'ligature'
  iconClass?: string
  /**
   * Content is used if we want to use custom symbols
   *
   * @example
   * ```
   * {
   *  name: /md (.*)/,
   *  content: (icon: string) => icon,
   *  iconClass: 'material-icons'
   *  color: '#eee' // Additional styling for icon
   * }
   * ```
   * `<va-icon name="md alarm"/>` ->
   *
   * `<i class="md" style="color: #eee;">alarm</i>`
   *
   * @see https://material.io/resources/icons/?icon=alarm&style=baseline
   */
  content: (...regexGroups: string[]) => any
}

export type IconConfigPreset = IconCssConfig | IconComponentConfig | IconLigatureConfig
