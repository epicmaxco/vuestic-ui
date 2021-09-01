// File for documentation helper functions

export const readTemplate = async (fileName: string): Promise<any> => {
  return await import(
    /* webpackChunkName: "examples" */
    /* webpackMode: "lazy-once" */
    `!raw-loader!../examples/${fileName}.vue`
  )
}

export const readComponent = async (fileName: string): Promise<any> => {
  return await import(
    /* webpackChunkName: "examples" */
    /* webpackMode: "lazy-once" */
    `../examples/${fileName}.vue`
  )
}

/**
 * If we use the following block of code as input string
 * ```
 * const code = `
 *  console.log('Hello World!')
 * `
 * ```
 * then you will have \n at string start and end.
 * This method deletes '\n' from start and end of string if '\n' exists.
 */
const removeFirstLineBreakIfExists = (code: string) => {
  let newCode = code
  if (newCode[0] === '\n') {
    newCode = newCode.slice(1)
  }
  if (newCode[newCode.length - 1] === '\n') {
    newCode = newCode.slice(0, -1)
  }
  return newCode
}

export const applyTranslation = (code: string, $t: any) => {
  const replaces =
    removeFirstLineBreakIfExists(code).match(/(?:\$t)\(.*?\)/g) || []

  return replaces.reduce((acc, replaceSource) => {
    const translation = replaceSource.replace(/(\$t|'|\(|\)|\[\d\])/gi, '')

    return acc.replace(replaceSource, `'${$t(translation)}'`)
  }, code)
}

export const applyTranslationWithoutQuote = (code: string, $t: any) => {
  const replaces =
    removeFirstLineBreakIfExists(code).match(/(?:\$t)\(.*?\)/g) || []

  return replaces.reduce((acc, replaceSource) => {
    const translation = replaceSource.replace(/(\$t|'|\(|\)|\[\d\])/gi, '')

    return acc.replace(replaceSource, `${$t(translation)}`)
  }, code)
}

const parse = (target: string, template: string) => {
  const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
  const regex = new RegExp(string, 'g')
  const parsed = regex.exec(template) || []
  return parsed[1] || ''
}

export const parseComponent = (component: string, $t: any) => {
  const parseAndTranslate = (key: string) =>
    applyTranslation(parse(key, component), $t)

  return {
    template: parseAndTranslate('template'),
    style: parseAndTranslate('style'),
    script: parseAndTranslate('script'),
  }
}
