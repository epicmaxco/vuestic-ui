import { Node } from './parseHTML'

const isVBind = (key: string) => key.startsWith(':') || key.startsWith('v-bind:')

const getKeyName = (key: string) => {
  if (key.startsWith(':')) {
    return key.slice(1)
  }

  if (key.startsWith('v-bind:')) {
    return key.slice(7)
  }

  return key
}

const parseOpenTag = (source: string) => {
  let tagName = ''
  const rawAttributes: Record<string, string> = {}

  let tagContent = source.slice(1, -1)

  if (!tagContent.includes(' ')) {
    tagName = tagContent
    return { tagName, rawAttributes }
  }

  tagContent += ' '

  let i = 0

  while (tagContent[i] !== ' ') {
    tagName += tagContent[i]
    i++
  }

  i++

  let key = ''
  let value = ''
  let isInQuotes = false

  while (i < tagContent.length) {
    if (tagContent[i] === '"') {
      isInQuotes = !isInQuotes
      i++
      continue
    }

    if (tagContent[i] === ' ' && !isInQuotes) {
      rawAttributes[key] = value ?? 'true'
      key = ''
      value = ''
      i++
      continue
    }

    if (tagContent[i] === '=') {
      i++
      continue
    }

    if (isInQuotes) {
      value += tagContent[i]
    } else {
      key += tagContent[i]
    }

    i++
  }

  return { tagName, rawAttributes }
}

export const printOpenTag = (node: Node, newAttributes: Record<string, string>, propsMeta?: Record<string, { default?: unknown }>) => {
  const { source } = node.loc

  if (!(source.startsWith('<') && source.endsWith('>'))) {
    return source
  }

  const { tagName, rawAttributes } = parseOpenTag(source)

  const newAttributesKeys = Object.keys(newAttributes)

  const attributes = Object.entries(rawAttributes).reduce((acc, [rawKey, value]) => {
    const key = getKeyName(rawKey)

    if (newAttributesKeys.includes(key)) {
      return acc
    }

    acc[rawKey] = value ? value : true

    return acc
  }, {} as Record<string, string | boolean>)

  const attributesString = Object
    .entries({ ...attributes, ...newAttributes })
    .reduce((acc, [key, value]) => {
      if (propsMeta && propsMeta[key] && propsMeta[key].default === value) {
        return acc
      }

      // TODO: Check default value for boolean attributes
      if (value === true) {
        return `${acc} ${key}`
      }

      if (value === false) {
        return `${acc} :${key}="false"`
      }

      return `${acc} ${key}="${value}"`
    }, '')

  if (attributesString.length > 0) {
    return `<${tagName}${attributesString}>`
  }

  return `<${tagName}>`
}