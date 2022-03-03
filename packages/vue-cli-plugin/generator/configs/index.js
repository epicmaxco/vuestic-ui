const defaultConfig = require('./default')
const treeShaking = require('./treeshaking')

const mapObject = (obj, cb) => {
  return Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: cb(obj[key]) }), {})
}

const configs = {
  treeShaking
}

/** @type { typeof configs } */
const customConfigs = mapObject(configs, (config) => ({ ...defaultConfig, ...config }))

module.exports = {
  defaultConfig,
  ...customConfigs,
}