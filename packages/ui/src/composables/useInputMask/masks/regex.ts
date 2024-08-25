import { CursorPosition } from '../cursor'
import { type Mask } from '../mask'
import { Token, parseTokens } from './parser'

export type RegexToken = {
  /**
   * Char means it is single char and we can compare input value using simple `===`
   * Regex means we need to use regex to compare input value (e.g. `\d`, `[a-z]`)
   */
  type: 'char' | 'regex',
  /**
   * Expected character or regex source
   */
  expect: string,
  /**
   * Static means users forced to input this char, meaning masked input can suggest this char
   */
  static: boolean,

  /**
   * Dynamic means this char is not forced and can be skipped
   */
  dynamic: boolean
}

type PossibleResult = RegexToken[]

export const normalizeTokens = (tokens: Token[], dynamic = false) => {
  let possibleResults: PossibleResult[] = [[]]

  for (const token of tokens) {
    if (token.type === 'group') {
      const newResults: PossibleResult[] = []
      possibleResults.forEach((result) => {
        normalizeTokens(token.tree, dynamic).forEach((result2) => {
          newResults.push([...result, ...result2])
        })
      })
      possibleResults = newResults
    }

    if (token.type === 'char' || token.type === 'regex') {
      const newResults: PossibleResult[] = []
      possibleResults.forEach((result) => {
        newResults.push([...result, {
          type: token.type,
          expect: token.expect,
          static: token.type === 'char', // && (!dynamic || result.length > 0),
          dynamic: dynamic,
        }])
      })
      possibleResults = newResults
    }

    if (token.type === 'repeated') {
      const possibleResults2: PossibleResult[] = []
      for (let i = token.min; i <= token.max && i <= 100; i++) {
        const isDynamic = i !== token.min

        normalizeTokens(token.tree, isDynamic || dynamic).forEach((result) => {
          const repeated = (new Array(i).fill(result)).flat() as RegexToken[]
          possibleResults2.push(repeated)
        })
      }

      const newResults: PossibleResult[] = []
      possibleResults.forEach((result) => {
        possibleResults2.forEach((result2) => {
          newResults.push([...result, ...result2])
        })
      })
      possibleResults = newResults
    }

    if (token.type === 'or regex') {
      const newPossibleResults: PossibleResult[] = []

      possibleResults.forEach((existingResult) => {
        normalizeTokens(token.left, true).forEach((result) => {
          newPossibleResults.push([...existingResult, ...result])
        })

        normalizeTokens(token.right, true).forEach((result) => {
          newPossibleResults.push([...existingResult, ...result])
        })
      })

      possibleResults = newPossibleResults
    }
  }

  return possibleResults
    .reduce((acc, result) => {
      if (acc.find((r) => r.length === result.length && r.every((t, i) => t.expect === result[i].expect))) {
        return acc
      }

      return [...acc, result]
    }, [] as PossibleResult[])
}

export const compareWithMask = (mask: PossibleResult, value: string) => {
  if (!value) { return true }

  for (let i = 0; i < mask.length; i++) {
    if (value[i] === undefined) {
      return true
    }
    if (mask[i].type === 'char' && mask[i].expect !== value?.[i]) {
      return false
    }

    if (mask[i].type === 'regex' && !new RegExp(mask[i].expect).test(value[i])) {
      return false
    }
  }

  return value.length <= mask.length
}

const compareWithToken = (token: Token, value: string) => {
  if (token.type === 'char' && token.expect !== value) {
    return false
  }

  if (token.type === 'regex' && !new RegExp(token.expect).test(value)) {
    return false
  }

  return true
}

