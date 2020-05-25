/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */
const fs = require('fs')
const { execSync } = require('child_process')
const componentGenerator = require('./component')


const getDirectoryNames = (source) => {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

const readFrom = path => {
  const file = fs.readFileSync(path).toString()
  return JSON.parse(file)
}

module.exports = plop => {
  const camelCase = plop.getHelper('camelCase')

  plop.setGenerator('component', componentGenerator)

  plop.setActionType('addTranslations', (answers, config) => {
    try {
      const directoryNames = getDirectoryNames(config.path)

      directoryNames.forEach((language) => {
        const translationsFilePath = `${config.path}/${language}/${language}.json`

        const apiConfig = {
          props: {},
          events: {},
          methods: {},
          slots: {}
        }

        const apiTranslationKey = `Va${plop.getHelper('properCase')(answers.name)}`
        const translationKey = camelCase(answers.name)

        const translations = readFrom(translationsFilePath)

        const translationsUpdated = {
          ...translations,
          api: {
            ...translations.api,
            [apiTranslationKey]: apiConfig
          },
          menu: {
            ...translations.menu,
            [translationKey]: plop.getHelper('titleCase')(answers.name)
          },
          [translationKey]: {
            title: '-- Here is the title --'
          }
        }

        fs.writeFileSync(translationsFilePath, JSON.stringify(translationsUpdated, null, 2))

      })

      return 'Added translations'
    } catch (e) {
      throw e
    }
  })

  plop.setActionType('addRoutes', (answers, config) => {
    try {
      const navigationSchemePath = `${config.path}/components/sidebar/navigationScheme.json`
      const navigationScheme = readFrom(navigationSchemePath)

      const getRouteItem = name => ({
        name: plop.getHelper('kebabCase')(name),
        displayName: `menu.${camelCase(name)}`
      })

      const updateUiRoutesWith = (scheme, routeItem) => {
        scheme.routes.find(({ name }) => name === 'ui').children.push(routeItem)
      }

      const routeItem = getRouteItem(answers.name)

      updateUiRoutesWith(navigationScheme, routeItem)

      fs.writeFileSync(navigationSchemePath, JSON.stringify(navigationScheme, null, 2))

      return 'Added routes'
    } catch (e) {
      throw e
    }
  })

  plop.setActionType('gitCheck', () => {
    const result = execSync('git status --porcelain').toString()

    if (result) {
      throw new Error('Working tree is dirty: you might want to commit your changes before running the script')
    }

    return 'Working tree is clean'
  })
}
