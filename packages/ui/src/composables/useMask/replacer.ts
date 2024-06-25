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

export const replaceWithMask = (activeTree: NonNullable<RegExpNode['tree']>, value: string) => {
  let replace = true
  let offset = 0
  return activeTree.reduce((acc, item) => {
    if (item.type === 'simple char' && replace) {
      if (item.expected === value[offset]) {
        offset++
      }

      return acc + item.expected
    }

    // console.log(item.expected)

    replace = false

    return acc
  }, '')
}
