import { useGlobalConfig } from '../services/global-config'
import { computed } from 'vue'
import type { I18nConfig } from '../services/i18n'

// Composable for users, not for inner development
// Name it as useI18nConfig to avoid confusion with useI18n from `vue-i18n`

/**
 * @see https://vuestic.dev/en/services/i18n
 *
 * Composable, that allows user to redefine text values used in Vuestic components.
 *
 * @example
 *
 * Use `mergeIntoConfig` if your i18n locale changed to change text values inside Vuestic components.
 *
 * ```js
 * import { useI18nConfig } from 'vuestic-ui'
 * import { useI18n } from 'vue-i18n'
 *
 * const { locale, messages } = useI18n()
 * const { mergeIntoConfig } = useI18nConfig()
 *
 * watch(locale, (newLocale) => {
 *  mergeIntoConfig(messages[newLocale])
 * })
 * ```
 */
export const useI18nConfig = () => {
  const { globalConfig, mergeGlobalConfig } = useGlobalConfig()

  const config = computed(() => globalConfig.value.i18n)

  const mergeIntoConfig = (newConfig: Partial<I18nConfig>) => {
    mergeGlobalConfig({
      i18n: {
        ...config.value,
        ...newConfig,
      },
    })
  }

  return {
    config,
    mergeIntoConfig,
  }
}
