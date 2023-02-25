import { exportTranslations } from '../export-translations';
import { describe, test, expect } from 'vitest'
import { resolve } from 'path'
import { createImporter } from '../../compiler/create-importer';

describe('export-translations', () => {
  test('export translations', async () => {
    const caller = import.meta.url.replace('file://', '')
    const importer = createImporter({
      resolve: (path: string) => new Promise((resolve) => resolve({ id: '' + path }))
    } as unknown as any, caller)

    const exports = await exportTranslations(importer, resolve(__dirname, './tests'))

    expect(exports).toContain(`export const translations = {
  en
}`)

    expect(importer.imports).toContain('import en from ')
  })
})