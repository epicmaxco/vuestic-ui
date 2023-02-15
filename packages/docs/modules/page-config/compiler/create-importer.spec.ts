import { describe, it, expect } from 'vitest'
import { createImporter } from './create-importer'

const caller = import.meta.url.replace('file://', '')

describe('definePageConfig.importer', () => {
  it('importer (default)', () => {
    const importer = createImporter({
      resolve: (path: string) => new Promise((resolve) => resolve({ id: '' + path }))
    } as unknown as any, caller)

    importer.importDefault('Default', 'example/Default.vue')
    importer.importDefault('Default', 'example/Default.vue?raw')

    expect(importer.imports).toBe(`
import Default from 'example/Default.vue';
import Default_1 from 'example/Default.vue?raw';
`.trim())
  })

  it('importer (named)', () => {
    const importer = createImporter({
      resolve: (path: string) => new Promise((resolve) => resolve({ id: '' + path }))
    } as unknown as any, caller)

    importer.importNamed('VaButton', 'vuestic-ui')
    importer.importNamed('VaInput', 'vuestic-ui')

    expect(importer.imports).toBe(`
import { VaButton as VaButton, VaInput as VaInput } from 'vuestic-ui';
    `.trim())
  })


  it('importer (named) (dup)', () => {
    const importer = createImporter({
      resolve: (path: string) => new Promise((resolve) => resolve({ id: '' + path }))
    } as unknown as any, caller)

    importer.importNamed('VaButton', 'vuestic-ui')
    importer.importNamed('VaButton', 'vuestic-ui')

    expect(importer.imports).toBe(`
import { VaButton as VaButton } from 'vuestic-ui';
`.trim())
  })
})
