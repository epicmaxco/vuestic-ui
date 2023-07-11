import { describe, expect, it } from 'vitest'
import { resolve } from 'pathe'
import { generateComponentsList } from '../src/generator/generate-components-list'

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
})
