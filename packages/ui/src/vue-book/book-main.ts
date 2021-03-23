import { createApp } from 'vue'
import App from './BookApp.vue'
import { GlobalConfigPlugin, GlobalConfig } from '../services/GlobalConfigPlugin'
import DropdownPopperSubplugin from '../components/vuestic-components/va-dropdown/dropdown-popover-subplugin'
// import ColorHelpersPlugin from '../components/vuestic-utilities/color-helpers-plugin'
import ToastInstall from '../components/vuestic-components/va-toast/install'

import { VueBookComponents, createRoute } from 'vue-book'
import { createRouter, createWebHashHistory } from 'vue-router'

import demoIconAliases from './vuestic-config/demo-icon-aliases'
import demoIconFonts from './vuestic-config/demo-icon-fonts'

import './vue-book-overrides.scss'
import { createIconConfig } from '../services/icon-config/icon-config'

console.log(`Version: ${VERSION}, ${TIMESTAMP}, commit: ${COMMIT}`)

// @ts-ignore
const app = createApp(App)

const routes = [
  createRoute({
    requireContext: require.context('../components', true, /.demo.vue$/),
    path: '/demo',
  }),
  {
    path: '/:pathMatch(.*)*',
    redirect: '/demo',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// app.use(ColorHelpersPlugin)
app.use(VueBookComponents)
app.use(ToastInstall)
app.use(DropdownPopperSubplugin)
app.use(router)

app.use(GlobalConfigPlugin, {
  icons: createIconConfig({
    aliases: demoIconAliases,
    font: demoIconFonts,
  }),
} as GlobalConfig)

app.mount('#app')
