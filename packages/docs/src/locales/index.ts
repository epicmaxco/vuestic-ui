export type TranslationStatusPath = { [key in 'full' | 'part']: string }

export const languages = [
  {
    code: 'en',
    name: 'English',
    status: 'full',
    translationPath: 'translation.language.en',
  },
  // {
  //   code: 'es',
  //   name: 'Español',
  //   status: 'part',
  //   translationPath: 'translation.language.es',
  // },
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

export const DEFAULT_LANGUAGE = 'en'
