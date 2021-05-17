import { I18n, VueI18n } from 'vue-i18n'
import { i18n as i18nInstance } from 'vue-lang-router'

export const instance: I18n = i18nInstance
export const i18n: VueI18n = instance.global

// Aliases
export const t = i18n.t
export const te = i18n.te
export const locale = i18n.locale

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
