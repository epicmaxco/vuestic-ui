import { useI18n as originalUseI18n } from 'vue-i18n'
import { computed, getCurrentInstance } from 'vue'
import { TranslationString } from '~~/types/translations'

/** Modified useI18n. Sync locale with cookie. Has tie method. */
export const useI18n = () => {
  const i18n = originalUseI18n()
  const { setCookie } = useSSRCookie()

  const { te, t, fallbackLocale } = i18n
  const { currentRoute, push: redirect } = useRouter()

  /** Translate if exists */
  const tie = (translationString: TranslationString, locale: string = i18n.locale.value): string => {
    if (!translationString) {
      return translationString
    }

    if (te(translationString, locale)) {
      return t(translationString, locale)
    }

    if (te(translationString, fallbackLocale.value as string)) {
      return t(translationString, fallbackLocale.value as string)
    }

    return translationString
  }

  const route = useRoute()

  const urlPrefix = computed(() => route.params.locale ? `/${route.params.locale}` : '')

  const localizePath = (path: string) => {
    return (`${urlPrefix.value}/${path}`).replace('//', '/')
  }

  return {
    ...i18n,
    tie,
    localizePath,
    locale: computed({
      get() {
        return i18n.locale.value
      },
      set(locale: string) {
        i18n.locale.value = locale
      
        setCookie('locale', i18n.locale.value)

        if (currentRoute.value.params.locale) {
          // ['', '{locale}', 'path', 'goes', 'here']
          const path = currentRoute.value.path.split('/')
          path[1] = locale
          redirect(path.join('/'))
        }
      }
    })
  }
}

declare module 'vue-i18n' {
  /** 
   * Please, use modified useI18n composable.
   * Do not import useI18n from 'vue-i18n'.
   * @deprecated
   */
   export function useI18n<Options extends UseI18nOptions = UseI18nOptions>(options?: Options): Composer<NonNullable<Options['messages']>, NonNullable<Options['datetimeFormats']>, NonNullable<Options['numberFormats']>, NonNullable<Options['locale']>>;
}