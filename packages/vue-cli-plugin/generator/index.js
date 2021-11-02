const insertVuesticPlugin = (lines) => {
  /* Vue app stored in variable
  const app = createApp(App)
  ...
  app.mount('#app')
  */
  const renderIndex = lines.findIndex(line => line.match(/app\.mount/))

  if (renderIndex !== -1) {
    lines[renderIndex - 1] += `\n\napp.use(VuesticPlugin);`

    return lines
  } else {
    /* Vue app chained
    createApp(App).mount('#app')
    */
    return lines.map((line) => {
      if (line.match(/\.mount/) != null) {
        return line.replace('.mount', '.use(VuesticPlugin).mount')
      }

      return line
    })
  }
}

module.exports = (api, options) => {
  const fs = require('fs')
  const { EOL } = require('os')

  api.extendPackage({
    dependencies: {
      'vuestic-ui': '^1.3.1',
    },
  })

  // Render fonts to index.html
  api.render('./template')

  // Add imports to main file
  const importStrings = [
  "import { VuesticPlugin } from 'vuestic-ui'",
  "import 'vuestic-ui/dist/vuestic-ui.css'",
  ]
  api.injectImports(api.entryFile, importStrings)

  api.afterInvoke(() => {
    const contentMain = fs.readFileSync(api.entryFile, { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g)

    const linesWithVuesticPlugin = insertVuesticPlugin(lines)

    fs.writeFileSync(api.resolve(api.entryFile), linesWithVuesticPlugin.join(EOL), { encoding: 'utf-8' })
  })
}
