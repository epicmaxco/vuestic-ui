const { readdir, writeFile } = require('fs')
const glob = require('glob')
const path = require('path')
const componentsDir = path.join(__dirname, '../../src/components')
const outputDir = path.join(__dirname, '../fixtures/components.json')

readdir(componentsDir, { withFileTypes: true }, (err: any, files: any) => {
  if (err) { throw err }
  const components: string[] = []
  files
    .filter((file: any) => file.isDirectory())
    .forEach((directory: any) => {
      const files = glob('*.demo.vue', { cwd: path.join(componentsDir, directory.name), sync: true })
      components.push(...files)
    })

  writeFile(outputDir, JSON.stringify({ components }), (err: any) => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })
})
