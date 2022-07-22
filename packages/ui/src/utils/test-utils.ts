/**
 * @deprecated
 *  use vitest each
 * @param one
 * @param args
 */
export const fromTable = (one: any, ...args: any[]) => {
  const rows = one[0].split('|').map((i: any) => i.trim())
  let result: any[] = []
  while (args.length) {
    result = [...result, args.splice(0, rows.length)]
  }
  return result
}
