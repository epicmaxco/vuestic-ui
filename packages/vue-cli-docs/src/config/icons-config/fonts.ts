import { IconConfiguration } from 'vuestic-ui/src/main'

export const fonts: IconConfiguration[] = [
  {
    name: 'fa4-{code}',
    resolve: ({ code }) => ({ class: code }),
  },
  {
    name: 'md-{content}',
    class: 'material-icons',
    resolve: ({ content }) => ({ content: content }),
  },
  {
    name: 'fa4-{code}',
    resolve: ({ code }) => ({ class: `fa fa-${code}` }),
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
    name: /(brandico|entypo|fontawesome|fontelico|iconicfill|iconicstroke|maki|openwebicons|typicons|zocial)-(.*)/,
    resolveFromRegex: (font, code) => ({ class: `${font}-${code}` }),
  },
  {
    name: /(fas|far|fal|fad|fab)-(.*)/,
    resolveFromRegex: (font, code) => ({ class: `${font} fa-${code} fa-fw` }),
  },
  {
    name: 'text',
  },
]
