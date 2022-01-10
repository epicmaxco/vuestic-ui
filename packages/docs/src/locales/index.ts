export type TranslationStatusPath = { [key in 'full' | 'part']: string }

export const languages = [
  {
    code: 'en',
    name: 'English',
    status: 'full',
    translationPath: 'translation.language.en',
  },
  {
    code: 'ru',
    name: 'Русский',
    status: 'full',
    translationPath: 'translation.language.ru',
  },
  // GENERATOR_ADD - language
]

export const messages = languages.reduce((result, { code, name }) => ({
  ...result,
  [code]: require(`./${code}/${code}.json`),
}), {})

const extractLanguageCode = (languageInISOFormat: string) => languageInISOFormat.slice(0, 2)

const getLanguageCode = () => extractLanguageCode(window.navigator.language)

export const DEFAULT_LANGUAGE = localStorage.language || getLanguageCode() || 'en'
