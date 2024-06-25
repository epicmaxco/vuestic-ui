import { RegExpNode } from "./types"

const or = (...args: RegExp[]) => new RegExp(args.map((r) => r.source).join("|"), 'g')

const SYMBOLS_SPLIT_REGEX = or(
   // (?:\{[^}]*\}) - helper: maybe repeated group {1,2}, {2}, may be
   // (?:[+*?])
   /(\\[dws.](?:\{[^}]*\})?(?:[+*?])?)/, // split by \d, \w \s, \d{2}, \w{1,3}
   /(\\[()\[\]])/, // split each \(, \[ into (, [
   /(\(.*\)$)/, // (test)
   /(\(.*\)\{[^}]*\}$)/, // split by (123){2}, (test), (\w){1, 3}
   /(\(.*\)[+*?])$/, // split by (123){2}, (test), (\w){1, 3}
   /(\[[^\]]*\](?:\{[^}]*\})?(?:[+*?])?)/, // split by [^3]{1}, [a-z], [0-9]{1, 3}
   /\{[^}]*\}/,
  //  /(.(?:[+*?])?)/, // any symbol with modifier
   /(?:)/ // split for each letter
 )
const EXPRESSION_WITH_REPEAT_REGEX = /(.*)\{(\d+)(?:,\s?(\d+))?(?:,())?\}$/
const BLOCK_WITH_REPEAT_REGEX = /.*\{\d+(,\s?\d+)?\}$/

const REGEX_RESERVED = ['^', '$']

/**
 * Checks if the symbol contains correct (.)
 *
 * @example
 * `(.)(.)` must be invalid - two groups
 * `((.)(.))` is valid - single group with nested groups
 */
