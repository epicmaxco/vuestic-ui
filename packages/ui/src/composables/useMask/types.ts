export type RegExpNode = {
  type: 'simple char' | 'any char' | 'regex' | 'reserved' | 'repeated' | 'group' | 'or regex' | 'invalid regex',
  value: string,
  expected: string | RegExp,
  tree: RegExpNode[] | null,
  canBeIgnored?: boolean
}
