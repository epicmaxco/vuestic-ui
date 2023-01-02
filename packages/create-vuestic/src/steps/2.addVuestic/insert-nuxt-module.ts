const defaultVuesticConfig = `
config: {
  // Vuestic config here
}
`.trim()

const createNuxtConfig = (vuesticConfig: string = defaultVuesticConfig) => {
  return `
  modules: [
    '@vuestic/nuxt'
  ],

  vuestic: {
    ${vuesticConfig.split('\n').join('\n    ')}
  },
`
}

export const insertNuxtModule = (source: string) => {
  if (/vuestic: \{/.test(source) || /modules: \[((.|\n)*)\]/gm.test(source)) {
    throw new Error('Unexpected error: Nuxt config already contains vuestic module')
  }

  source = source
    .replace(/defineNuxtConfig\({([.|\n]*)}\)/m, (a, b) => a.replace(b, createNuxtConfig()))

  return source
}
