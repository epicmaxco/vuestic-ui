import Vue from 'vue'
import BookApp from './BookApp'
import VueClipboard from 'vue-clipboard2'
import Router from 'vue-router'
import { VueBookComponents, createRoute } from 'vue-book'
import { ColorThemePlugin } from '../services/ColorThemePlugin'
import { ContextPlugin } from '../components/context-test/context-provide/ContextPlugin'
import { BusPlugin } from 'vue-epic-bus'
import { registerVuesticObject } from '../components/resize-events'
import { DropdownPopperPlugin } from '../components/vuestic-components/va-dropdown/dropdown-popover-subplugin'
import { installPlatform } from '../components/vuestic-components/va-popup/install'
import ColorHelpersPlugin from '../components/vuestic-utilities/color-helpers-plugin'

// eslint-disable-next-line
console.log(`Version: ${VERSION}, ${TIMESTAMP}, commit: ${COMMIT}`)

installPlatform()

Vue.use(Router)
Vue.use(VueBookComponents)
if (!process.env.VUE_APP_DEMO_NO_THEME_PLUGIN) {
  Vue.use(ColorThemePlugin)
}
Vue.use(DropdownPopperPlugin)
Vue.use(ContextPlugin, {})

const router = new Router({
  routes: [
    createRoute({
      requireContext: require.context('./../components', true, /.demo.vue$/),
      path: '/demo',
    }),
    {
      path: '*',
      redirect: '/demo',
    },
  ],
})

registerVuesticObject(Vue)

Vue.use(BusPlugin)
Vue.use(VueClipboard)
Vue.use(DropdownPopperPlugin)
Vue.use(ColorHelpersPlugin)

new Vue({
  router,
  render: h => h(BookApp),
}).$mount('#app')
