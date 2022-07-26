export default `// ...
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'

export async function render(pageContext) {
  // ...
  app.use(createVuestic())

  const appHtml = await renderToString(app)
  const cssVariables = app.config.globalProperties.$vaColorConfig.renderCSSVariables()

  return escapeInject\`<!DOCTYPE html>
    <html>
      <head>
        <title>Vuestic App</title>
        <style>\${cssVariables}</style>
      </head>
      <body>
        <div id="app">\${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>\`
}`
