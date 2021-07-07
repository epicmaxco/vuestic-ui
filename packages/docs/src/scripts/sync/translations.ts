import { NodePlopAPI, CustomActionFunction } from 'plop'

// eslint-disable-next-line
const fs = require('fs')
// eslint-disable-next-line
const { createTranslationSyncPrompt } = require('./prompt/translations')

type Answers = { code: string }

const mergeLocaleData = (source: any, target: any) => {
  const keys = Object.keys(source)

  keys.forEach((key) => {
    if (typeof source[key] === 'object') {
      target[key] = target[key] || {};
      mergeLocaleData(source[key], target[key])
    } else {
      target[key] = target[key] || source[key]
    }
  })

  return target;
}

module.exports = (plop: NodePlopAPI) => {
  const languagesCodes = fs
    .readdirSync(`${process.cwd()}/src/locales`, { withFileTypes: true })
    .filter((file: any) => file.isDirectory())
    .map((dir: any) => dir.name)

  plop.setGenerator('translation', createTranslationSyncPrompt(languagesCodes));

  plop.setActionType('syncTranslations', ((answers: Answers, config: any) => {
    const sourceLocale = require(`${config.path}/${answers.code}/${answers.code}.json`)

    languagesCodes.forEach((code: string) => {
      if (code !== answers.code) {
        const locale = require(`${config.path}/${code}/${code}.json`)
        const mergedLocale = mergeLocaleData(sourceLocale, locale)

        fs.writeFileSync(
          `${config.path}/${code}/${code}.json`,
          JSON.stringify(mergedLocale, null, 2)
        )
      }
    })

    return 'Translations are synchronized'
  }) as CustomActionFunction)
}
