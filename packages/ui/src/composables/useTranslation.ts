import { computed } from 'vue'
import { useGlobalConfig } from '../services/global-config/global-config'
import { I18nConfig } from '../services/i18n/defaults'
import { warn } from '../services/utils'

type Stringable = number | string | boolean | undefined

const applyI18nTemplate = (key: string, values?: Record<string, Stringable>) => {
  if (!values) { return key }

  Object.keys(values).forEach((valueKey) => {
    key = key.replace(`{${valueKey}}`, String(values[valueKey]))
  })
  return key
}

export const useTranslation = () => {
  const { globalConfig, mergeGlobalConfig } = useGlobalConfig()

  const config = computed(() => globalConfig.value.i18n)

  return {
    /** Translate prop. Translate only if key has `$t:` prefix */
    tp: <Key extends string | undefined>(key: Key): Key => {
      if (!key) { return undefined as Key }

      if (key.startsWith('$t:')) {
        return (config.value[key.slice(3) as keyof I18nConfig] || key) as Key
      }

      return key
    },
    t (key: string, values?: Record<string, Stringable>) {
      const translated = config.value[key as keyof I18nConfig]
      if (!translated) {
        warn(`${key} not found in VuesticUI i18n config`)
        return key
      }
      return (applyI18nTemplate(translated, values) || key)
    },
  }
}
