import { computed, PropType } from 'vue'
import { useGlobalConfig } from '../composables'
import { I18NKey, I18NKnownKey } from '../services/i18n'
import { warn } from '../utils/console'
import { StringWithAutocomplete } from '../utils/types/prop-type'

type Stringable = number | string | boolean | undefined

export type TranslationKey = `$t:${I18NKnownKey}`;

// Also allows arbitrary keys
export type TranslationProp = StringWithAutocomplete<TranslationKey>

const isTranslationKey = (value: string): value is TranslationKey => value.startsWith('$t:')

export const useTranslationProp = (defaultValue: TranslationProp) => {
  return { type: String as PropType<TranslationProp>, default: defaultValue }
}

const f: TranslationProp | undefined = '$t:back'

const applyI18nTemplate = (key: string, values?: Record<string, Stringable>) => {
  if (!values) { return key }

  Object.keys(values).forEach((valueKey) => {
    key = key.replace(`{${valueKey}}`, String(values[valueKey]))
  })
  return key
}

export const useTranslation = () => {
  const { globalConfig } = useGlobalConfig()

  const config = computed(() => globalConfig.value.i18n)

  return {
    /** Translate prop. Translate only if key has `$t:` prefix */
    tp<Key extends TranslationProp | undefined> (key: Key, values?: Record<string, Stringable>): string {
      if (!key) { return '' }

      if (isTranslationKey(key)) {
        key = (config.value[key.slice(3)] || key) as NonNullable<Key>
      }

      return (applyI18nTemplate(key, values) || key)
    },
    t<Key extends I18NKey> (key: Key, values?: Record<string, Stringable>) {
      const translated = config.value[key]
      if (!translated) {
        warn(`${key} not found in VuesticUI i18n config`)
        return key
      }
      return (applyI18nTemplate(translated, values) || key)
    },
  }
}
