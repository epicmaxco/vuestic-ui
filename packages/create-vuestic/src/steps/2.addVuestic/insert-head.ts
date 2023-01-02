export const insertHead = (source: string, head: string[]) => {
  const lines = source.split('\n')

  const headIndex = lines.findIndex(line => line.match(/\<\/head\>/))

  const tab = lines[headIndex - 1].match(/^\s+/)?.[0] || ''
  const headString = head.map((l) => tab + l).join('\n')

  if (headIndex !== -1) {
    lines.splice(headIndex - 1, 0, headString)

    return lines.join('\n')
  }

  return source
}
