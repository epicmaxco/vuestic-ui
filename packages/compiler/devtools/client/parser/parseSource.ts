const getTagContent = (source: string) => {
  if (source.endsWith('/>')) {
    return source.slice(1, -2)
  }

  return source.slice(1, -1)
}

const parseOpenTag = (source: string) => {
  source = source.trim().replace(/\n/g, '')
  let tagName = ''
  const attributes: Record<string, string | null> = {}

  let tagContent = getTagContent(source)

  if (!tagContent.includes(' ')) {
    tagName = tagContent
    return { tagName, attributes }
  }

  tagContent += ' '

  let i = 0

  while (tagContent[i] !== ' ') {
    tagName += tagContent[i]
    i++
  }

  i++

  let key = ''
  // Might not have value
  let value: string | null = null
  let isInQuotes = false

  while (i < tagContent.length) {
    if (tagContent[i] === '"') {
      isInQuotes = !isInQuotes
      i++
      continue
    }

    if (tagContent[i] === ' ' && !isInQuotes) {
      // Key might be empty if there are multiple spaces or \n
      if (key !== '') {
        attributes[key] = value
      }
      key = ''
      value = null
      i++
      continue
    }

    if (tagContent[i] === '=') {
      i++
      // If have equal sign, means it must have value in qoutes later
      // May be case where user haven't finished typing like `to=` - we show empty string
      value = ''
      continue
    }

    if (isInQuotes) {
      value += tagContent[i]
    } else {
      key += tagContent[i]
    }

    i++
  }

  return { tagName, attributes }
}

export type Loc = {
  start: { offset: number }
  end: { offset: number }
  source: string
}

export type HTMLContentNode = {
  type: 'content'
  text: string
  parent: HTMLElementNode | HTMLRootNode
}

export type HTMLElementNode = {
  type: 'element'
  tag: string
  /** null if no attribute value */
  attributes: Record<string, string | null>
  parent: HTMLElementNode | HTMLRootNode
  children: (HTMLElementNode | HTMLContentNode)[]
  sourcePath?: string
}

export type HTMLRootNode = {
  type: 'root'
  children: (HTMLElementNode | HTMLContentNode)[]
}

export type HTMLToken = {
  type: 'tag:open' | 'tag:close' | 'tag:self-closing',
  tag: string
  loc: Loc
} | {
  type: 'content',
  loc: Loc,
}

/** Removes \n and whitespace */
const superTrim = (content: string) => {
  return content.replace(/\n/gm, '').trim()
}

const isValidContent = (content: string) => {
  return superTrim(content) !== ''
}

const parseTokens = (source: string) => {
  let current = 0

  const tokens: HTMLToken[] = []

  while (current < source.length) {
    const startTag = source.indexOf('<', current)

    if (startTag === -1) { break }

    const endTag = source.indexOf('>', startTag)

    if (endTag === -1) { break }

    const tagContent = source.slice(startTag, endTag + 1)

    const isSelfClosing = tagContent.endsWith('/>')
    const isClosingTag = tagContent.startsWith('</')

    const content = source.slice(current, startTag)

    if (isValidContent(content)) {
      tokens.push({
        type: 'content',
        loc: {
          start: { offset: current },
          end: { offset: startTag },
          source: source.slice(current, startTag),
        },
      })
    }

    if (isSelfClosing) {
      tokens.push({
        type: 'tag:self-closing',
        loc: {
          start: { offset: startTag },
          end: { offset: endTag + 1 },
          source: tagContent,
        },
        tag: tagContent.slice(1, -2),
      })
    } else if (isClosingTag) {
      tokens.push({
        type: 'tag:close',
        loc: {
          start: { offset: startTag },
          end: { offset: endTag + 1 },
          source: tagContent,
        },
        tag: tagContent.slice(2, -1),
      })
    } else {
      tokens.push({
        type: 'tag:open',
        loc: {
          start: { offset: startTag },
          end: { offset: endTag + 1 },
          source: tagContent,
        },
        tag: superTrim(tagContent.slice(1, -1).split(' ')[0]),
      })
    }

    current = endTag + 1
  }

  return tokens
}

const tokensToTree = (tokens: HTMLToken[]) => {
  const root: HTMLRootNode = {
    type: 'root',
    children: [],
  }

  let parent: HTMLRootNode | HTMLElementNode = root

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    if (token.type === 'tag:open') {
      if (!parent.children || typeof parent.children === 'string') {
        throw new Error('Unexpected error when parsing HTML')
      }

      const { attributes } = parseOpenTag(token.loc.source)

      const node: HTMLElementNode = {
        type: 'element',
        tag: token.tag,
        children: [],
        attributes,
        parent,
      }

      parent.children.push(node)

      parent = node
    }

    if (token.type === 'tag:close') {
      if (!('parent' in parent)) {
        throw new Error('Closing tag without parent node')
      }

      parent = parent.parent
    }

    if (token.type === 'content') {
      if (!parent.children || typeof parent.children === 'string') {
        throw new Error('Unexpected error when parsing HTML')
      }

      parent.children.push({
        type: 'content',
        text: token.loc.source,
        parent
      })
    }

    if (token.type === 'tag:self-closing') {
      if (!parent.children || typeof parent.children === 'string') {
        throw new Error('Unexpected error when parsing HTML')
      }

      const { attributes, tagName } = parseOpenTag(token.loc.source)

      parent.children.push({
        type: 'element',
        tag: tagName,
        children: [],
        attributes,
        parent,
      })
    }
  }

  return root
}

export const parseSource = (source: string) => {
  const tokens = parseTokens(source)
  const tree = tokensToTree(tokens)

  return tree
}
