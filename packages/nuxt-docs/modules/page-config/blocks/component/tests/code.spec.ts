import { describe, expect, test } from 'vitest'
import transform from '../transform'
import { createImporter, Importer } from '../../../compiler/create-importer'
import { parseCode } from '../../../compiler/parse'

describe('blocks/components/transform', () => {
  const caller = import.meta.url.replace('file://', '')
  let importer: Importer = createImporter({
    resolve: (path: string) => new Promise((resolve) => resolve({ id: '' + path }))
  } as unknown as any, caller)

  test('resolve-string-file', async () => {
    const template = `
export default definePageConfig({
  blocks: [
    block.component('test'),
  ]
})
`.trim()
  const blocks = parseCode(template)

  const newCode = await transform.call({ importer }, blocks[0])

  expect(newCode).toBe(`
export default definePageConfig({
  blocks: [
    block.component(test),
  ]
})
  `.trim())
  })
})
