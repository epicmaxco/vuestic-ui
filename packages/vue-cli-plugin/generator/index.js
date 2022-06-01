const fs = require('fs')
const { EOL } = require('os')

const insertVuesticPlugin = require('./utils/insertPlugin')
const configs = require('./configs')
const executeIfFunction = require('./utils/executeIfFunction')
const resolveDependency = require('./utils/resolveDependency')

const renderTemplates = (api, config, answers) => {
  // Changing project template. Adds icons to index.html.
  if (resolveDependency('vite')) {
    const normalize = answers.treeshakingOptions ? answers.treeshakingOptions.includes('normalize') : true
    const typescript = resolveDependency('typescript')

    // Adds rollup alias to resolve normalize.css
    api.render({
        './index.html': './templates/vite/index.html',
        [`./vite.config.${typescript ? 'ts' : 'js'}`]: './templates/vite/vite.config.ejs'
      }, 
      { normalize }
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
        
      fs.writeFileSync(api.resolve(api.entryFile), linesWithVuesticPlugin.join(EOL), { encoding: 'utf-8' })
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
