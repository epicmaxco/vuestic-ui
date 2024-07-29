/* eslint-disable no-use-before-define */
interface TokenBase {
  type: string
  expect: string
}

interface TokenChar extends TokenBase {
  type: 'char'
}

interface TokenRegex extends TokenBase {
  type: 'regex'
}

interface TokenRepeated extends TokenBase {
  type: 'repeated',
  tree: Token[]
  min: number,
  max: number,
  content: string
}

interface TokenGroup extends TokenBase {
  type: 'group',
  tree: Token[]
}

interface TokenOrRegex extends TokenBase {
  type: 'or regex',
  left: Token[],
  right: Token[]
}

export type Token = TokenChar | TokenRegex | TokenRepeated | TokenGroup | TokenOrRegex

const or = (...args: RegExp[]) => new RegExp(args.map((r) => r.source).join('|'), 'g')

const TOKEN_SPLIT_REGEX = or(
  /(\{[^}]*\})/, // Token required to have limits {1, 3}, {1,}, {1}
  /(\\[dws.])/,
  /(^\([^)]*\)$)/, // group like (test)
  /(\[[^\]]*\])/, // split by [^3]{1}, [a-z], [0-9]{1, 3}
  /(?:)/, // split for each letter
)

/**
 * Checks if the symbol contains correct (.)
 *
 * @example
 * `(.)(.)` must be invalid - two groups
 * `((.)(.))` is valid - single group with nested groups
 */
const isMaskSingleGroup = (symbol: string) => {
  if (!symbol.startsWith('(') || !symbol.endsWith(')')) { return false }

  let groupDepth = 0
  for (let i = 0; i < symbol.length; i++) {
    const char = symbol[i]
    if (char === '(') {
      groupDepth += 1
    } else if (char === ')') {
      groupDepth -= 1

      if (groupDepth === 0 && i !== symbol.length - 1) {
        return false
      }
    }
  }

  return groupDepth === 0
}

/**
 * Parse raw tokens (strings). Split tokens into groups: char, (), {}, [], etc.
 *
 * @example
 *
 * `(.)(.){1,2}` -> ['(.)', '(.){1,2}']
 * `((.)|(.)){2}text(.)` -> ['((.)|(.)){2}', 'text', '(.)']
 */
const parseRawTokens = (symbol: string) => {
  let group = 0
  const groups = []
  let currentChunk = ''

  let i = 0

  while (i < symbol.length) {
    if (symbol[i] === '(' && symbol[i - 1] !== '\\') {
      if (group === 0 && currentChunk.length > 0) {
        groups.push(...currentChunk.split(TOKEN_SPLIT_REGEX).filter((v) => v !== '' && v !== undefined))
        currentChunk = ''
      }
      group += 1
    }

    currentChunk += symbol[i]

    if (symbol[i] === ')' && symbol[i - 1] !== '\\') {
      group -= 1

      if (group === 0 && currentChunk.length > 0) {
        groups.push(currentChunk)
        currentChunk = ''
      }
    }

    i++
  }

  if (currentChunk.length > 0) {
    groups.push(...currentChunk.split(TOKEN_SPLIT_REGEX).filter((v) => v !== '' && v !== undefined))
  }

  return groups
    .map((g) => g.replace(/^\?[:!>]/, '')) // Remove group modifiers
    .filter((v) => v !== '' && v !== undefined)
}

// TODO: Maybe add more symbols to support
const RESERVED_SLASH_SYMBOLS = ['d', 'D', 'w', 'W', 's', 'S', '.']

const MAX_REPEATED = 10

/** Build ast of tokens */
export const parseTokens = (mask: string, directlyInGroup = false): Token[] => {
  let tokens: Token[] = []

  // Handle or in group, if single group - treat as directly in group
  if (isMaskSingleGroup(mask)) {
    mask = mask.slice(1, -1) // Remove brackets
    directlyInGroup = true
  }

  const rawTokens = parseRawTokens(mask)

  for (let i = 0; i < rawTokens.length; i++) {
    const rawToken = rawTokens[i]

    if (rawToken === '\\') {
      // Ignore \, it is used in pair with next token
      continue
    }

    if (!RESERVED_SLASH_SYMBOLS.includes(rawToken) && rawTokens[i - 1] === '\\') {
      tokens.push({ type: 'char', expect: rawToken })
      continue
    }

    if (rawToken === '|') {
      if (directlyInGroup) {
        tokens = [{
          type: 'or regex',
          expect: mask,
          left: [...tokens],
          right: parseTokens(`(${rawTokens.slice(i + 1).join('')})`),
        }]

        break
      }

      const prevToken = tokens.pop()!
      const nextToken = parseTokens(rawTokens[i + 1])

      tokens.push({
        type: 'or regex',
        expect: `${prevToken}|${rawTokens[i + 1]}`,
        left: [prevToken],
        right: nextToken,
      })

      continue
    }

    if (rawToken.startsWith('{') && rawToken.endsWith('}') && rawToken.length > 2) {
      const [v, min, delimiter, max] = rawToken.split(/\{(\d+)(,\s?)?(\d+)?\}$/)

      const prevToken = tokens.pop()!

      tokens.push({
        type: 'repeated',
        expect: prevToken.expect + rawToken,
        tree: [prevToken],
        min: parseInt(min),
        max: max ? parseInt(max) : delimiter ? MAX_REPEATED : parseInt(min),
        content: rawToken,
      })
      continue
    }

    if (rawToken.endsWith('*')) {
      const prevToken = tokens.pop()!
      tokens.push({ type: 'repeated', expect: prevToken.expect + rawToken, tree: [prevToken], min: 0, max: MAX_REPEATED, content: prevToken.expect })
      continue
    }

    if (rawToken.endsWith('+')) {
      const prevToken = tokens.pop()!
      tokens.push({ type: 'repeated', expect: prevToken.expect + rawToken, tree: [prevToken], min: 1, max: MAX_REPEATED, content: prevToken.expect })
      continue
    }

    if (rawToken.endsWith('?')) {
      const prevToken = tokens.pop()!
      tokens.push({ type: 'repeated', expect: prevToken.expect + rawToken, tree: [prevToken], min: 0, max: 1, content: prevToken.expect })
      continue
    }

    if (['$', '^'].includes(rawToken)) {
      // Ignore start and end of the string - they're not important for masking
      continue
    }

    if (rawToken.startsWith('(') && rawToken.endsWith(')')) {
      const tree = parseTokens(rawToken.slice(1, -1), true)
      tokens.push({ type: 'group', expect: rawToken, tree })
      continue
    }

    if (rawToken.length === 1 && rawToken !== '.') {
      tokens.push({ type: 'char', expect: rawToken })
      continue
    }

    tokens.push({ type: 'regex', expect: rawToken })
  }

  return tokens
}
