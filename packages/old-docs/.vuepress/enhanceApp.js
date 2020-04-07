// .vuepress/enhanceApp.js
import { ColorThemePlugin } from '../../ui/src/services/ColorThemePlugin'
import { ContextPlugin } from '../../ui/src/components/context-test/context-provide/ContextPlugin'

import '../../ui/src/components/vuestic-sass/global/reset.scss'
import '../../ui/src/components/vuestic-sass/vuestic-styles.scss'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  Vue.use(ColorThemePlugin)

  Vue.use(ContextPlugin, {})
}
