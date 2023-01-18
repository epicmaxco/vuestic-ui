import { describe, expect, test } from 'vitest'
import transform from '../../blocks/code/transform'
import { createImporter } from '../../compiler/create-importer'
import { parseCode } from '../../compiler/parse'

describe('blocks/code/transform', () => {
  const caller = import.meta.url.replace('file://', '')
  const importer = createImporter({
    resolve: (path: string) => new Promise((resolve) => resolve({ id: '' + path }))
  } as unknown as any, caller)


  test('resolve-string-file', async () => {
    const template = `
export default definePageConfig({
  meta: {
    title: 'any',
    category: 'any',
  },

  blocks: [
    block.code('test'),
  ]
})
`
  const blocks = parseCode(template)

  const newCode = await transform.call({ importer }, blocks[0])
  // console.log(newCode, importer.imports)

  expect(newCode).not.toBe(template)
  })

  test('resolve-object-file', async () => {
    const template = `
export default definePageConfig({
  meta: {
    title: 'any',
    category: 'any',
  },

  blocks: [
    block.code({
      yarn: 'test',
      npm: 'test',
    }),
  ]
})
`
  const blocks = parseCode(template)

  const newCode = await transform.call({ importer }, blocks[0])

  console.log(newCode, importer.imports)

  expect(newCode).not.toBe(template)
  })
})
