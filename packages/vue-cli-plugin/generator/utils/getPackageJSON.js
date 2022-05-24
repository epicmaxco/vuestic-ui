const fs = require('fs')
const path = require('path')

/**
 * Returns user's package.json.
 * @notice not vuestic package.json!
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
