import { describe, it, expect } from 'vitest'
import { createImporter, Importer } from '../create-importer'
import { transform } from '../transform'

const objArg = `{
  title: "Test",
}`

const fnArg = `() => {
  console.log('AAAAAAAA!')
}`

const code = `
export default {
  blocks: [
    block.component("default"),
  ]
};
`


describe('page-config/compiler/transform', () => {
  const caller = import.meta.url.replace('file://', '')
  const importer: Importer = createImporter({
    resolve: (path: string) => new Promise((resolve) => resolve({ id: '' + path }))
  } as unknown as any, caller)

  it('imports', async () => {
    console.log(await transform( code, importer))
    console.log(importer.imports)
  })
})
