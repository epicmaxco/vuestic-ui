import { createSharedComposable } from '@/composables/createSharedComposable'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { languages } from '@/locales'
import { computed, onMounted, watch } from 'vue'

function useChangeLanguage () {
  const { locale } = useI18n()
  const router = useRouter()

  const getCurrentPathWithoutLocale = () => {
    const path = router.currentRoute.value.fullPath
    const localeUrlPart = `/${locale.value}`

    if (path.slice(0, localeUrlPart.length) === localeUrlPart) { return path.slice(localeUrlPart.length) }

    return path
  }

  const setLanguage = (newLocale: string) => {
    if (locale.value === newLocale) { return }

    localStorage.setItem('language', newLocale)

    const currentPathWithoutLocale = getCurrentPathWithoutLocale()

    router.push('/' + newLocale + currentPathWithoutLocale)
  }

  const currentLanguageName = computed(() => languages.find(({ code }) => code === locale.value)?.name)

  const setHtmlLang = () => {
    if (!document?.documentElement) { return }

    document.documentElement.setAttribute('lang', locale.value || 'en')
  }

  onMounted(setHtmlLang)
  watch(locale, setHtmlLang)

  return {
    currentLanguageName,
    setLanguage,
    languages,
  }
}

export const useSharedChangeLanguage = createSharedComposable<typeof useChangeLanguage>(useChangeLanguage)
