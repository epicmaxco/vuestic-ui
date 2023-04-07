import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSharedComposable } from './useSharedComposable'

const DEFAULT_LOCALE_CODE = 'en'

export const useLanguageSwitcher = () => {
  const i18n = useI18n()
  const currentLocaleName = computed(() => i18n.localeProperties.value.name)

  const setHtmlLang = () => {
    if (!document?.documentElement) { return }

    document.documentElement.setAttribute('lang', i18n.locale.value || DEFAULT_LOCALE_CODE)
  }

  onMounted(setHtmlLang)
  watch(i18n.locale, setHtmlLang)

  return {
    ...i18n,
    currentLocaleName,
  }
}

export const useSharedLanguageSwitcher = useSharedComposable <typeof useLanguageSwitcher>(useLanguageSwitcher)
