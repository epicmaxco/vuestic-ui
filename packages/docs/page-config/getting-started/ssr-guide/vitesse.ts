// Notice that import.meta.env can not be used in raw imported module, so we need to convert it to string before

export default `
import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import { createVuestic } from 'vuestic-ui'
import { ref } from 'vue'
import 'vuestic-ui/css'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
    .forEach(i => i.install?.(ctx))
    ctx.app.use(createVuestic())

    const head = app.config.globalProperties.$head
    const colorConfig = app.config.globalProperties.$vaColorConfig
    head.addHeadObjs(ref({
      htmlAttrs: {
        style: colorConfig.renderCSSVariables(),
      },
    }))
  },
)
`;
