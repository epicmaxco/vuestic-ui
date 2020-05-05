import { join } from 'path'

const LOCALE_DIRECTORY = join(__dirname, './../locales')

/**
 * Read all files from directory
 * @param source - source directory
 * @return {string[]} - source file
 */
const getDirectoryNames = (source) => {
  // eslint-disable-next-line
  const { readdirSync } = require('fs')

  return readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

/**
 * Load locales from locale folder.
 * @param locales
 * @return {{}}
 */
const getI18nMessagesConfig = (locales) => {
  const result = {}
  locales.forEach(locale => {
    result[locale] = require(`${LOCALE_DIRECTORY}/${locale}/${locale}.json`)
  })
  return result
}

const locales = getDirectoryNames(LOCALE_DIRECTORY)

export default [
  'nuxt-i18n',
  {
    locales,
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    vueI18n: {
      fallbackLocale: 'en',
      messages: getI18nMessagesConfig(locales),
    },
  },
]
