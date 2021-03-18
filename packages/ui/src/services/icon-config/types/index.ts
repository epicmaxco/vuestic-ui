import IconConfigAlias from './icon-alias'
import { IconConfigPreset } from './preset'

/**
 * @example
 *
 */
export type IconsConfig = {
  // In many cases application requires icon with all customization applied.
  // <va-icon alias="star"/> - so you just use something like this, and color, size, and correct icon implementation are applied.
  // Aliases shouldn't have fallback. So if alias is not defined - things should break :).
  // Aliases are recommended way to use icons and prevent a lot of duplication.
  /** Aliases will convert icon name `from` to `to`. Then `to` name will be given to `presets` */
  aliases?: IconConfigAlias[],
  presets?: IconConfigPreset[], // TODO: Preset is wrong name
  defaultPreset?: IconConfigPreset
}

/**
const example: IconsConfig = {
  presets: [
    {
      name: /(fas, fad) (.*)/,
      type: 'css',
      iconClass: (font: string, icon: string) => `${font} fa-${icon}`,
    },
    {
      name: /md (.*)/,
      type: 'ligature',
      iconClass: 'material-design',
      content: (icon: string) => icon,
    },
    {
      name: /(brandico, eva, ant-design) (.*)/,
      type: 'component',
      component: 'IconifyComponent',
      componentProps: (font: string, icon: string) => ({ icon: `${font}:${icon}` }),
      color: '#eee',
    },
  ],
  aliases: [
    {
      from: 'twitter',
      to: 'brandico twitter-bird',
      color: '#1da1f2',
    },
    {
      from: 'yandex',
      to: 'brandico yandex',
      color: '#ff0000',
    },
    {
      from: 'vuestic-logo',
      to: 'VuesticLogoComponent',
      color: '#62e471',
    },
  ],
}
*/
