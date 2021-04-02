import { NodePlopAPI, CustomActionFunction, AddActionConfig } from 'plop'

/**
 * generator/documentation.js
 *
 * Exports the generators so plop knows them
 */
// eslint-disable-next-line
const fs = require('fs')
// eslint-disable-next-line
const { execSync } = require('child_process')
// eslint-disable-next-line
const docspageGenerator = require('./docspage')

type GeneratorAnswers = { name: string, category: string, }

const getDirectoryNames = (source: string) => {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent: any) => dirent.isDirectory())
    .map((dirent: any) => dirent.name)
}

const readFrom = (path: string) => {
  const file = fs.readFileSync(path).toString()
  return JSON.parse(file)
}

module.exports = (plop: NodePlopAPI) => {
  plop.setGenerator('docspage', docspageGenerator)

  plop.setActionType('addTranslations', (answers: any, config: any) => {
    const directoryNames = getDirectoryNames(config.path)

    directoryNames.forEach((language: string) => {
      const translationsFilePath = `${config.path}/${language}/${language}.json`

      const translationKey = plop.getHelper('camelCase')(answers.name)

      const translations = readFrom(translationsFilePath)

      const translationsUpdated = {
        ...translations,
        menu: {
          ...translations.menu,
          [translationKey]: plop.getHelper('titleCase')(answers.name),
        },
        [translationKey]: {
          title: '-- Here is the title --',
        },
      }

      fs.writeFileSync(translationsFilePath, JSON.stringify(translationsUpdated, null, 2))
    })

    return 'Added translations'
  })

  plop.setActionType('addRoutes', ((answers: GeneratorAnswers, config: AddActionConfig) => {
    const navigationSchemePath = `${config.path}/components/sidebar/navigationRoutes.ts`
    const navigationScheme = fs.readFileSync(navigationSchemePath).toString()

    const routeName = plop.getHelper('kebabCase')(answers.name)
    const navItemTranslationString = `menu.${plop.getHelper('camelCase')(answers.name)}`

    if (navigationScheme.includes(routeName)) {
      throw new Error(`Route ${routeName} already exists.`)
    }

    const replaceString = `// GENERATOR_ADD - ${answers.category}`

    const routeItemString = `{
        name: '${routeName}',
        displayName: '${navItemTranslationString}',
      },
      ${replaceString}`

    const replacedNavigationScheme = navigationScheme.replace(replaceString, routeItemString)

    fs.writeFileSync(navigationSchemePath, replacedNavigationScheme)

    return 'Added routes'
  }) as CustomActionFunction)

  plop.setActionType('gitCheck', () => {
    const result = execSync('git status --porcelain').toString()

    if (result) {
      throw new Error('Working tree is dirty: you might want to commit your changes before running the script')
    }

    return 'Working tree is clean'
  })
}
