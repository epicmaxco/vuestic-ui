/* eslint-disable no-useless-escape */
/* eslint-disable no-template-curly-in-string */
export type IconConfigExample = {
  name: string,
  description?: string,
  resolve: Partial<{
    class: string,
    content: string,
    attrs: string,
    tag: string,
  }>,
  exampleName: string,
}

export const examples: { label: string, value: IconConfigExample }[] = [
  {
    label: 'Font Awesome',
    value: {
      name: 'fa-{code}',
      resolve: {
        class: '`fas fa-${code}`',
      },
      exampleName: 'fa-book',
    },
  },
  {
    label: 'Material icons',
    value: {
      name: 'mdi-{icon}',
      resolve: {
        class: '\'material-icons\'',
        content: 'icon',
        tag: "'span'",
      },
      exampleName: 'mdi-book',
    },
  },
  {
    label: 'Ionic icons',
    value: {
      name: 'io-{icon}',
      resolve: {
        tag: "'ion-icon'",
        attrs: '{ name: `${icon}` }',
      },
      exampleName: 'io-book',
    },
  },
  {
    label: 'Ionic icons (regex)',
    value: {
      name: '/io-?(.*)?-(.*)/',
      description: 'Valid regex for `io-outline-book` or `io-book` or `io-anyprefix-book`',
      resolve: {
        tag: "'ion-icon'",
        attrs: '{ name: group0 ? `${group1}-${group0}` : group1 }',
      },
      exampleName: 'io-outline-book',
    },
  },
]
