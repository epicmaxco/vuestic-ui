import { RegExpNode } from "./types"

const isValueExpected = (value: string, expected: string | RegExp) => typeof expected === 'string' ? value === expected : expected.test(value)

const chainTree = (tree: NonNullable<RegExpNode['tree']>): (RegExpNode[]) => {
  return tree
    .map((t) => {
      if (t.canBeIgnored || t.type === 'or regex') { return t }

      return (t.tree && t.tree.length > 0) ? chainTree(t.tree) : t
    })
    .flat(Infinity) as RegExpNode[]
}

export const replaceWithMask = (activeTree: RegExpNode['tree']) => {

}

export const makeSuggestion = (activeTree: RegExpNode['tree'], suggest = true) => {
  if (!activeTree) { return '' }

  let newStr = ''

  const chain = chainTree(activeTree)
    .filter((item) => !(item.type === 'invalid regex' || item.canBeIgnored || item.type === 'reserved'))

  for (let i = 0; i < chain.length; i++) {
    const item = chain[i]

    if (item.type === 'simple char' && suggest) {
      newStr += item.expected
      continue
    }

    if (item.value.length > 0) {
      if (!isValueExpected(item.value, item.expected)) {
        return newStr
      }

      newStr += item.value
      continue
    }

    return newStr
  }

  return newStr
}
