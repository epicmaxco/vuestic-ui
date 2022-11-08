const fs = require('fs')
const { EOL } = require('os')

const insertVuesticPlugin = require('./utils/insertPlugin')
const insertCssImports = require('./utils/insertCssImports')
const configs = require('./configs')
const executeIfFunction = require('./utils/executeIfFunction')
const resolveDependency = require('./utils/resolveDependency')

const renderTemplates = (api, config, answers) => {
  // Changing project template. Adds icons to index.html.
  if (resolveDependency('vite')) {
    api.render({
        './index.html': './templates/vite/index.html',
      }
    )
  } else {
    api.render({
      './public/index.html': './templates/vue-cli-webpack/public/index.html'
    })
  }
}

const applyConfig = (api, config, answers) => {
  renderTemplates(api, config, answers)

  if (config.extendPackage) {
    api.extendPackage(executeIfFunction(config.extendPackage, answers)) 
  }
  
  if (config.importStrings) {
    api.injectImports(api.entryFile, executeIfFunction(config.importStrings, answers))
  }

  if (answers.agGrid) {
    api.extendPackage({ dependencies: { '@vuestic/ag-grid-theme': '^1.0.3' }}) 
  }

  if (config.vueUse) {
    api.afterInvoke(() => {
      const contentMain = fs.readFileSync(api.entryFile, { encoding: 'utf-8' })
      const lines = contentMain.split(/\r?\n/g)
  
      const linesWithVuesticPlugin = config.vueUse
        .reduce((l, pluginName) => insertVuesticPlugin(l, pluginName), lines)

      const css = executeIfFunction(config.css, answers)

      // For some reason css imports like `import 'style.css'` do not work with importStrings
      // So we need to insert them manually
      const linesWithCss = insertCssImports(linesWithVuesticPlugin, css)

      fs.writeFileSync(api.resolve(api.entryFile), linesWithCss.join(EOL), { encoding: 'utf-8' })
    })
  }
}

module.exports = (api, answers) => {
  if (answers.treeshaking) {
    applyConfig(api, configs.treeShaking, answers)
  } else {
    applyConfig(api, configs.defaultConfig, answers)
  }
}
