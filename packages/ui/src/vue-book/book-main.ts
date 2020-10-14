// @ts-nocheck

import Vue from 'vue'
import BookApp from './BookApp.vue'
import VueClipboard from 'vue-clipboard2'
import Router from 'vue-router'
import { VueBookComponents, createRoute } from 'vue-book'
import { setTheme, DEFAULT_THEME } from '../services/Theme'
import { getDefaultConfig } from '../components/vuestic-components/va-config/config-default'
import GlobalConfigPlugin from '../services/GlobalConfigPlugin'
import { BusPlugin } from 'vue-epic-bus'
import { registerVuesticObject } from '../components/resize-events'
import { DropdownPopperPlugin } from '../components/vuestic-components/va-dropdown/dropdown-popover-subplugin.js'
import { installPlatform } from '../components/vuestic-components/va-popup/install.js'
import ColorHelpersPlugin from '../components/vuestic-utilities/color-helpers-plugin'
import ToastInstall from '../components/vuestic-components/va-toast/install'

// eslint-disable-next-line
console.log(`Version: ${VERSION}, ${TIMESTAMP}, commit: ${COMMIT}`)

installPlatform()

Vue.use(Router)
Vue.use(VueBookComponents)
if (!process.env.VUE_APP_DEMO_NO_THEME_PLUGIN) {
  setTheme(DEFAULT_THEME)
}
Vue.use(DropdownPopperPlugin)
Vue.use(GlobalConfigPlugin, getDefaultConfig())

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
Vue.use(ToastInstall)

new Vue({
  router,
  render: h => h(BookApp),
}).$mount('#app')
