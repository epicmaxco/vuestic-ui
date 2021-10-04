import { createWebHistory, createRouter, RouterView } from 'vue-router'
import routes from 'vue-auto-routing'
import { i18n } from '../locales/i18n'
import { DEFAULT_LANGUAGE } from '../locales'

/**
 * We can not use aliases because then we lose the opportunity to update the route path.
 * If "/en" is the alias of "/" then switching from "/" to "/en" will be the same route.
 *
 * https://github.com/vuejs/vue-router-next/issues/613
 */

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      name: 'router-layout',
      path: '/',
      component: () => import(/* webpackChunkName: "router-layout" */ './RouterLayout.vue'),
      children: routes,
    },
    {
      path: '/:locale/',
      component: () => import(/* webpackChunkName: "router-layout" */ './RouterLayout.vue'),

      // Remove name from routes to avoid named routes duplicates.
      children: routes.map((r) => ({ ...r, name: undefined })),
    },
  ],
})

// Update i18n locale if needed.
router.beforeEach((to) => {
  const newLocale = to.params.locale as string || DEFAULT_LANGUAGE
  const currentLocale = i18n.global.locale

  if (newLocale === currentLocale) { return }

  i18n.global.locale = newLocale
})
