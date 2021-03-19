import IconProps from './icon-props'

/** Not sure what type is VueComponent */
type VueComponent = any

/**
 * Alias will change icon name from `from` to `to`.
 * Use this to create icon that u will often to use
 *
 * Example:
 * ```js
  {
    from: 'twitter',
    to: 'brandico twitter-bird',
    color: '#1da1f2',
  },
  { // Or for Yandex
    from: 'yandex',
    to: 'brandico yandex',
    color: '#ff0000',
  },
  {
    from: 'vuestic-logo',
    to: VuesticLogoComponent,
    color: '#62e471',
  }
 * ```
*/
export default interface IconConfigAlias extends IconProps {
  from: string
  to: string | VueComponent
}
