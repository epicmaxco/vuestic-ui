const fs = require('fs')
const { EOL } = require('os')

const insertVuesticPlugin = require('./utils/insertPlugin')
const configs = require('./configs')
const executeIfFunction = require('./utils/executeIfFunction')

const applyConfig = (api, config, answers) => {
  if (config.extendPackage) {
    api.extendPackage(executeIfFunction(config.extendPackage, answers)) 
  }
  
  if (config.templatePath) { api.render(config.templatePath) }

  if (config.importStrings) {
    api.injectImports(api.entryFile, executeIfFunction(config.importStrings, answers))
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
