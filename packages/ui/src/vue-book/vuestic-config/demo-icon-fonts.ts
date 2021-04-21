import { IconConfig } from '../../services/icon-config/types'

const fontsConfig: IconConfig = [
  {
    name: 'md-{name}',
    resolve: ({ name }) => ({ content: name }),
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
    name: 'ion-{code}',
    resolve: ({ code }) => ({ class: `icon ion-md-${code}` }),
  },
  {
    name: 'ion-outline-{code}',
    resolve: ({ code }) => ({ class: `icon ion-ios-${code}-outline` }),
  },
  {
    name: 'entypo-{code}',
    resolve: ({ code }) => ({ class: `entypo-${code}` }),
  },
  {
    name: /(brandico|fontawesome|fontelico|iconicfill|iconicstroke|maki|openwebicons|typicons|zocial)-(.*)/,
    resolveFromRegex: (font: string, code: string) => ({ class: `${font}-${code}` }),
  },
  {
    name: 'text',
  },
]

export default Object.values(fontsConfig)
