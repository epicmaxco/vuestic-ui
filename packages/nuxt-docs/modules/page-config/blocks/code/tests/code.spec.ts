import { describe, expect, test } from 'vitest'
import transform from '../transform'
import { createImporter, Importer } from '../../../compiler/create-importer'
import { parseCode } from '../../../compiler/parse'

describe('blocks/code/transform', () => {
  const caller = import.meta.url.replace('file://', '')
  let importer: Importer = createImporter({
    resolve: (path: string) => new Promise((resolve) => resolve({ id: '' + path }))
  } as unknown as any, caller)

  test('resolve-string-file', async () => {
    const template = `
export default definePageConfig({
  blocks: [
    block.code('test'),
  ]
})
`.trim()
  const blocks = parseCode(template)

  const newCode = await transform.call({ importer }, blocks[0])

  expect(newCode).toBe(`
export default definePageConfig({
  blocks: [
    block.code(test),
  ]
})
  `.trim())
  })

  test('resolve-object-file', async () => {
    const template = `
export default definePageConfig({
  blocks: [
    block.code({
      yarn: 'test',
      npm: 'yarn',
    }),
  ]
})
`.trim()
  const blocks = parseCode(template)

  const newCode = await transform.call({ importer }, blocks[0])

  expect(newCode).toBe(`
export default definePageConfig({
  blocks: [
    block.code({
    yarn: test,
    npm: yarn
}),
  ]
})
  `.trim())
  })

  test('resolve-object-file (same file)', async () => {
    const template = `
export default definePageConfig({
  blocks: [
    block.code({
      yarn: 'test',
      npm: 'test',
    }),
  ]
})
`.trim()
  const blocks = parseCode(template)

  const newCode = await transform.call({ importer }, blocks[0])

  expect(newCode).toBe(`
export default definePageConfig({
  blocks: [
    block.code({
    yarn: test,
    npm: test
}),
  ]
})
  `.trim())
  })

  test('resolve-variable', async () => {
    const template = `
export default definePageConfig({
  blocks: [
    block.code(variable),
  ]
})
`.trim()
  const blocks = parseCode(template)

  const newCode = await transform.call({ importer }, blocks[0])

  expect(newCode).toBe(undefined)

  console.log(importer.imports)
  })
})
