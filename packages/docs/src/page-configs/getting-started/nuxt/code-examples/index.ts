export const nuxtConfigCode = `
export default defineNuxtConfig({
  buildModules: ['@vuestic/nuxt'],

  vuestic: {
    config: {
      // Config here
    }
  }
})
`

export const installationObject = {
  npm: 'npm install @vuestic/nuxt',
  yarn: 'yarn add @vuestic/nuxt',
}
