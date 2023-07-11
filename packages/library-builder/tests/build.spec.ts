import { describe, expect, it } from 'vitest'
import { build } from '../src/builder'
import { resolve } from 'pathe'

describe('build', async () => {
  it('should build', async () => {
    expect(await build({
      formats: ['es', 'esm-node', 'cjs', 'iife'],
      cwd: resolve(__dirname, './demo'),
      entry: 'src/main.ts',
    })).toBe(undefined)
  })
})