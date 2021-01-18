import { createApp } from 'vue'
import App from './BookApp.vue'
import GlobalConfigPlugin, { useGlobalConfig } from '../services/GlobalConfigPlugin'
import { useTheme, DEFAULT_THEME } from '../services/Theme'
import { getDefaultConfig } from '../components/vuestic-components/va-config/config-default'
// import { ColorThemePlugin } from '../services/ColorThemePlugin'
import DropdownPopperSubplugin from '../components/vuestic-components/va-dropdown/dropdown-popover-subplugin'
// import ColorHelpersPlugin from '../components/vuestic-utilities/color-helpers-plugin'
import ToastInstall from '../components/vuestic-components/va-toast/install'

import { VueBookComponents, createRoute } from 'vue-book'
import { createRouter, createWebHashHistory } from 'vue-router'

console.log(`Version: ${VERSION}, ${TIMESTAMP}, commit: ${COMMIT}`)

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
// app.use(ColorThemePlugin)
app.use(VueBookComponents)
app.use(ToastInstall)
app.use(DropdownPopperSubplugin)
app.use(router)

app.use(GlobalConfigPlugin)

if (!process.env.VUE_APP_DEMO_NO_THEME_PLUGIN) {
  app.mixin({
    created () {
      const { setGlobalConfig } = useGlobalConfig()

      setGlobalConfig(getDefaultConfig())

      const { setTheme } = { ...useTheme() }

      setTheme && setTheme(DEFAULT_THEME)
    },
  })
}

app.mount('#app')
