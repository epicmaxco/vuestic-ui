import { te, t, fallbackLocale } from './i18n'

export const translateIfExists = (translationString: string) => (
  te(translationString)
    ? t(translationString)
    : te(translationString, fallbackLocale as string)
      ? t(translationString, fallbackLocale as string)
      : translationString
)

export const useTranslateIfExists = (app: any) => {
  app.config.globalProperties.$tie = translateIfExists
}
