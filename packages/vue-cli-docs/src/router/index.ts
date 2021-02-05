import { createWebHistory } from 'vue-router'
import { createRouterLayout } from 'vue-router-layout'
import { createLangRouter } from 'vue-lang-router'
import routes from 'vue-auto-routing'
import translations from '../locales'

const langRouterOptions = {
  defaultLanguage: 'en',
  translations,
  localizedURLs: {},
}

const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '.vue')
})

const routerOptions = {
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      name: 'router-layout',
      path: '/',
      component: RouterLayout,
      children: routes,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
}

const router = createLangRouter(langRouterOptions, routerOptions)

export default router
