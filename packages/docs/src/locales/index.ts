import en from './en/en.json'
import ru from './ru/ru.json'
export type TranslationStatusPath = { [key in 'full' | 'part']: string }

export const languages = [
  {
    code: 'en',
    name: 'English',
    status: 'full',
    en,
    translationPath: 'translation.language.en',
  },
  {
    code: 'ru',
    name: 'Русский',
    status: 'full',
    ru,
    translationPath: 'translation.language.ru',
  },
  // GENERATOR_ADD - language
]

export const messages = {
  en, ru,
}

const extractLanguageCode = (languageInISOFormat: string) => languageInISOFormat.slice(0, 2)

const getLanguageCode = () => extractLanguageCode('en-EN')
//

export const DEFAULT_LANGUAGE = getLanguageCode() || 'en'
