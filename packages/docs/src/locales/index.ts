import { languages } from '../components/languages'

export const messages = languages.reduce((result, { code, name }) => ({
  ...result,
  [code]: require(`./${code}/${code}.json`),
}), {})

const extractLanguageCode = (languageInISOFormat: string) => languageInISOFormat.slice(0, 2)

const getLanguageCode = () => extractLanguageCode(window.navigator.language)

export const DEFAULT_LANGUAGE = localStorage.language || getLanguageCode() || 'en'
