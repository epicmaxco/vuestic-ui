const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const wordsRegex = /[A-Z0-9]*(?:[^\-_|A-Z|\s.])*/gm

export const getWords = (str: string) => {
  return str.match(wordsRegex)?.map((word) => word.trim().split(/([0-9]+)|([a-zA-Z]+)/g)).flat().filter(Boolean) || []
}

export const camelCaseToKebabCase = (str: string) => {
  return getWords(str)
    .map((word) => word.toLowerCase())
    .join('-')
}

export const kebabCaseToCamelCase = (str: string) => {
  return getWords(str)
    .map((word, index) => index === 0 ? word.toLowerCase() : capitalize(word))
    .join('')
}

export const startCase = (str: string) => {
  return getWords(str)
    .map(capitalize)
    .join(' ')
}
