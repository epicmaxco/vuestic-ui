import { expect, describe, test } from 'vitest'
import { createVirtualComponent } from '../lib/create-virtual-component'
import { transformVue } from '../lib'

describe('Virtual Components', () => {
  describe('Syntax', () => {
    const component = createVirtualComponent('TestComponent', `
    <template>
      <div>
        <h1>{{ header() }}</h1>
        <p>{{ desc() }}</p>
      </div>
    </template>

    <script setup>
      const header = () => { return 'Header' }

      function desc() {
        return 'Description'
      }
    </script>
    `)

    test('should transform Vue SFC to virtual component with methods', () => {
      const source = `
      <template>
        <TestComponent />
      </template>
      `

      const result = transformVue(source, [component])

      expect(result.toString()).toBe(`
      <template>
        <div>
          <h1>
            Header
          </h1>
          <p>
            Description
          </p>
        </div>
      </template>
      `)
    })
  })
})
