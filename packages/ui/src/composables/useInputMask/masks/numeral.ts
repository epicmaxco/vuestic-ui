import { StringWithAutocomplete } from '../../../utils/types/prop-type'
import { Mask, MaskToken } from '../mask'
import { createRegexMask, RegexToken } from './regex'

type NumeralToken = RegexToken & { isDecimal?: boolean}

export const createNumeralMask = (options: {
  decimal?: boolean,
  decimalChar?: StringWithAutocomplete<'.' | ','>,
} = {}): Mask<NumeralToken> => {
  const intMask = createRegexMask(/(\d{3} )*(\d{3})/, { reverse: true })

  const { decimal = true, decimalChar = '.' } = options

  const decimalRegex = new RegExp(`[.|,|${decimalChar}]`, 'g')

  if (!decimal) {
    return intMask
  }

  const decimalMask = createRegexMask(/(\d{3} )*(\d{3})/, { reverse: false })

  return {
    format: (text: string) => {
      const foundDecimal = text.match(decimalRegex)

      if (!foundDecimal) {
        return intMask.format(text)
      }

      const [int = '', decimal = '', ...rest] = text.split(foundDecimal[0])

      const intResult = intMask.format(int)
      const decimalResult = decimalMask.format(decimal + rest.join(''))

      return {
        text: intResult.text + decimalChar + decimalResult.text,
        tokens: [...intResult.tokens, { type: 'char', static: false, expect: decimalChar, isDecimal: true }, ...decimalResult.tokens] as NumeralToken[],
      }
    },
    handleCursor (selectionStart, selectionEnd, oldTokens, newTokens, data) {
      const decimalIndex = newTokens.findIndex((token) => token.isDecimal)

      if (decimalIndex === -1) {
        return intMask.handleCursor(selectionStart, selectionEnd, oldTokens, newTokens, data)
      }

      if (selectionStart.position < decimalIndex) {
        intMask.handleCursor(selectionStart, selectionEnd, oldTokens, newTokens, data)
      } else {
        decimalMask.handleCursor(selectionStart, selectionEnd, oldTokens, newTokens, data)
      }
    },
    unformat: (text: string, tokens: MaskToken[]) => {
      const [int = 0, decimal = 0] = text.replace(/ /g, '').split(decimalChar)

      return parseFloat(int + '.' + decimal).toString()
    },
  }
}
