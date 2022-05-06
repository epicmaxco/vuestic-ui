export const nuxtConfigCode = `
export default defineNuxtConfig({
  buildModules: ['@vuestic-ui/nuxt'],

  vuestic: {
    config: {
      // Config here
    }
  }
})
`

export const installationObject = {
  npm: 'npm install @vuestic-ui/nuxt',
  yarn: 'yarn add @vuestic-ui/nuxt',
}
