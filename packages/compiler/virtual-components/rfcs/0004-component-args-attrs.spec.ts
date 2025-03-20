import { expect, describe, test } from 'vitest'
import { createVirtualComponent } from '../lib/create-virtual-component'
import { transformVue } from '../lib'

describe('Virtual Components', () => {
  describe('Syntax', () => {
    describe('attrs', () => {
      describe('apply attrs on root', () => {
        const button = createVirtualComponent('VcButton', `
          <template>
            <button>
              <slot />
            </button>
          </template>
        `.trim())

        test('should render static attrs', () => {
          const source = `
            <template>
              <div>
                <VcButton id="test">Test</VcButton>
              </div>
            </template>
            `.trim()

          const transformed = transformVue(source, [button])

          expect(transformed.toString()).toBe(`
            <template>
              <div>
                <button id="test">
                  Test
                </button>
              </div>
            </template>
          `.
            trim())
        })

        test('should render dynamic attrs', () => {
          const source = `
            <script setup>
              const test = 12
            </script>

            <template>
              <div>
                <VcButton :id="test">Test</VcButton>
              </div>
            </template>
          `.trim()

          const transformed = transformVue(source, [button])

          expect(transformed.toString()).toBe(`
            <script setup>
              const test = 12
            </script>

            <template>
              <div>
                <button :id="test">
                  Test
                </button>
              </div>
            </template>
          `.trim())
        })
      })

      describe('attrs merging (predefined static class)', () => {
        const button = createVirtualComponent('VcButton', `
          <template>
            <button class="btn">
              <slot />
            </button>
          </template>
        `.trim())

        test('should merge static class attr', () => {
          const source = `
            <template>
              <div>
                <VcButton class="test">Test</VcButton>
              </div>
            </template>
          `.trim()

          const transformed = transformVue(source, [button])

          expect(transformed.toString()).toBe(`
            <template>
              <div>
                <button class="btn test">
                  Test
                </button>
              </div>
            </template>
          `.trim())
        })
      })

      describe('attrs merging (predefined dynamic class)', () => {
        const button = createVirtualComponent('VcButton', `
          <template>
            <button :class="['btn', 'btn-primary']">
              <slot />
            </button>
          </template>
        `.trim())

        test('should merge dynamic and static class attr', () => {
          const source = `
            <script setup>
              const btn = 'test'
            </script>

            <template>
              <div>
                <VcButton :class="btn">Test</VcButton>
              </div>
            </template>
          `.trim()

          const transformed = transformVue(source, [button])

          expect(transformed.toString()).toBe(`
            <script setup>
              const btn = 'test'
            </script>

            <template>
              <div>
                <button class="btn btn-primary" :class="btn">
                  Test
                </button>
              </div>
            </template>
          `.trim())
        })
      })
    })
  })
})
