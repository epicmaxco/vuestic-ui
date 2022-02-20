import { createApp } from 'vue'
import App from './BookApp.vue'
import DropdownPopperSubplugin
  from '../components/va-dropdown/dropdown-popover-subplugin'
// import ColorHelpersPlugin from '../components/vuestic-utilities/color-helpers-plugin'
import ToastInstall from '../components/va-toast/install'

import { VueBookComponents, createRoute } from 'vue-book'
import { createRouter, createWebHashHistory } from 'vue-router'

import demoIconAliases from './vuestic-config/demo-icon-aliases'
import demoIconFonts from './vuestic-config/demo-icon-fonts'

import './vue-book-overrides.scss'
import { createIconsConfig, VuesticPluginsWithoutComponents } from '../main'
import { colorsPresets } from '../services/color-config/color-theme-presets'

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

app.use(VueBookComponents)
app.use(router)

app.use(VuesticPluginsWithoutComponents, {
  icons: createIconsConfig({
    aliases: demoIconAliases,
    fonts: demoIconFonts,
  }),
  colors: {
    ...colorsPresets.default,
    banana: '#d0f55d',
  },
})

app.mount('#app')
