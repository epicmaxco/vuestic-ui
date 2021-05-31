import { IconConfig } from '../../services/icon-config/types'

const fontsConfig: IconConfig = [
  {
    name: 'md-outlined-{name}',
    resolve: ({ name }) => ({ content: name, class: 'material-icons-outlined' }),
  },
  {
    name: 'md-{name}',
    resolve: ({ name }) => ({ content: name, class: 'material-icons' }),
  },
  {
    name: 'fa4-{code}',
    resolve: ({ code }) => ({ class: `fa fa-${code}` }),
  },
  {
    name: /(fas|far|fal|fad|fab)-(.*)/,
    resolveFromRegex: (font, code) => ({ class: `${font} fa-${code} fa-fw` }),
  },
  {
    name: 'ion-outline-{code}',
    resolve: ({ code }) => ({ class: `icon ion-ios-${code}-outline` }),
  },
  {
    name: 'ion-{code}',
    resolve: ({ code }) => ({ class: `icon ion-md-${code}` }),
  },
  {
    name: 'entypo-{code}',
    resolve: ({ code }) => ({ class: `entypo-${code}` }),
  },
  {
    name: 'text',
  },
]

export default Object.values(fontsConfig)