const isMaskSingleGroup = (symbol: string) => {
  if (!symbol.startsWith('(' ) || !symbol.endsWith(')')) { return false }

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
 * Returns left and right of `|` delimiter symbol
 *
 * @example
 * `(a|b)|c` -> `a|b`, `c`
 * `a|b` -> `a`, `b`
 * `a|b|c` -> `a`, `b|c`
 */
const getMaskLeftAndRight = (symbol: string) => {
  let groupDepth = 0
  for (let i = 0; i < symbol.length; i++) {
    const char = symbol[i]
    if (char === '(') {
      groupDepth += 1
    } else if (char === ')') {
      groupDepth -= 1
    } else if (char === '|' && groupDepth === 0) {
      return [symbol.slice(0, i), symbol.slice(i + 1)]
    }
  }

  return null
}

/**
 * Split by groups. Group might have nested groups and multiplier ()
 *
 * @example
 *
 * `(.)(.){1,2}` -> ['(.)', '(.){1,2}']
 * `((.)|(.)){2}text(.)` -> ['((.)|(.)){2}', 'text', '(.)']
 */
const splitMaskOnGroups = (symbol: string) => {
  let group = 0
  let groups = []
  let currentGroup = ''

  let i = 0

  while (i < symbol.length) {
    if (symbol[i] === '(' && symbol[i - 1] !== '\\') {
      if (group === 0 && currentGroup.length > 0) {
        groups.push(currentGroup)
        currentGroup = ''
      }
      group += 1
    }

    currentGroup += symbol[i]

    if (symbol[i] === ')') {
      group -= 1

      if (symbol[i + 1] === '{') {
        i += 1
        while (symbol[i] !== '}') {
          currentGroup += symbol[i]
          i += 1
        }
        currentGroup += symbol[i]
      }

      if (group === 0 && currentGroup.length > 0) {
        groups.push(currentGroup)
        currentGroup = ''
      }
    }

    i++
  }

  groups.push(currentGroup)

  return groups
    .map((g) => g.replace(/^\?[:!>]/, '')) // Remove group modifiers
}

const getTokens = (regex: string) => {
  const groups = splitMaskOnGroups(forceRemoveGroup(regex))

  return groups
    .map((g) => g.split(SYMBOLS_SPLIT_REGEX))
    .flat(1)
    .filter((v) => v !== undefined && v !== '')
}

const forceRemoveGroup = (symbol: string) => isMaskSingleGroup(symbol) ? symbol.slice(1, -1) : symbol

const GROUP_HAVE_MODIFIER_REGEX = /^\(\?[:!>]/ // (?:, (?!, (?=, (?>

/** Remove extra group: (\d\d) -> \d\d */
const normalizeGroupedRegex = (symbol: string) => {
  if (GROUP_HAVE_MODIFIER_REGEX.test(symbol)) {
    symbol = symbol.replace(GROUP_HAVE_MODIFIER_REGEX, '(')
  }

  // TODO: Maybe remove?
  if (/^\([^)]*\)$/.test(symbol)) {
    return symbol.slice(1, -1)
  }

  if (/^[^(]*\|[^)]*$/.test(symbol)) {
    return `(${symbol})`
  }

  if (isMaskSingleGroup(symbol) && !/^\([^|]*\|.*\)$/.test(symbol)) {
    return symbol.slice(1, -1)
  }

  return symbol
}

const getRegexSource = (regex: string | RegExp) => typeof regex === 'string' ? regex : regex.source

const isValueExpected = (value: string, expected: string | RegExp) => typeof expected === 'string' ? value === expected : expected.test(value)

const createNode = (type: RegExpNode['type'], value: RegExpNode['value'], expected: RegExpNode['expected'], tree: RegExpNode['tree'] = null): RegExpNode => {
  return {
    type,
    value,
    expected,
    tree
  }
}

const parseRepeatedToken = (symbol: string, value: string, nextSymbols: string[]) => {
  let [v, symbolRawRegex, count1, count2] = symbol.match(EXPRESSION_WITH_REPEAT_REGEX)!
  const normalizedSymbol = normalizeGroupedRegex(symbolRawRegex)
  const maxSymbolsInRepeat = Number(count2 || count1)

  let offset = 0
  let suffixTree = [] as RegExpNode[]
  let suffixText = ''
  let suffixOffset = 0

  const tree = []

  for (let tryIndex = 0; tryIndex < maxSymbolsInRepeat; tryIndex++) {
    if (offset >= value.length) {
      break
    }

    const text = parseToBlocks(value.slice(offset), normalizedSymbol)

    tree.push(text)
    offset += text.value.length

    if (!isValueExpected(text.value, text.expected)) {
      break
    }

    const suffix = value.slice(offset)

    if (suffix.length === 0) {
      suffixOffset = offset
      suffixText = ''
      suffixTree = []
      break
    }

    const parsedSuffix = parseToBlocks(suffix, nextSymbols.join(''))

    const parsedSuffixTree = parsedSuffix.type === 'group' ? parsedSuffix.tree! : [parsedSuffix]

    const parsedSuffixText = parsedSuffixTree.reduce((acc, p) => acc + p.value, '')

    if (parsedSuffixText.length > suffixText.length) {
      suffixText = parsedSuffixText
      suffixTree = parsedSuffixTree
      suffixOffset = offset
    }
  }

  const text = value.slice(0, offset)
  const hasSuffix = suffixText.length > text.length

  return {
    node: createNode(
      'repeated',
      hasSuffix ? value.slice(0, suffixOffset) : text,
      new RegExp(symbol),
      tree
    ),
    nextTree: hasSuffix ? suffixTree : null
  }
}

const renderTreeValue = (tree: NonNullable<RegExpNode['tree']>) => {
  if (tree.some((p) => {
    return !isValueExpected(p.value, p.expected) && p.value !== ''
  })) { return ''}

  return tree.reduce((acc, p) => acc + p.value, '')
}

export const parseToBlocks = (value: string, mask: RegExp | string, replace = false): RegExpNode => {
  const source = getRegexSource(mask)

  const or = getMaskLeftAndRight(forceRemoveGroup(normalizeGroupedRegex(source)))

  if (or) {
    const [left, right] = or

    const leftParsed = parseToBlocks(value, left)
    const rightParsed = parseToBlocks(value, right)

    const leftTree = leftParsed.tree ?? [leftParsed]
    const rightTree = rightParsed.tree ?? [rightParsed]

    const leftValue = renderTreeValue(leftTree)
    const rightValue = renderTreeValue(rightTree)

    return createNode(
      'or regex',
      leftValue.length >= rightValue.length ? leftValue : rightValue,
      new RegExp(source),
      leftValue.length >= rightValue.length ? leftTree : rightTree
    )
  }

  const tokens = getTokens(source)

  let offset = 0
  const parsedBlocks: RegExpNode[] = []

  for (let i = 0; i < tokens.length; i++) {
    const symbol = tokens[i]
    const valueWithOffset = value.slice(offset)

    const symbolNormalized = normalizeGroupedRegex(symbol)

    if (REGEX_RESERVED.includes(symbolNormalized)) {
      parsedBlocks.push(createNode('reserved', '', ''))
      continue
    }

    if (symbolNormalized === '.') {
      offset++
      parsedBlocks.push(createNode('any char', valueWithOffset[0] ?? '', /./))
      continue
    }

    if (symbolNormalized.length === 1) {
      if (replace) {
        if (valueWithOffset[0] !== symbolNormalized) {
          parsedBlocks.push(createNode('simple char', symbolNormalized, symbolNormalized))
          continue
        }
      }

      offset++
      parsedBlocks.push(
        createNode(
          'simple char',
          valueWithOffset[0] === symbolNormalized ? valueWithOffset[0] : '',
          symbolNormalized
        )
      )
      continue
    }

    if (symbol.startsWith('(') && symbol.endsWith(')')) {
      const parsed = parseToBlocks(valueWithOffset, symbol)
      offset += parsed.value.length
      parsedBlocks.push(parsed)
      continue
    }

    if (BLOCK_WITH_REPEAT_REGEX.test(symbol)) {
      const { node, nextTree } = parseRepeatedToken(symbol, valueWithOffset, tokens.slice(i + 1))
      offset += node.value.length
      parsedBlocks.push(createNode('repeated', node.value, node.expected, node.tree))
      if (nextTree === null) { continue }
      parsedBlocks.push(...nextTree)
      break
    }

    const symbolRegex = new RegExp('^' + symbolNormalized)
    const match = valueWithOffset.match(symbolRegex)

    if (match) {
      offset += match[0].length

      parsedBlocks.push(createNode('regex', match[0], symbolRegex))
      continue
    }
    parsedBlocks.push(createNode('regex', '', symbolRegex))
  }

  if (parsedBlocks.length === 1) {
    return parsedBlocks[0]
  }

  let ignoreNext = false

  // console.log(normalizeGroupedRegex(source), parsedBlocks)

  return createNode(
    'group',
    parsedBlocks.reduce((acc, p) => {
      if (ignoreNext) { return acc }

      if (p.value === '' && p.expected !== '') {
        ignoreNext = true
      }

      return acc + p.value
    }, ''),
    new RegExp(normalizeGroupedRegex(source)),
    parsedBlocks.filter((p) => !(p.type === 'reserved' || p.canBeIgnored))
  )
}
