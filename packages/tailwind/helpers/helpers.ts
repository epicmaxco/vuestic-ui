import fs from 'fs'
import { resolve } from 'pathe'

export const defaultTailwindConfigFilename = 'tailwind.config.cjs'
export const tailwindConfigFilename = fs.readdirSync('.').find((fileName: string) => fileName.startsWith('tailwind.config.'))
export const tailwindConfigPath = tailwindConfigFilename ? resolve(process.cwd(), tailwindConfigFilename) : undefined

/**
 * @param value any value for converting it to raw string
 * @param nestingLevel current nesting level (is needed for correct indents)
 * @returns raw string value
 */
export const convertValueToString = (value: any, nestingLevel = 1): string => {
  const result: string[] = []

  if (typeof value === 'object' && !Array.isArray(value)) {
    result.push('{\n')

    for (const prop in value) {
      // if prop contains both numbers and literals and/or dashes we wrap it with quotes
      const correctProp = /(?=.*\d)(?=.*[a-z])|(?=.*-)/i.test(prop) ? `'${prop}'` : prop

      result.push('\t'.repeat(nestingLevel) + correctProp, ': ', convertValueToString(value[prop], nestingLevel + 1), ',\n')
    }

    result.push('\t'.repeat(nestingLevel - 1) + '}')
  } else if (typeof value === 'object' && Array.isArray(value)) {
    result.push('[\n')

    for (const prop in value) {
      result.push(convertValueToString(value[prop], nestingLevel + 1), ',\n')
    }

    result.push(']')
  } else if (typeof value === 'number') {
    result.push(String(value))
  } else {
    result.push(`'${value}'`)
  }

  return result.join('')
}
