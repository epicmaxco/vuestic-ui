function extend (app, mixin) {
  if (!app.mixins) {
    app.mixins = []
  }
  app.mixins.push(mixin)
}

export default async function ({ app }) {
  extend(app, {
    beforeMount () {
      const { locales } = this.$root.$i18n
      const isExistingLocale = locales.some(locale => this.$route.fullPath.match(new RegExp(`^/${locale}(/|$)`)))
      const storedLanguage = localStorage.getItem('currentLanguage')
      const supportedLanguage = locales.find(locale => navigator.languages.includes(locale))
      const targetLanguage = storedLanguage || supportedLanguage || 'gb'
      if (!isExistingLocale) {
        this.$router.push(`/${(targetLanguage === 'gb' ? 'en' : targetLanguage) + this.$route.fullPath}`)
      }
    },
  })
}
