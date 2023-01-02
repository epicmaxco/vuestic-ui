export const insertHead = (source: string, head: string[]) => {
  const lines = source.split('\n')
  const headString = head.join('\n')

  const headIndex = lines.findIndex(line => line.match(/<head>/))

  if (headIndex !== -1) {
    lines.splice(headIndex + 1, 0, headString)

    return lines.join('\n')
  }

  return source
}
