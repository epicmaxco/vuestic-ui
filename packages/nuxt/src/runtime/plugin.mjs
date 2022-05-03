import { VuesticPlugin, VuesticPluginsWithoutComponents } from 'vuestic-ui'

// @ts-ignore: ts isn't working in proper way into plugin templates
export default (nuxtApp) => {
  const { vueApp: app } = nuxtApp

  const config = JSON.parse('<%= options.config %>')
  const withoutComponents = JSON.parse('<%= options.withoutComponents %>')

  app.use(withoutComponents ? VuesticPluginsWithoutComponents : VuesticPlugin, config)
}
