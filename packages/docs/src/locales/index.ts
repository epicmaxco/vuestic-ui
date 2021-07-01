import { languages } from '../components/languages'

export const messages = languages.reduce((result, { code, name }) => ({
  ...result,
  [code]: require(`./${code}/${code}.json`),
}), {})

export const DEFAULT_LANGUAGE = localStorage.language || window.navigator.language || 'en'
