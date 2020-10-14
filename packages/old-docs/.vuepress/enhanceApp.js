// .vuepress/enhanceApp.js
import GlobalConfigPlugin from 'vuestic-ui/src/services/GlobalConfigPlugin';

import '../../ui/src/components/vuestic-sass/global/reset.scss'
import '../../ui/src/components/vuestic-sass/vuestic-styles.scss'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  Vue.use(GlobalConfigPlugin, {})
}
