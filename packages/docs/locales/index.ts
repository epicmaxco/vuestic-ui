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
