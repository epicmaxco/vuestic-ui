export default `// ...
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

export async function render(pageContext) {
  // ...
  app.use(createVuestic())

  const appHtml = await renderToString(app)
  const cssVarialbes = app.config.globalProperties.$vaColorConfig.renderCSSVarialbes()

  return escapeInject\`<!DOCTYPE html>
    <html>
      <head>
        <title>Vuestic App</title>
        <style>\${cssVarialbes}</style>
      </head>
      <body>
        <div id="app">\${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>\`
}`
