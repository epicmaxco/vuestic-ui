const getPackageJSON = require("./getPackageJSON")

/** 
 * Resolves dependency version from dependencies or devDependencies.
 * @param {string} dependency - dependency name to resolve
 * */
module.exports = (dependency) => {
  const package = getPackageJSON()

  console.log(package, package.dependencies, package.devDependencies)

  const dependencies = { ...package.dependencies, ...package.devDependencies }

  return dependencies[dependency]
}
