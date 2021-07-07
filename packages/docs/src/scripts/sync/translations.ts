import { NodePlopAPI } from 'plop'

// eslint-disable-next-line
const fs = require('fs')
// eslint-disable-next-line
const translationSyncPrompt = require('./prompt/translations')

const mergeLocaleData = (source: any, target: any) => {
  const keys = Object.keys(source)

  keys.forEach((key) => {
    if (typeof source[key] === 'object') {
      target[key] = target[key] || {};
      mergeLocaleData(source[key], target[key])
    } else {
      target[key] = target[key] || `[!] ${source[key]}`
    }
  })

  return target;
}

module.exports = (plop: NodePlopAPI) => {
  const localesPath = `${process.cwd()}/src/locales`
  const languagesCodes = fs
    .readdirSync(localesPath, { withFileTypes: true })
    .filter((file: any) => file.isDirectory())
    .map((dir: any) => dir.name)

  plop.setGenerator('translation', translationSyncPrompt);

  plop.setActionType('syncTranslations', () => {
    const sourceLocaleCode = 'en'
    const sourceLocale = require(`${localesPath}/${sourceLocaleCode}/${sourceLocaleCode}.json`)

    languagesCodes.forEach((code: string) => {
      if (code !== sourceLocaleCode) {
        const locale = require(`${localesPath}/${code}/${code}.json`)
        const mergedLocale = mergeLocaleData(sourceLocale, locale)

        fs.writeFileSync(
          `${localesPath}/${code}/${code}.json`,
          JSON.stringify(mergedLocale, null, 2)
        )
      }
    })

    return 'Translations are synchronized'
  })
}
