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
