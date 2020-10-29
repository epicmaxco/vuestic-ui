// @ts-nocheck

// import Vue from 'vue'
// import BookApp from './BookApp.vue'
// import VueClipboard from 'vue-clipboard2'
// import Router from 'vue-router'
// import { VueBookComponents, createRoute } from 'vue-book'
// import { ColorThemePlugin } from '../services/ColorThemePlugin'
// import { getContext } from '../components/context-test/context-provide/context'
// import { ContextPlugin } from '../components/context-test/context-provide/ContextPlugin'
// import { BusPlugin } from 'vue-epic-bus'
// import { registerVuesticObject } from '../components/resize-events'
// import { DropdownPopperPlugin } from '../components/vuestic-components/va-dropdown/dropdown-popover-subplugin.js'
// import { installPlatform } from '../components/vuestic-components/va-popup/install.js'
// import ColorHelpersPlugin from '../components/vuestic-utilities/color-helpers-plugin'
// import ToastInstall from '../components/vuestic-components/va-toast/install'

// eslint-disable-next-line
// installPlatform()

// Vue.use(Router)
// Vue.use(VueBookComponents)
// if (!process.env.VUE_APP_DEMO_NO_THEME_PLUGIN) {
//   Vue.use(ColorThemePlugin)
// }
// Vue.use(DropdownPopperPlugin)
// Vue.use(ContextPlugin, getContext())

// const router = new Router({
//   routes: [
//     createRoute({
//       requireContext: require.context('./../components', true, /.demo.vue$/),
//       path: '/demo',
//     }),
//     {
//       path: '*',
//       redirect: '/demo',
//     },
//   ],
// })

// registerVuesticObject(Vue)

// Vue.use(BusPlugin)
// Vue.use(VueClipboard)
// Vue.use(DropdownPopperPlugin)
// Vue.use(ColorHelpersPlugin)
// Vue.use(ToastInstall)

// new Vue({
//   router,
//   render: h => h(BookApp),
// }).$mount('#app')

import { createApp } from 'vue'
import App from './BookApp.vue'
import { ContextPlugin } from '../components/context-test/context-provide/ContextPlugin'
// import router from './router'
import { ColorThemePlugin } from '../services/ColorThemePlugin'
// @ts-ignore
import { getContext } from '../components/context-test/context-provide/context'
// @ts-ignore
import { VueBookComponents, createRoute } from 'vue-book'
import { createRouter, createWebHashHistory } from 'vue-router'
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

app.use(ColorThemePlugin)
app.use(VueBookComponents)
app.use(ToastInstall)
app.use(router)

app.use(ContextPlugin, getContext())

app.mount('#app')
