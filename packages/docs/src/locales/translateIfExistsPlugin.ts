import { App } from 'vue'
import { te, t, fallbackLocale } from './i18n'

export type TranslateIfExists = (translationString: string, locale?: string) => string

export const translateIfExists: TranslateIfExists = (translationString: string, locale?: string): string => (
  te(translationString, locale)
    ? t(translationString, locale as string)
    : te(translationString, fallbackLocale as string)
      ? t(translationString, fallbackLocale as string)
      : translationString
)

export const useTranslateIfExists = (app: App<Element>): void => {
  app.config.globalProperties.$tie = translateIfExists
}
