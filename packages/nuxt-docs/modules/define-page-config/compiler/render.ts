export const renderBlock = (type: string, props: Record<string, string>) => {
  const propsString = Object
    .entries(props)
    .filter(([key, value]) => Boolean(value))
    .map(([key, value]) => `${key}: ${value}`)

  return `{
    type: '${type}',
    ${propsString.join(',\n')}
}`
}