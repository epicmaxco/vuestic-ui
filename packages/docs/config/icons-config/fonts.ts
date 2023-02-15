import { IconConfiguration } from 'vuestic-ui'

export const fonts: IconConfiguration[] = [
  {
    name: 'md-{content}',
    class: 'material-icons',
    resolve: ({ content }) => ({ content: content }),
  },
  {
    name: 'mdi-{name}',
    resolve: ({ name }) => ({ class: `mdi mdi-${name}` }),
  },
  {
    name: 'fa4-{code}',
    resolve: ({ code }) => ({ class: `fa fa-${code}` }),
  },
  {
    name: 'ion-{code}',
    resolve: ({ code }) => ({
      tag: 'ion-icon',
      attrs: { name: `${code}` },
    }),
  },
  {
    name: 'ion-{code}-outline',
    resolve: ({ code }) => ({
      tag: 'ion-icon',
      attrs: { name: `${code}-outline` },
    }),
  },
  {
    name: /(fas|far|fal|fad|fab)-(.*)/,
    resolveFromRegex: (font, code) => ({ class: `${font} fa-${code} fa-fw` }),
  },
]
