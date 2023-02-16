const createVuesticConfig = (css: string[] = []) => {
  if (css.length) {
    return `
config: {
  // Vuestic config here
},

css: [${css.map((c) => `'${c}'`).join(', ')}],
`.trim()
  }

  return `
config: {
  // Vuestic config here
}
`.trim()
}

const createNuxtConfig = (vuesticConfig: string) => {
  return `
  modules: [
    '@vuestic/nuxt'
  ],

  vuestic: {
    ${vuesticConfig.split('\n').join('\n    ')}
  },
`
}

export const insertNuxtModule = (source: string, css: string[]) => {
  const vuesticConfig = createVuesticConfig(css)

  if (/vuestic: \{/.test(source) || /modules: \[((.|\n)*)\]/gm.test(source)) {
    throw new Error('Unexpected error: Nuxt config already contains vuestic module')
  }

  source = source
    .replace(/defineNuxtConfig\({([.|\n]*)}\)/m, (a, b) => a.replace(b, createNuxtConfig(vuesticConfig)))

  return source
}
