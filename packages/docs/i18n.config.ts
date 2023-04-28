export default defineI18nConfig(nuxt => ({
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  warnHtmlInMessage: 'off',
  escapeParameterHtml: true,
}))