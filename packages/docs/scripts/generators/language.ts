import { NodePlopAPI, CustomActionFunction, AddActionConfig } from 'plop'

/**
 * generator/language.js
 *
 * Exports the generators so plop knows them
 */
// eslint-disable-next-line
const fs = require('fs')
// eslint-disable-next-line
const { execSync } = require('child_process')
// eslint-disable-next-line
const translationGenerator = require('./translation')

type GeneratorAnswers = { name: string, code: string, }

module.exports = (plop: NodePlopAPI) => {
  plop.setGenerator('translation', translationGenerator)

  plop.setActionType('addTranslations', (answers: GeneratorAnswers, config: AddActionConfig) => {
    fs.mkdirSync(`${config.path}/${answers.code}/`)
    fs.writeFileSync(`${config.path}/${answers.code}/${answers.code}.json`, fs.readFileSync(`${config.path}/en/en.json`))
    return 'Added translations'
  })

  plop.setActionType('addLanguage', ((answers: GeneratorAnswers, config: AddActionConfig) => {
    const languagesPath = `${config.path}/components/languages.ts`
    const languages = fs.readFileSync(languagesPath).toString()

    const isoCode = plop.getHelper('lowerCase')(answers.code)
    const languageName = plop.getHelper('titleCase')(answers.name)

    if (languages.includes(`code: ${isoCode},`)) {
      throw new Error(`${languageName} language already exists.`)
    }

    const replaceString = '// GENERATOR_ADD - language'

    const langString = `{
    code: '${isoCode}',
    name: '${languageName}',
  },
  ${replaceString}`

    const replacedlanguages = languages.replace(replaceString, langString)

    fs.writeFileSync(languagesPath, replacedlanguages)

    return 'Added languages'
  }) as CustomActionFunction)

  plop.setActionType('gitCheck', () => {
    const result = execSync('git status --porcelain').toString()

    if (result) {
      throw new Error('Working tree is dirty: you might want to commit your changes before running the script')
    }

    return 'Working tree is clean'
  })
}
