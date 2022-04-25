import { createI18n, VueI18n } from 'vue-i18n'
import { messages, locales } from '~/locales'
import { useRouter, useRoute } from '#app'

type Locale = keyof typeof messages

const isLocaleExist = (locale: string): locale is Locale => {
  return locales.includes(locale)
}

const parseLocaleFromPath = (url: string | undefined) => {
  if (!url) { return null }

  const [path, locale] = url.match(/\/(\w*)\//) || []

  if (isLocaleExist(locale)) { return locale }

  return null
}

/** This plugin register i18n and sync it's locale with cookies */
export default defineNuxtPlugin(({ vueApp: app, ssrContext, provide }) => {
  const { getCookie, setCookie } = useSSRCookie()

  const getLocaleFromUrl = () => {
    if (ssrContext) { // Server
      return parseLocaleFromPath(ssrContext.url)
    } else {          // Client
      return useRoute().query.locale as string
    }
  }

  const locale = getLocaleFromUrl() || getCookie('locale') || 'en'

  // Todo: This can be optimized with vite-plugin
  const i18n = createI18n({
    locale,
    fallbackLocale: 'en',
    messages,
    legacy: false,
    missing (_, key) {
      return key
    },
  })

  app.use(i18n)

  if (ssrContext) { return }

  const { beforeEach, replace } = useRouter()

  beforeEach((newRoute) => {
    const newLocale = newRoute.params.locale as string

    const locale = i18n.global.locale

    if (newLocale === undefined || newLocale === locale.value) { return }
    if (isLocaleExist(newLocale)) {
      locale.value = newLocale
      setCookie('locale', newLocale)
    } else {
      const newPath = newRoute.fullPath.replace(`/${newLocale}/`, '/en/')

      replace(newPath)
    }
  })

  provide('t', i18n.global.t)
  provide('te', i18n.global.te)
})


declare module '#app' {
  interface NuxtApp {
    $i18n: VueI18n
  }
}
