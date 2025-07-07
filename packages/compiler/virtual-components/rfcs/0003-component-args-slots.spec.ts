import { expect, describe, test } from 'vitest'
import { createVirtualComponent } from '../lib/create-virtual-component'
import { transformVue } from '../lib'

describe('Virtual Components', () => {
  describe('Syntax', () => {
    describe('slots', () => {
      test('default slot', async () => {
        const button = await createVirtualComponent('VcButton', `
          <template>
            <button>
              <slot />
            </button>
          </template>
        `.trim())

        const source = `
          <template>
            <div>
              <VcButton>Test</VcButton>
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

      test('named slot', async () => {
        const button = await createVirtualComponent('VcButton', `
          <template>
            <button>
              <slot name="icon" />
            </button>
          </template>
        `.trim())

        const source = `
          <template>
            <div>
              <VcButton #icon>Test</VcButton>
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

      test('named slots (multiple)', async () => {
        const button = await createVirtualComponent('VcButton', `
          <template>
            <button>
              <slot name="icon" />
              <slot />
              <slot name="iconRight" />
            </button>
          </template>
        `.trim())

        const source = `
          <template>
            <div>
              <VcButton>
                <template #icon>👺</template>
                Test
                <template #iconRight>Icon Right</template>
              </VcButton>
            </div>
          </template>
        `.trim()

        const transformed = transformVue(source, [button])

        expect(transformed.toString()).toBe(`
          <template>
            <div>
              <button>
                👺
                Test
                Icon Right
              </button>
            </div>
          </template>
        `.trim())
      })

      test('named slot deep)', async () => {
        const button = await createVirtualComponent('VcButton', `
          <template>
            <button>
              <span class="mr-2">
                <slot name="icon" />
              </span>
              <slot />
            </button>
          </template>
        `.trim())

        const source = `
          <template>
            <div>
              <VcButton>
                <template #icon>👺</template>
                Test
              </VcButton>
            </div>
          </template>
        `.trim()

        const transformed = transformVue(source, [button])

        expect(transformed.toString()).toBe(`
          <template>
            <div>
              <button>
                <span class="mr-2">
                  👺
                </span>
                Test
              </button>
            </div>
          </template>
        `.trim())
      })
    })
  })
})
