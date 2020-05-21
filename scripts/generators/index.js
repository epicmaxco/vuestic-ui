/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */
const fs = require('fs')
const { execSync } = require('child_process')
const componentGenerator = require('./component/index.js')


const getDirectoryNames = (source) => {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

module.exports = plop => {
  plop.setGenerator('component', componentGenerator)

  plop.setActionType('addTranslations', (answers, config) => {
    try {
      const directoryNames = getDirectoryNames(config.path)

      directoryNames.forEach((language) => {
        const filePath = `${config.path}/${language}/${language}.json`
        const file = fs.readFileSync(filePath).toString()

        const apiConfig = {
          props: {},
          events: {},
          methods: {},
          slots: {}
        }

        const apiTranslationKey = `Va${plop.getHelper('properCase')(answers.name)}`
        const translationKey = plop.getHelper('camelCase')(answers.name)

        const parsedFile = JSON.parse(file)

        const result = {
          ...parsedFile,
          api: {
            ...parsedFile.api,
            [apiTranslationKey]: apiConfig
          },
          [translationKey]: {}
        }

        fs.writeFileSync(filePath, JSON.stringify(result, null, 2))
      })
    } catch (e) {
      throw e
    }
  })

  plop.setActionType('gitCheck', () => {
    const result = execSync('git status --porcelain').toString()

    if (result) {
      throw new Error('Working tree is dirty: please commit your changes before running the script')
    }

    return 'Working tree is clean'
  })

  plop.setActionType('gitAdd', (answers, config) => {
    try {
      execSync(`git add "${config.uiPath}"`)
      execSync(`git add "${config.docsPath}"`)
      return 'Added new files to git'
    } catch (e) {
      throw e
    }
  })
}
