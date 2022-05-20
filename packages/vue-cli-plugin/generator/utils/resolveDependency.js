const getPackageJSON = require("./getPackageJSON")

// Cache dependencies
const package = getPackageJSON()
const dependencies = { ...package.dependencies, ...package.devDependencies }

/** 
 * Resolves dependency version from user's dependencies or devDependencies.
 * @param {string} dependency - dependency name to resolve
 * */
module.exports = (dependency) => {
  return dependencies[dependency]
}
