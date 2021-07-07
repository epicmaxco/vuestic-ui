import { NodePlopAPI, CustomActionFunction } from 'plop'

// eslint-disable-next-line
const fs = require('fs')
// eslint-disable-next-line
const { execSync } = require('child_process')
// eslint-disable-next-line
const { createTranslationSyncPrompt } = require('./prompt/translations')

type Answers = { code: string, withWarn: boolean }

const mergeLocaleData = (source: any, target: any, addWarn: boolean) => {
  const keys = Object.keys(source)

  keys.forEach((key) => {
    if (typeof source[key] === 'object') {
      target[key] = target[key] || {};
      mergeLocaleData(source[key], target[key], addWarn)
    } else {
      target[key] = target[key] || (addWarn ? `[!] ${source[key]}` : source[key])
    }
  })

  return target;
}

module.exports = (plop: NodePlopAPI) => {
  const localesPath = `${process.cwd()}/src/locales`
  const sourceLocaleCode = 'en'
  const languagesCodes = fs
    .readdirSync(localesPath, { withFileTypes: true })
    .filter((file: any) => file.isDirectory() && file.name !== sourceLocaleCode)
    .map((dir: any) => dir.name)

  plop.setGenerator('translation', createTranslationSyncPrompt(languagesCodes));

  plop.setActionType('syncTranslations', ((answers: Answers, config: any) => {
    const sourceLocale = require(`${config.path}/${sourceLocaleCode}/${sourceLocaleCode}.json`)
    const targetLocalCode = answers.code

    const locale = require(`${config.path}/${targetLocalCode}/${targetLocalCode}.json`)
    const mergedLocale = mergeLocaleData(sourceLocale, locale, answers.withWarn)

    fs.writeFileSync(
      `${config.path}/${targetLocalCode}/${targetLocalCode}.json`,
      JSON.stringify(mergedLocale, null, 2)
    )

    return 'Translations are synchronized'
  }) as CustomActionFunction)

  plop.setActionType('gitCheck', () => {
    const result = execSync('git status --porcelain').toString()

    if (result) {
      throw new Error('Working tree is dirty: you might want to commit your changes before running the script')
    }

    return 'Working tree is clean'
  })
}
