import { execute } from "../execute/execute"

const extractArgs = (code: string, index: number) => {
  let start = code.indexOf('defineProps(', index)

  if (start === -1) {
    return
  }

  // Object starts after 'defineProps('
  start = start + 'defineProps('.length

  let openParens = 1
  let funcStart = start

  while (openParens > 0 && funcStart < code.length) {
    funcStart++
    if (code[funcStart] === '(') openParens++
    if (code[funcStart] === ')') openParens--
  }

  return code.slice(start, funcStart).trim()
}

const extractGenericArgs = (code: string, index: number) => {
  let start = code.indexOf('defineProps<', index)

  if (start === -1) {
    return
  }

  // Object starts after 'defineProps<'
  start = start + 'defineProps<'.length

  let openParens = 1
  let funcStart = start

  while (openParens > 0 && funcStart < code.length) {
    funcStart++
    if (code[funcStart] === '<') openParens++
    if (code[funcStart] === '>') openParens--
  }

  return code.slice(start, funcStart).trim()
}

const parseObjectKeys = (code: string) => {
  if (code.indexOf('{') === -1) {
    console.error('Unable to find object keys', code)
    throw new Error('Unable to find object keys')
  }

  let start = code.indexOf('{') + 1
  let openBraces = 1
  let keyStart = start

  const keys = []

  while (openBraces > 0 && keyStart < code.length) {
    keyStart++
    if (code[keyStart] === '{') openBraces++
    if (code[keyStart] === '}') openBraces--

    // Ignore is object is nested, for example as PropType<{ name: string }>
    if (openBraces > 1) {
      continue
    }

    if (code[keyStart] === ':') {
      keys.push(code.slice(start, keyStart).trim())
      continue
    }

    if (code[keyStart] === ',') {
      start = keyStart + 1
    }
  }

  return keys
}

export const extractDefineProps = (code: string) => {
  let index = 0

  const args = extractArgs(code, index)

  if (args) {
    return parseObjectKeys(args)
  }

  const genericArgs = extractGenericArgs(code, index)

  if (genericArgs) {
    return parseObjectKeys(genericArgs)
  }

  return []
}

const replaceCharAt = (str: string, index: number, newChar: string) => {
  return str.substring(0, index) + newChar + str.substring(index + 1)
}

export const extractPropDefaults = (code: string) => {
  const definePropsStart = code.indexOf('defineProps')

  const definePropsEnd = definePropsStart + 'defineProps'.length

  if (code[definePropsEnd] === '<') {
    let index = definePropsStart
    let objStart = -1
    let openBraces = 0
    let str = ''

    while (index > 0) {
      if (openBraces === 1 && code[index] === '=') {
        code = replaceCharAt(code, index, ':')
      }

      if (code[index] === '}') {
        if (openBraces === 0) {
          objStart = index + 1
        }

        openBraces++
      }

      if (code[index] === '{') {
        if (openBraces === 1) {
          str = code.slice(index, objStart)
          break
        }

        openBraces--
      }

      index--
    }

    if (!str) {
      return {}
    }

    const newCode = `(${str})`

    return execute(newCode) as Record<string, any>
  }

  if (code[definePropsEnd] === '(') {
    let index = definePropsStart
    let openParens = 0
    let str = ''

    while (index < code.length) {
      if (code[index] === ')') {
        openParens--

        if (openParens === 0) {
          str = code.slice(definePropsEnd, index + 1)
          break
        }
      }

      if (code[index] === '(') {
        openParens++
      }

      index++
    }

    if (!str.trim()) {
      return {}
    }

    const newCode = `(${str})`

    const propsDeclaration = execute(newCode) as Record<string, any>

    const propsDefaults = {} as Record<string, any>

    Object.keys(propsDeclaration).forEach((key) => {
      if (!propsDeclaration[key]?.default) {return }
      propsDefaults[key] = String(propsDeclaration[key]?.default)
    })

    return propsDefaults
  }

  return {}
}
