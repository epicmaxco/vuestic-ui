export class Node {
  constructor(
    public type: 'tag:open' | 'tag:close' | 'content', 
    public loc: { start: { offset: number }, end: { offset: number }, source: string } = { start: { offset: 0 }, end: { offset: 0 }, source: '' },
    public children: (Node | string)[] = [],
  ) {}

  toString() {
    return this.loc.source
  }
}

export const parseSource = (source: string) => {
  const parse = (source: string): Node[] => {
    const nodes: Node[] = []
    let current = 0

    while (current < source.length) {
      const startTag = source.indexOf('<', current)

      if (startTag === -1) { break }

      const endTag = source.indexOf('>', startTag)

      if (endTag === -1) { break }

      const tag = source.slice(startTag, endTag + 1)
      const isSelfClosing = tag.endsWith('/>')

      if (isSelfClosing) {
        nodes.push(new Node('content', { start: { offset: startTag }, end: { offset: endTag + 1 }, source: tag }))
      } else {
        const startTag = source.indexOf('<', current)
        const endTag = source.indexOf('>', startTag)
        const tag = source.slice(startTag, endTag + 1)

        nodes.push(new Node(
          'content', 
          { start: { offset: startTag }, end: { offset: endTag + 1}, source: tag }
        ))
      }

      current = endTag + 1
    }

    if (nodes.length > 1) {
      const startTag = nodes[0]
      const endTag = nodes[nodes.length - 1]
      startTag.type = 'tag:open'
      endTag.type = 'tag:close'
      const text = new Node(
        'content', 
        { 
          start: { offset: startTag.loc.end.offset }, 
          end: { offset: endTag.loc.start.offset }, 
          source: source.slice(startTag.loc.end.offset, endTag.loc.start.offset),
        },
        parse(source.slice(startTag.loc.end.offset, endTag.loc.start.offset)),
      )

      return [startTag, text, endTag]
    }

    return nodes
  }

  return parse(source)
}