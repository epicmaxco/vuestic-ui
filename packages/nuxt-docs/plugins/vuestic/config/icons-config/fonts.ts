import { IconConfiguration } from 'vuestic-ui/src/main'

export const fonts: IconConfiguration[] = [
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
    name: 'entypo-{code}',
    resolve: ({ code }) => ({ class: `entypo-${code}` }),
  },
  {
    name: /(fas|far|fal|fad|fab|fa)-(.*)/,
    resolveFromRegex: (font, code) => ({ class: `${font} fa-${code}` }),
  },
  {
    name: 'text',
  },
]
