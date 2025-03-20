import { expect, describe, test } from 'vitest'
import { createVirtualComponent } from '../lib/create-virtual-component'
import { transformVue } from '../lib'

describe('Virtual Components', () => {
  describe('Syntax', () => {
    test('replace template', () => {
      const button = createVirtualComponent('VcButton', `
        <template>
          <button>Test</button>
        </template>
      `.trim())

      const source = `
        <template>
          <div>
            <VcButton />
          </div>
        </template>
      `.trim()

      const transformed = transformVue(source, [button])

      expect(transformed.toString()).toBe(`
        <template>
          <div>
            <button>
              Test
            </button>
          </div>
        </template>
      `.trim())
    })
  })
})
