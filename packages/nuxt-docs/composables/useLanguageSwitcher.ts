import { computed, onMounted, watch, ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { languages } from '../locales'
import { useSharedComposable } from './useSharedComposable'

export const useLanguageSwitcher = () => {
  const router = useRouter()
  const { locale, t } = useI18n()

  const getCurrentPathWithoutLocale = () => {
    const path = router.currentRoute.value.fullPath
    const localeUrlPart = `/${locale.value}`
    const localeUrlPartLength = localeUrlPart.length

    if (path.slice(0, localeUrlPartLength) === localeUrlPart) {
      return path.slice(localeUrlPartLength)
    }

    return path
  }

  const setLanguage = (newLocale: string, replace = false) => {
    if (locale.value === newLocale) { return }

    localStorage.setItem('language', newLocale)

    const currentPathWithoutLocale = getCurrentPathWithoutLocale()
    const path = '/' + newLocale + currentPathWithoutLocale

    if (replace) {
      router.replace(path)
    } else {
      router.push(path)
    }
  }

  const currentLanguageName = computed(() => languages.find(({ code }) => code === locale.value)?.name)

  const setHtmlLang = () => {
    if (!document?.documentElement) { return }

    document.documentElement.setAttribute('lang', locale.value || 'en')
  }

  onMounted(setHtmlLang)
  watch(locale, setHtmlLang)

  return {
    languages,
    currentLanguageName,
    setLanguage,
    getCurrentPathWithoutLocale,
  }
}

export const useSharedLanguageSwitcher = useSharedComposable <typeof useLanguageSwitcher>(useLanguageSwitcher)
