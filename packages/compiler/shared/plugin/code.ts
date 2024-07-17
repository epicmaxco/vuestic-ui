import { parse, type VariableDeclaration, type ObjectExpression, type Property } from 'acorn'

export const getContentInParenthesis = (content: string) => {
  let text = ''

  let bracketCount = 0

  for (let i = 0; i < content.length; i++) {
    if (content[i] === '(') {
      bracketCount++
      continue
    }

    if (content[i] === ')') {
      bracketCount--
    }

    if (bracketCount === 0) {
      break
    }

    text += content[i]
  }

  return text
}

const isObject = (t: any): t is ObjectExpression => {
  return t.type === 'ObjectExpression'
}

const isProperty = (t: any): t is Property => {
  return t.type === 'Property'
}

const OBJECT_DECLARATION = 'const obj = '

export const replaceOrAddConfigPropertyValue = (content: string, newValue: string) => {
  const code = OBJECT_DECLARATION + content

  try {
    const program = parse(code, { ecmaVersion: 2020 })

    const object = (program.body[0] as VariableDeclaration).declarations[0].init

    let configProperty = null

    if (isObject(object)) {
      const properties = object.properties

      for (const property of properties) {
        if (isProperty(property)) {
          const name = 'name' in property.key
            ? property.key.name
            : 'value' in property.key ? property.key.value
              : null

          if (name === 'config') {
            configProperty = property
            break
          }
        }
      }

      if (!configProperty) {
        return `{
          config: ${newValue},
          ${
          properties.map((p) => {
            return p.loc?.source
          }).join(', ')
          }
        }`
      }

      return (code.slice(0, configProperty.start) + `config: ` + newValue + code.slice(configProperty.end)).slice(OBJECT_DECLARATION.length)
    }

    return content
  }
  catch (e) {
    console.error('Unable to parse code:', code)
    console.error(e)
    return content
  }
}
