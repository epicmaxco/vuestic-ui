import { createApp } from 'vue'
import App from './BookApp.vue'
import GlobalConfigPlugin from '../services/GlobalConfigPlugin'
import { DEFAULT_THEME } from '../services/Theme'
import { getDefaultConfig } from '../components/vuestic-components/va-config/config-default'
import DropdownPopperSubplugin from '../components/vuestic-components/va-dropdown/dropdown-popover-subplugin'
// import ColorHelpersPlugin from '../components/vuestic-utilities/color-helpers-plugin'
import ToastInstall from '../components/vuestic-components/va-toast/install'

import { VueBookComponents, createRoute } from 'vue-book'
import { createRouter, createWebHashHistory } from 'vue-router'

console.log(`Version: ${VERSION}, ${TIMESTAMP}, commit: ${COMMIT}`)

// @ts-ignore
const app = createApp(App)

const routes = [
  createRoute({
    requireContext: require.context('../components', true, /.vdemo.vue$/),
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

if (!process.env.VUE_APP_DEMO_NO_THEME_PLUGIN) {
  app.use(GlobalConfigPlugin, {
    ...getDefaultConfig(),
    theme: DEFAULT_THEME,
  })
} else {
  app.use(GlobalConfigPlugin)
}

app.mount('#app')