const formatByRegexTokens = (possibleResults: PossibleResult[], value: string, reverse = false) => {
  if (reverse) {
    possibleResults = possibleResults.map((result) => result.slice().reverse())
    value = value.split('').reverse().join('')
  }

  // TODO: Maybe optimize this?
  let suggestedCharsCount = 0
  let text = ''
  let valueOffset = 0
  let tokensOffset = 0

  const maxPossibleMask = possibleResults.reduce((acc, mask) => Math.max(acc, mask.length), 0)
  const foundTokens: (RegexToken)[] = []

  while (valueOffset < value.length || tokensOffset < maxPossibleMask) {
    // Filter out possible results that not match with current text
    possibleResults = possibleResults
      .filter((tokens) => {
        return compareWithMask(tokens, text)
      })

    const possibleToken = possibleResults
      .map((mask) => mask[tokensOffset])
      .filter((token) => token !== undefined)

    if (possibleToken.length === 0) {
      break
    }

    const possibleSuggestions = possibleToken.filter((token) => token.type === 'char')

    const staticCharts = possibleToken.filter((token) => token.static)

    const isOnePossibleStaticChar = staticCharts.reduce((acc, char) => {
      if (acc === null) {
        return char
      }

      if (acc.expect !== char.expect) {
        return null
      }

      return acc
    }, null as RegexToken | null)

    if (possibleSuggestions.length > 0) {
      const suggestedChar = possibleSuggestions[0]?.expect ?? ''
      let canBeSuggested = possibleSuggestions.every((token) => token.expect === suggestedChar) && value[valueOffset]?.length > 0

      const onlyStaticLeft = possibleResults.length === 1 && possibleResults[0].slice(tokensOffset).every((token) => token.static)

      if (possibleSuggestions[0].dynamic) {
        canBeSuggested = canBeSuggested && value[valueOffset]?.length > 0
      }

      if (isOnePossibleStaticChar && value[valueOffset]?.length > 0) {
        canBeSuggested = value[valueOffset] !== isOnePossibleStaticChar.expect
      }

      if (possibleToken.some((token) => compareWithToken(token, value[valueOffset]))) {
        canBeSuggested = false
      }

      if (onlyStaticLeft) {
        canBeSuggested = true
      }

      if (canBeSuggested) {
        if (suggestedChar !== value[valueOffset]) {
          text += suggestedChar
          foundTokens.push(possibleSuggestions[0])
          tokensOffset += 1
          suggestedCharsCount += 1
          continue
        }
      }
    }

    if (valueOffset >= value.length) {
      break
    }

    const charCorrectTokens = possibleToken.filter((token) => {
      if (token.type === 'char') {
        return token.expect === value[valueOffset]
      }

      if (token.type === 'regex') {
        return new RegExp(token.expect).test(value[valueOffset])
      }

      return false
    })

    if (value[valueOffset] !== undefined) {
      if (charCorrectTokens.length > 0) {
        text += value[valueOffset]
        foundTokens.push(charCorrectTokens[0])
        tokensOffset++
      }
    }

    valueOffset++
  }

  if (reverse) {
    return {
      text: text.split('').reverse().join(''),
      tokens: foundTokens.reverse(),
      data: suggestedCharsCount,
    }
  }

  return {
    text,
    tokens: foundTokens,
    data: suggestedCharsCount,
  }
}

const unformat = (text: string, tokens: RegexToken[]) => {
  const value = text

  if (!value) { return '' }

  return tokens.reduce((acc, token, i) => {
    if (token.static) {
      return acc
    }

    if (compareWithToken(token, value[i]) && value[i] !== undefined) {
      return acc + value[i]
    }

    return acc
  }, '')
}

export const createRegexMask = (regex: RegExp, options = { reverse: false }): Mask<RegexToken> => {
  const tokens = parseTokens(regex.source)
  const possibleResults = normalizeTokens(tokens)

  return {
    format: (text: string) => {
      return formatByRegexTokens(possibleResults, text, options.reverse)
    },
    handleCursor (cursorStart, cursorEnd, oldTokens, newTokens, data, suggestedCount = 0) {
      cursorStart.updateTokens(newTokens, options.reverse)
      cursorEnd.updateTokens(newTokens, options.reverse)

      if (!options.reverse) {
        cursorStart.moveForward(data.length, CursorPosition.AfterChar)
        cursorEnd.position = cursorStart.position
      } else {
        cursorStart.position = cursorEnd.position
      }
    },
    unformat,
  }
}
