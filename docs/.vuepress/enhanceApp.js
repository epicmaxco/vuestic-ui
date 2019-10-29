// .vuepress/enhanceApp.js
import { ColorThemePlugin } from '../../src/services/ColorThemePlugin'
import { ContextPlugin } from '../../src/components/context-test/context-provide/ContextPlugin'

export default ({
                  Vue, // the version of Vue being used in the VuePress app
                  options, // the options for the root Vue instance
                  router, // the router instance for the app
                  siteData, // site metadata
                }) => {

  if (typeof process === 'undefined') { // process is undefined in a browser
    Vue.use(ColorThemePlugin)
    Vue.use(ContextPlugin, { VaBadge: { color: 'danger', label: 'badge' } })
  }
}
