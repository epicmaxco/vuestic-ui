import { i18n } from './../main'

export const { locale, te, t, fallbackLocale } = i18n.global

// Helpers
/**
 * Returns url with locale prefix
 * @example
 * '/services/global-config' -> '/en/services/global-config'
 */
export const localUrl = (url: string) => `/${locale}/${url}`

/**
 * Translate if exists or return input string
 * @param translationString - translation key or string
 */
export const translateIfExists = (translationString: string) => te(translationString) ? t(translationString) : translationString
