import { CursorPosition } from "../cursor"
import { type Mask } from "../mask"
import { Token, parseTokens } from "./parser"

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
}

type PossibleResult = RegexToken[]

export const normalizeTokens = (tokens: Token[], dynamic = false) => {
  let possibleResults: PossibleResult[] = [[]]

  for (const token of tokens) {
    if (token.type === 'group') {
      let newResults: PossibleResult[] = []
      possibleResults.forEach((result) => {
        normalizeTokens(token.tree, dynamic).forEach((result2) => {
          newResults.push([...result, ...result2])
        })
      })
      possibleResults = newResults
    }

    if (token.type === 'char' || token.type === 'regex') {
      let newResults: PossibleResult[] = []
      possibleResults.forEach((result) => {
        newResults.push([...result, {
          type: token.type,
          expect: token.expect,
          static: token.type === 'char' && (!dynamic || result.length > 0),
        }])
      })
      possibleResults = newResults
    }

    if (token.type === 'repeated') {
      const possibleResults2: PossibleResult[] = []
      for (let i = token.min; i <= token.max && i <= 100; i++) {
        let isDynamic = i !== token.min

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

  let valueOffset = -1
  let tokensOffset = 0
  let maxPossibleMask = possibleResults.reduce((acc, mask) => Math.max(acc, mask.length), 0)
  let suggestedCharsCount = 0

  let text = ''
  const foundTokens: (RegexToken)[] = []

  while (valueOffset < value.length || tokensOffset < maxPossibleMask) {
    const tokens = possibleResults
      .filter((tokens) => {
        return compareWithMask(tokens, text)
      })
      .map((mask) => mask[tokensOffset])
      .filter((token) => token !== undefined)

    if (tokens.length === 0) {
      break
    }

    const possibleSuggestions = tokens.filter((token) => token.type === 'char' && (token.static)) //  || token.requiredBefore.length > 0

    if (possibleSuggestions.length > 0) {
      let suggestedChar = possibleSuggestions[0]?.expect ?? ''
      let canBeSuggested = possibleSuggestions.every((token) => token.expect === suggestedChar) && value[valueOffset]?.length > 0

      if (tokens.some((token) => compareWithToken(token, value[valueOffset]))) {
        canBeSuggested = false
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
      valueOffset++
      break
    }

    const possibleTokens = tokens.filter((token) =>  {
        if (token.type === 'char') {
          return token.expect === value[valueOffset]
        }

        if (token.type === 'regex') {
          return new RegExp(token.expect).test(value[valueOffset])
        }

        return false
      })

    if (value[valueOffset] !== undefined) {
      if (possibleTokens.length > 0) {
        text += value[valueOffset]
        foundTokens.push(possibleTokens[0])
        tokensOffset++
      }
    }

    valueOffset++
  }

  if (reverse) {
    return {
      text: text.split('').reverse().join(''),
      tokens: foundTokens.reverse(),
    }
  }

  return {
    text,
    tokens: foundTokens
  }
}

const cleanLastSuggestedChars = ({ text, tokens }: {
  text: string, tokens: RegexToken[]
}) => {
  let newText = text
  let newTokens = tokens

  while (newTokens.length > 0 && newTokens[newTokens.length - 1].type === 'char' && newTokens[newTokens.length - 1].static) {
    newText = newText.slice(0, -1)
    newTokens = newTokens.slice(0, -1)
  }

  return {
    text: newText,
    tokens: newTokens
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

export const createMaskFromRegex = (regex: RegExp, options = { reverse: false }): Mask<RegexToken> => {
  const tokens = parseTokens(regex.source)
  const possibleResults = normalizeTokens(tokens)

  return {
    format: (text: string) => {
      return formatByRegexTokens(possibleResults, text, options.reverse)
    },
    handleCursor(cursorStart, cursorEnd, oldTokens, newTokens, data) {
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
    reverse: options.reverse
  }
}
