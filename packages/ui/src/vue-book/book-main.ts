// @ts-nocheck
import { createApp } from 'vue'
import App from './BookApp.vue'
import { ContextPlugin } from '../components/context-test/context-provide/ContextPlugin'
import { ColorThemePlugin } from '../services/ColorThemePlugin'
import { getContext } from '../components/context-test/context-provide/context'
import { ContextPlugin } from '../components/context-test/context-provide/ContextPlugin'
import { BusPlugin } from 'vue-epic-bus'
import { registerVuesticObject } from '../components/resize-events'
import { DropdownPopperPlugin } from '../components/vuestic-components/va-dropdown/dropdown-popover-subplugin'
import { installPlatform } from '../components/vuestic-components/va-popup/install'
import ColorHelpersPlugin from '../components/vuestic-utilities/color-helpers-plugin'
import ToastInstall from '../components/vuestic-components/va-toast/install'

console.log(`Version: ${VERSION}, ${TIMESTAMP}, commit: ${COMMIT}`)

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

app.use(ColorHelpersPlugin)
app.use(ColorThemePlugin)
app.use(VueBookComponents)
app.use(ToastInstall)
app.use(router)

app.use(ContextPlugin, getContext())

app.mount('#app')
