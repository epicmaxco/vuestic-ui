import { expect, describe, test } from 'vitest'
import { createVirtualComponent } from '../lib/create-virtual-component'
import { transformVue } from '../lib'

describe('Virtual Components', () => {
  describe('Should correctly execute setup script', async () => {
    const component = await createVirtualComponent('TestComponent', `
    <template>
      <div>
        <h1>{{ getHeader() }}</h1>
        <p>{{ desc }}</p>
      </div>
    </template>

    <script setup lang="ts">
      import { ref } from 'vue'

      const { header = 'Hello' } = defineProps<{
        header: string
      }>()

      const getHeader = () => { return header + ' World' }

      const desc = 'Description'
    </script>
    `)

    test('should transform Vue SFC to virtual component without props', () => {
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
              Hello World
            </h1>
            <p>
              Description
            </p>
          </div>
        </template>
      `)
    })


    test('should transform Vue SFC to virtual component with static props', () => {
      const source = `
        <template>
          <TestComponent header="Good bye"/>
        </template>
      `

      const result = transformVue(source, [component])

      expect(result.toString()).toBe(`
        <template>
          <div>
            <h1>
              Good bye World
            </h1>
            <p>
              Description
            </p>
          </div>
        </template>
      `)
    })


    test('should add import for dynamic prop in variable', async () => {
      const component = await createVirtualComponent('TestComponent', `
        <template>
          <div>
            <h1>{{ headerText }}</h1>
            <p>{{ desc }}</p>
          </div>
        </template>

        <script setup lang="ts">
          import { ref, computed } from 'vue'

          const { header = 'Hello' } = defineProps<{
            header: string
          }>()

          const headerText = header + ' World'

          const desc = 'Description'
        </script>
        `)

        const source = `
<template>
  <TestComponent :header="'Good bye'" />
</template>
        `.trim()

        expect(transformVue(source, [component]).toString()).toBe(`
<template>
  <div>
    <h1>
      Good bye World
    </h1>
    <p>
      Description
    </p>
  </div>
</template>
          `.trim())
    })

    test('should add import for dynamic prop in variable', async () => {
      const component = await createVirtualComponent('TestComponent', `
        <template>
          <div>
            <h1>{{ headerText2 }}</h1>
            <p>{{ desc }}</p>
          </div>
        </template>

        <script setup lang="ts">
          import { ref, computed } from 'vue'

          const { header = 'Hello' } = defineProps<{
            header: string
          }>()

          const headerText1 = header + ' World'
          const headerText2 = headerText1 + '!'

          const desc = 'Description'
        </script>
        `)

        const source = `
<script setup>
  const header = 'Good bye'
</script>

<template>
  <TestComponent :header="header" />
</template>
        `.trim()

        expect(transformVue(source, [component]).toString()).toBe(`
<script setup>
  const header = 'Good bye'
</script>

<template>
  <div>
    <h1>
      {{ header + ' World' + '!' }}
    </h1>
    <p>
      Description
    </p>
  </div>
</template>
          `.trim())
    })

    test('should add import for dynamic prop in method', async () => {
      const component = await createVirtualComponent('TestComponent', `
        <template>
          <div>
            <h1>{{ getHeader($props.header) }}</h1>
            <p>{{ desc }}</p>
          </div>
        </template>

        <script setup lang="ts">
          import { ref, computed } from 'vue'

          const { header = 'Hello' } = defineProps<{
            header: string
          }>()

          const getHeader = (header) => { return header + ' World' }

          const desc = 'Description'
        </script>
        `)

        const source = `
<script setup>
const header = 'Good bye'
</script>

<template>
  <TestComponent :header="header" />
</template>
        `.trim()

        expect(transformVue(source, [component]).toString()).toBe(`
<script>
import { getHeader } from 'virtual-components:TestComponent'
</script>

<script setup>
const header = 'Good bye'
</script>

<template>
  <div>
    <h1>
      {{ getHeader(header) }}
    </h1>
    <p>
      Description
    </p>
  </div>
</template>
          `.trim())
    })

    test('should throw error when ref or computed used', async () => {
      let component = null
      let error = null
      try {
        component = await createVirtualComponent('TestComponent', `
          <template>
            <div>
              <h1>{{ computedHeader }}</h1>
              <p>{{ desc }}</p>
            </div>
          </template>

          <script setup lang="ts">
            import { ref, computed } from 'vue'

            const { header = 'Hello' } = defineProps<{
              header: string
            }>()

            const computedHeader = computed(() => { return header + ' World' })

            const desc = 'Description'
          </script>
          `)

          const source = `
            <template>
              <TestComponent />
            </template>
            `

          transformVue(source, [component])
      } catch (e) {
        error = e
      }

      expect(error).not.toBeNull()
      expect(component).not.toBeNull()
    })
  })
})
