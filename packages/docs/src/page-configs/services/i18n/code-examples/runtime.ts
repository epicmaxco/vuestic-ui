export const runtimeCodeExample = `
import { useI18nConfig } from 'vuestic-ui'

const locale = ref('en')

const messages = {
  en: {
    search: 'Search',
  },
  ua: {
    search: 'Пошук',
  }
}

watch(locale, (newLocale) => {
  mergeIntoConfig(messages[newLocale])
})
`

export const runtimeVueI18nCodeExample = `
import { useI18nConfig } from 'vuestic-ui'
import { useI18n } from 'vue-i18n'

const { locale, messages } = useI18n()
const { mergeIntoConfig } = useI18nConfig()

watch(locale, (newLocale) => {
  mergeIntoConfig(messages[newLocale]['vuestic'])
})
`

export const vueI18nExampleConfig = `
{
  en: {
    language: 'English',
    vuestic: {
      search: 'Search'
      // ...
    }
  },
  ua: {
    language: 'Українська',
    vuestic: {
      search: 'Пошук',
      // ...
    }
  }
}
`
