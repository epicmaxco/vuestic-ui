// @ts-nocheck

import Vue from 'vue'
import BookApp from './BookApp.vue'
import VueClipboard from 'vue-clipboard2'
import Router from 'vue-router'
import { VueBookComponents, createRoute } from 'vue-book'
import { useTheme, DEFAULT_THEME } from '../services/Theme'
import { getDefaultConfig } from '../components/vuestic-components/va-config/config-default'
import GlobalConfigPlugin, { useGlobalConfig } from '../services/GlobalConfigPlugin'
import { BusPlugin } from 'vue-epic-bus'
import { registerVuesticObject } from '../components/resize-events'
import { DropdownPopperPlugin } from '../components/vuestic-components/va-dropdown/dropdown-popover-subplugin.js'
import { installPlatform } from '../components/vuestic-components/va-popup/install.js'
import ColorHelpersPlugin from '../components/vuestic-utilities/color-helpers-plugin'
import ToastInstall from '../components/vuestic-components/va-toast/install'
import VueCompositionAPI from '@vue/composition-api'
import Component from 'vue-class-component'

// https://github.com/vuejs/composition-api/issues/136
Component.registerHooks(['setup'])

// eslint-disable-next-line
console.log(`Version: ${VERSION}, ${TIMESTAMP}, commit: ${COMMIT}`)

installPlatform()

Vue.use(Router)
Vue.use(VueCompositionAPI)
Vue.use(VueBookComponents)
Vue.use(GlobalConfigPlugin)
Vue.use(DropdownPopperPlugin)

if (!process.env.VUE_APP_DEMO_NO_THEME_PLUGIN) {
  Vue.mixin({
    setup () {
      const { setGlobalConfig } = useGlobalConfig()

      setGlobalConfig(getDefaultConfig())

      const { setTheme } = useTheme()

      setTheme(DEFAULT_THEME)
    },
  })
}

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
