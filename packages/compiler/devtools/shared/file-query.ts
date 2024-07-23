export const stringifyFileQuery = (path: string, start: number, end: number) => `${path}:${start}:${end}`

export const parseFileQuery = (query: string) => {
  const params = query.split(':')

  const end = params.pop()
  const start = params.pop()
  const path = params.join(':')

  return { path, start: Number(start), end: Number(end) } as const
}
