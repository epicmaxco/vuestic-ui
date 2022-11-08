const { EOL } = require('os')

const insertVuesticPlugin = (lines, css) => {
  const strings = css.map((path) => {
    return `import '${path}'`
  })

  // Insert import after the vuestic-ui import
  const renderIndex = lines.findIndex(line => line.match(/import \{.*\} from 'vuestic-ui'/))

  if (renderIndex !== -1) {
    lines[renderIndex] += EOL + strings.join(EOL)

    return lines
  }
  throw new Error('Could not find import statement for vuestic-ui')
}

module.exports = insertVuesticPlugin