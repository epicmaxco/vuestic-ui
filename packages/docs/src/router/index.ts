import { createWebHistory } from 'vue-router'
import { createLangRouter } from 'vue-lang-router'
import routes from 'vue-auto-routing'
import translations from '../locales'

const langRouterOptions = {
  defaultLanguage: 'en',
  translations,
}

const routerOptions = {
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      name: 'router-layout',
      path: '/',
      component: () => import(/* webpackChunkName: "router-layout" */ './RouterLayout.vue'),
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
