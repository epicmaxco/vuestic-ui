export type IconConfig = {
  name: string | RegExp

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
  iconClass?: string | ((...regexGroups: string[]) => string) | ((regexGroups: Record<string, any>) => string)

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
  content?: string | ((...regexGroups: string[]) => string | undefined) | ((regexGroups: { [key: string]: any}) => string)

  /** Vue component */
  component?: any,

  /**
   * You can use custom component, bind some props to it.
   * @requires component
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
  componentProps?: Record<string, any> | ((...regexGroups: string[]) => Record<string, any>)

  /**
   * Use this to create icon that u will often to use.
   *
   * Example:
   * ```js
    {
      name: 'twitter',
      to: 'brandico twitter-bird',
      color: '#1da1f2',
    },
    { // Or for Yandex
      name: 'yandex',
      to: 'brandico yandex',
      color: '#ff0000',
    },
    {
      name: 'vuestic-logo',
      to: VuesticLogoComponent,
      color: '#62e471',
    }
  * ```
  */
  to?: string

  // PROPS

  tag?: string
  color?: string
  rotation?: number | string
  spin?: 'clockwise' | 'counter-clockwise'
}

export type IconsConfig = IconConfig[]
