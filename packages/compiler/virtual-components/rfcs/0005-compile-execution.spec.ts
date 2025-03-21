import { expect, describe, test } from 'vitest'
import { createVirtualComponent } from '../lib/create-virtual-component'
import { transformVue } from '../lib'

describe('Virtual Components', () => {
  describe('Syntax', () => {
    describe('v-if', async () => {
      const button = await createVirtualComponent('VcButton', `
        <script setup>
          const props = defineProps({
            icon: String
          })
        </script>

        <template>
          <button>
            <div v-if="icon" class="mr-2">{{ icon }}</div>
            </div>
            <slot />
          </button>
        </template>
      `.trim())

      describe('static expression', () => {
        test('should not render element if not passed', () => {
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

        test('should render element if passed', () => {
          const source = `
            <template>
              <div>
                <VcButton icon="👺">Test</VcButton>
              </div>
            </template>
          `.trim()

          const transformed = transformVue(source, [button])

          expect(transformed.toString()).toBe(`
            <template>
              <div>
                <button>
                  <div class="mr-2">
                    👺
                  </div>
                  Test
                </button>
              </div>
            </template>
          `.trim())
        })
      })

      describe('dynamic expression', () => {
        test('should render v-if if dynamic prop', () => {
          const source = `
            <script>
              const userIcon = '👺'
            </script>

            <template>
              <div>
                <VcButton :icon="userIcon">Test</VcButton>
              </div>
            </template>
          `.trim()

          const transformed = transformVue(source, [button])

          expect(transformed.toString()).toBe(`
            <script>
              const userIcon = '👺'
            </script>

            <template>
              <div>
                <button>
                  <div v-if="userIcon" class="mr-2">
                    {{ userIcon }}
                  </div>
                  Test
                </button>
              </div>
            </template>
          `.trim())
        })
      })
    })

    describe('v-for', async () => {
      const list = await createVirtualComponent('VcList', `
        <script setup>
          const props = defineProps({
            items: Array
          })
        </script>

        <template>
          <ul>
            <li v-for="item in items" :key="item.id">
              {{ item.name}}
            </li>
          </ul>
        </template>
      `.trim())

      test('should render list if static array', () => {
        const source = `
          <template>
            <div>
              <VcList :items="[{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2'}]"></VcList>
            </div>
          </template>
        `.trim()

        const transformed = transformVue(source, [list])

        expect(transformed.toString()).toBe(`
          <template>
            <div>
              <ul>
                <li>
                  Test 1
                </li>
                <li>
                  Test 2
                </li>
              </ul>
            </div>
          </template>
        `.trim())
      })

      test('should keep v-for if dynamic array', () => {
        const source = `
          <script setup>
            const items = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2'}]
          </script>

          <template>
            <div>
              <VcList :items="items"></VcList>
            </div>
          </template>
        `

        const transformed = transformVue(source, [list])

        expect(transformed.toString()).toBe(`
          <script setup>
            const items = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2'}]
          </script>

          <template>
            <div>
              <ul>
                <li v-for="item in items" :key="item.id">
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </template>
        `)
      })

      test('should keep v-for if dynamic array and render static props inside', async () => {
        const list = await createVirtualComponent('VcList', `
          <script setup>
            const props = defineProps({
              items: Array,
              prefix: String
            })
          </script>

          <template>
            <ul>
              <li v-for="item in items" :key="item.id">
                {{prefix}}{{ item.name }}
              </li>
            </ul>
          </template>
        `.trim())

        const source = `
          <script setup>
            const items = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2'}]
          </script>

          <template>
            <div>
              <VcList :items="items" prefix="Hello, "></VcList>
            </div>
          </template>
        `

        const transformed = transformVue(source, [list])

        expect(transformed.toString()).toBe(`
          <script setup>
            const items = [{ id: 1, name: 'Test 1' }, { id: 2, name: 'Test 2'}]
          </script>

          <template>
            <div>
              <ul>
                <li v-for="item in items" :key="item.id">
                  Hello,
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </template>
        `)
      })
    })
  })
})
