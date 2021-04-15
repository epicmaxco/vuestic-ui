module.exports = (api, options) => {
  const fs = require('fs')
  const { EOL } = require('os')

  api.extendPackage({
    dependencies: {
      'vuestic-ui': require('../../ui/package').version,
    },
  })
  const importString = `
  import { VuesticPlugin } from \'vuestic-ui\';
  import \'vuestic-ui/dist/vuestic-ui.css\'
  `
  api.injectImports(api.entryFile, importString)
  api.afterInvoke(() => {

    const contentMain = fs.readFileSync(api.entryFile, { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g)
    const renderIndex = lines.findIndex(line => line.match(/app\.mount/))
    lines[renderIndex - 1] += `\n\napp.use(VuesticPlugin);`
    fs.writeFileSync(api.resolve(api.entryFile), lines.join(EOL), { encoding: 'utf-8' })
  })
}
