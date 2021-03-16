import iconConfig from './../services/icon-config/presets'
import { createApp } from 'vue'
import App from './BookApp.vue'
import { GlobalConfigPlugin } from '../services/GlobalConfigPlugin'
import DropdownPopperSubplugin from '../components/vuestic-components/va-dropdown/dropdown-popover-subplugin'
// import ColorHelpersPlugin from '../components/vuestic-utilities/color-helpers-plugin'
import ToastInstall from '../components/vuestic-components/va-toast/install'

import { VueBookComponents, createRoute } from 'vue-book'
import { createRouter, createWebHashHistory } from 'vue-router'

import './vue-book-overrides.scss'

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
    ...iconConfig,
    // Provide custom style here, for example:

    // theme: {
    //   primary: '#0000ff',
    //   dark: '#ff0000',
    // },
    // VaIcon: {
    //   iconsConfig: {
    //     icons: {
    //       home: {
    //         code: 'error',
    //       },
    //     },
    //   },
    // },
  })
} else {
  app.use(GlobalConfigPlugin)
}

app.mount('#app')
