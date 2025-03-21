import { expect, describe, test } from 'vitest'
import { createVirtualComponent } from '../lib/create-virtual-component'
import { transformVue } from '../lib'

describe('Virtual Components', () => {
  describe('Syntax', async () => {
    const button = await createVirtualComponent('VcButton', `
      <script setup>
        defineProps({
          icon: String,
          iconRight: String
        })
      </script>

      <template>
        <button>
          <VcIcon v-if="icon" :name="icon" />
          <slot />
          <VcIcon v-if="iconRight" :name="iconRight" />
        </button>
      </template>
    `)

    const icon = await createVirtualComponent('VcIcon', `
      <script setup>
        defineProps({ name: String })
      </script>

      <template>
        <i class="material-icons">{{ name }}</i>
      </template>
    `)

    test('should transform Vue SFC to virtual component with methods', () => {
      const source = `
      <template>
        <VcButton icon="person" />
      </template>
      `

      const result = transformVue(source, [button, icon])

      expect(result.toString()).toBe(`
      <template>
        <button>
          <i class="material-icons">
            person
          </i>
        </button>
      </template>
      `)
    })
  })
})
