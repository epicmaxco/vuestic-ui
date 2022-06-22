export default `// ...
import { createVuestic } from 'vuestic-ui'
import { ref } from 'vue'
import 'vuestic-ui/css'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.(ctx))
    ctx.app.use(createVuestic())

    const head = app.config.globalProperties.$head
    const colorConfig = app.config.globalProperties.$vaColorConfig
    head.addHeadObjs(ref({
      htmlAttrs: {
        style: colorConfig.renderCSSVarialbes(),
      },
    }))
  },
)
`
