import { describe, expect, it } from 'vitest'
import { resolve } from 'pathe'
import { generateComponentsList } from '../src/generator/generate-components-list'
import { fineComponents } from '../src/generator/generate-components-exports'

describe('generator', async () => {
  it('find components dir build', async () => {
    const files = await generateComponentsList({
      cwd: resolve(__dirname, './demo'),
      componentsDir: 'src/components/*/*.vue',
    })

    expect(files.length).toBe(1)
    expect(files[0].name).toBe('Button')
    expect(files[0].path).toBe('src/components/button/Button.vue')
    expect(files[0].fullPath).toBe(resolve(__dirname, './demo/src/components/button/Button.vue'))
  })

  it('find component exports',async () => {
    const exports = await fineComponents(
      resolve(__dirname, './demo/src/main.ts')
    )

    const components = exports.filter((exp) => /src\/components.*\/.*\.vue$/.test(exp.path))

    expect(components.length).toBe(1)
  })
})
