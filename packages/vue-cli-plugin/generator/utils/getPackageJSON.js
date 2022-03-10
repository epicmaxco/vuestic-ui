const fs = require('fs')
const path = require('path')

/**
 * @throw Can not find package.json.
 */
module.exports = () => {
  const packageJsonPath = path.resolve('./package.json')

  if (!packageJsonPath) {
    throw new Error('Can not find package.json.')
  }

  const json = JSON.parse(fs.readFileSync(packageJsonPath))

  return json
}
