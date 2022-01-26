import i18n from '../plugins/i18n'

const $t = i18n.global.t

function translateInterpolation (code: string, $t: (s: string) => string) {
  const replaces = code.match(/{{\s*?(?:\$t)\(.*?\)\s*?}}/g) || []

  return replaces.reduce((acc, source) => {
    const translation = source.replace(/({{\s*|\$t|'|\(|\)|\[\d\])|\s*}}/gi, '')
    return acc.replace(source, $t(translation))
  }, code)
}

function translateOthers (code: string, $t: (s: string) => string) {
  const replaces = code.match(/(?:\$t)\(.*?\)/g) || []

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
export function applyTranslations (code: string) {
  return translateOthers(translateInterpolation(code, $t), $t).replace('$t-ignore', '$t')
}
