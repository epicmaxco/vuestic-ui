import { Mask, MaskToken } from '../mask'
import { createMaskFromRegex, RegexToken } from './regex'

const DELIMITER = ' '
const DECIMAL = '.'

type NumeralToken = RegexToken & { isDecimal?: boolean}

export const createNumeralMask = (): Mask<NumeralToken> => {
  const intMask = createMaskFromRegex(/(\d{3} )*(\d{3})/, { reverse: true })
  const decimalMask = createMaskFromRegex(/(\d{3} )*(\d{3})/, { reverse: false })

  return {
    format: (text: string) => {
      const hasDecimal = text.includes(DECIMAL)

      if (!hasDecimal) {
        return intMask.format(text)
      }

      const [int = '', decimal = '', ...rest] = text.split(DECIMAL)

      const intResult = intMask.format(int)
      const decimalResult = decimalMask.format(decimal + rest.join(''))

      return {
        text: intResult.text + DECIMAL + decimalResult.text,
        tokens: [...intResult.tokens, { type: 'char', static: false, expect: DECIMAL, isDecimal: true }, ...decimalResult.tokens] as NumeralToken[],
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
      return parseFloat(text.replace(/ /g, '')).toString()
    },
    reverse: false,
  }
}
