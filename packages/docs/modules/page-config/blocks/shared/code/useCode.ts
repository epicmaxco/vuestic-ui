export const useCode = () => {
  const { t: $t } = useI18n()

  function translateInterpolation (code: string, $t: (s: string) => string) {
    const replaces:  string[] = code.match(/{{\s*?(?:\$t)\(.*?\)\s*?}}/g) || []

    return replaces.reduce((acc, source) => {
      const translation = source.replace(/({{\s*|\$t|'|\(|\)|\[\d\])|\s*}}/gi, '')
      return acc.replace(source, $t(translation))
    }, code)
  }

  function translateOthers (code: string, $t: (s: string) => string) {
    const replaces: string[] = code.match(/(?:\$t)\(.*?\)/g) || []

    return replaces.reduce((acc, source) => {
      const translation = source.replace(/(\$t|'|\(|\)|\[\d\])/gi, '')
      return acc.replace(source, `'${$t(translation)}'`)
    }, code)
  }

  /**
   * Find `$t` inside a code and replace it with translation by regex.
   * origin: `... $t('to replace') ...`
   * output: `... translated ...`
   */
  function applyTranslations (code: string) {
    return translateOthers(translateInterpolation(code, $t), $t).replace('$t-ignore', '$t')
  }

  return {
    applyTranslations
  }
}
