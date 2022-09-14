import { createApp } from 'vue'
import App from './BookApp.vue'

import { VueBookComponents, createRoute } from 'vue-book'
import { createRouter, createWebHashHistory } from 'vue-router'

import demoIconAliases from './vuestic-config/demo-icon-aliases'
import demoIconFonts from './vuestic-config/demo-icon-fonts'

import './vue-book-overrides.scss'
import {
  createIconsConfig,
  createVuesticEssential,
  VaToastPlugin,
  VaModalPlugin,
  VaDropdownPlugin,
  BreakpointsConfigPlugin,
} from '../main'
import { colorsPresets } from '../services/color-config/color-theme-presets'

const app = createApp(App)

const routes = [
  createRoute({
    requireContext: require.context('../components', true, /.demo.vue$/),
    path: '/demo',
  }),
  createRoute({
    requireContext: require.context('../styles/grid', false, /.demo.vue$/),
    path: '/grid-demo',
  }),
  createRoute({
    requireContext: require.context('../styles/resources', false, /.demo.vue$/),
    path: '/resources-demo',
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

app.use(createVuesticEssential({
  config: {
    icons: createIconsConfig({
      aliases: demoIconAliases,
      fonts: demoIconFonts,
    }),
    colors: {
      ...colorsPresets.default,
      banana: '#d0f55d',
    },
  },
  plugins: { VaToastPlugin, VaDropdownPlugin, VaModalPlugin, BreakpointsConfigPlugin },
}))

app.mount('#app')
