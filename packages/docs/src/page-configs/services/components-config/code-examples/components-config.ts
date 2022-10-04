export const componentsConfigCodeExample = `
...
components: {
  VaAvatar: {
    square: true,
    icon: 'spinner',
  },
  VaCard: {
    color: 'secondary',
  },
  VaTabs: {
    grow: true,
  },
},
...
`

export const componentsAllConfigCodeExample = `
...
components: {
  all: {
    color: '#d91698',
    disabled: 'true',
  },
},
...
`

export const componentsPresetsConfigCodeExample = `
...
components: {
  presets: {
    VaButton: {
      addToCart: { size: 'large', round: true },
      deleteFromCart: { size: 'small', plain: true },
    },
  },
},
...
`

export const componentsConfigCodeExampleDefaultSizes = `
...
components: {
  VaIcon: {
    sizesConfig: {
      defaultSize: 24,
      sizes: {
          small: 16,
          medium: 24,
          large: 32,
      },
    },
  },
},
...
`
