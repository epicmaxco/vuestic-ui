import { describe, test, expect } from 'vitest'
import { transformVueComponent as o } from './component-v-bind-fix'

const transformVueComponent = (code: string) => {
  if (!code) { return undefined }
  return o(code)?.code
}

describe('component-v-bind-fix', () => {
  describe('transformVueComponent', () => {
    // eslint-disable-next-line no-template-curly-in-string
    const expectedStyleString = '--va-color: ${String(color)};--va-background: ${String(background)}'

    const expectedObjectStyleString = (styleContent: string) => `[${styleContent}, \`${expectedStyleString}\`]`

    const componentCode = (attrs = '', nestedAttrs = '') => `
<template>
  <button${attrs ? ' ' + attrs : ''}>
    <span${nestedAttrs ? ' ' + nestedAttrs : ''}>
      Hello
    </span>
    world!
  </button>
</template>

<script setup>
const color = computed(() => 'blue')
const background = 'yellow'
</script>

<style>
  button {
    color: v-bind(color);
    background: v-bind(background);
  }
</style>
`

    const expectedComponentCode = (attrs = '', nestedAttrs = '') => `
<template>
  <button${attrs ? ' ' + attrs : ''}>
    <span${nestedAttrs ? ' ' + nestedAttrs : ''}>
      Hello
    </span>
    world!
  </button>
</template>

<script setup>
const color = computed(() => 'blue')
const background = 'yellow'
</script>

<style>
  button {
    color: var(--va-color);
    background: var(--va-background);
  }
</style>
`

    test('expectedObjectStyleString', () => {
      expect(expectedObjectStyleString('style')).toBe(`[style, \`${expectedStyleString}\`]`)
    })

    test('replace v-bind() with var(--va-index-name)', () => {
      const code = transformVueComponent(componentCode())

      expect(code).toContain('var(--va-color)')
      expect(code).toContain('var(--va-background)')

      expect(code).not.toContain('v-bind(color)')
      expect(code).not.toContain('v-bind(background)')
    })

    test("if root node doesn't have a style attr, we should add a style attr with css variables ", () => {
      const code = transformVueComponent(componentCode())

      expect(code).toBe(expectedComponentCode(
        `:style="\`${expectedStyleString}\`"`,
      ))
    })

    test('if root node have a style attr we add to its value css variables', () => {
      const code = transformVueComponent(componentCode(
        'style="color: red"',
      ))

      expect(code).toBe(expectedComponentCode(
        `:style="\`color: red;${expectedStyleString}\`"`,
      ))
    })

    test('if root node have a style object vbind, but no style tag we add style attr with css variables', () => {
      const code = transformVueComponent(componentCode(
        ':style="{ background: yellow }"',
      ))

      const obj = "{ ...{ background: yellow }, '--va-color': color,'--va-background': background }"
      // eslint-disable-next-line no-template-curly-in-string
      const str = '{ background: yellow } + `;--va-color: ${color};--va-background: ${background}`'

      expect(code).toBe(expectedComponentCode(
        `:style="${expectedObjectStyleString('{ background: yellow }')}"`,
      ))
    })

    // TODO: Maybe better just use style string
    test('if root node have both style attr and vbind we add to style attr css variables', () => {
      const code = transformVueComponent(componentCode(
        'style="color: blue" :style="{ background: yellow }"',
      ))

      expect(code).toBe(expectedComponentCode(
        `style="color: blue" :style="${expectedObjectStyleString('{ background: yellow }')}"`,
      ))
    })

    test('if root node have vbind and nested element has style attr, we still add style attr on root node', () => {
      const code = transformVueComponent(componentCode(
        ':style="{ background: yellow }"',
        'style="color: blue"',
      ))

      expect(code).toBe(expectedComponentCode(
        `:style="${expectedObjectStyleString('{ background: yellow }')}"`,
        'style="color: blue"',
      ))
    })

    test('if root node have vbind and nested element has style vbind, we add css variables only to root node', () => {
      const code = transformVueComponent(componentCode(
        ':style="{ background: yellow }"',
        ':style="{ color: blue }"',
      ))

      expect(code).toBe(expectedComponentCode(
        `:style="${expectedObjectStyleString('{ background: yellow }')}"`,
        ':style="{ color: blue }"',
      ))
    })

    test('if root node doesn\'t have any style we add it as string and nested elements stay the same', () => {
      const code = transformVueComponent(componentCode('', ':style="{ color: blue }"'))

      expect(code).toBe(expectedComponentCode(`:style="\`${expectedStyleString}\`"`, ':style="{ color: blue }"'))
    })

    test('if root node has a lot of attrs we still add style', () => {
      const code = transformVueComponent(componentCode(`
        role="button"
        id="submit"
        class="btn btn-primary"
        :class="{ active: isActive }"
      `.trim()))

      expect(code).toBe(expectedComponentCode(`
        role="button"
        id="submit"
        class="btn btn-primary"
        :class="{ active: isActive }" :style="\`${expectedStyleString}\`"
      `.trim()))
    })

    test('if root node has a lot of attrs', () => {
      const code = transformVueComponent(componentCode(`
        role="button"
        id="submit"
        class="btn btn-primary"
        style="cursor: pointer"
        :class="{ active: isActive }"
      `.trim()))

      expect(code).toBe(expectedComponentCode(`
        role="button"
        id="submit"
        class="btn btn-primary"
        :style="\`cursor: pointer;${expectedStyleString}\`"
        :class="{ active: isActive }"
      `.trim()))
    })
  })

  test('transform string v-bind in css', () => {
    const componentCode = (attrs = '', nestedAttrs = '') => `
    <template>
      <button>
        <span>
          Hello
        </span>
        world!
      </button>
    </template>

    <script setup>
    const theme = {
      color: 'blue',
      background: 'yellow',
    }
    </script>

    <style>
      button {
        color: v-bind('theme.color');
        background: v-bind("theme.background");
      }
    </style>
    `

    const expectedComponentCode = () => `
    <template>
      <button :style="\`--va-theme-color: \${String(theme.color)};--va-theme-background: \${String(theme.background)}\`">
        <span>
          Hello
        </span>
        world!
      </button>
    </template>

    <script setup>
    const theme = {
      color: 'blue',
      background: 'yellow',
    }
    </script>

    <style>
      button {
        color: var(--va-theme-color);
        background: var(--va-theme-background);
      }
    </style>
    `

    expect(transformVueComponent(componentCode())).toBe(expectedComponentCode())
  })

  test('transform multiple nodes', () => {
    const componentCode = (attrs = '', nestedAttrs = '') => `
    <template>
      <button>
        <span>
          Hello
        </span>
        world!
      </button>
      <div>
        Label
      </div>
    </template>

    <script setup>
    const theme = {
      color: 'blue',
      background: 'yellow',
    }
    </script>

    <style>
      button {
        color: v-bind('theme.color');
        background: v-bind("theme.background");
      }
    </style>
    `

    const expectedComponentCode = () => `
    <template>
      <button :style="\`--va-theme-color: \${String(theme.color)};--va-theme-background: \${String(theme.background)}\`">
        <span>
          Hello
        </span>
        world!
      </button>
      <div :style="\`--va-theme-color: \${String(theme.color)};--va-theme-background: \${String(theme.background)}\`">
        Label
      </div>
    </template>

    <script setup>
    const theme = {
      color: 'blue',
      background: 'yellow',
    }
    </script>

    <style>
      button {
        color: var(--va-theme-color);
        background: var(--va-theme-background);
      }
    </style>
    `

    expect(transformVueComponent(componentCode())).toBe(expectedComponentCode())
  })

  test('transform multiple v-bind the same variable', () => {
    const componentCode = (attrs = '', nestedAttrs = '') => `
    <template>
      <button>
        <span>
          Hello
        </span>
        world!
      </button>
    </template>

    <script setup>
    const theme = {
      color: 'blue',
    }
    </script>

    <style>
      button {
        color: v-bind('theme.color');
        fill: v-bind("theme.color");
      }
    </style>
    `

    const expectedComponentCode = () => `
    <template>
      <button :style="\`--va-theme-color: \${String(theme.color)}\`">
        <span>
          Hello
        </span>
        world!
      </button>
    </template>

    <script setup>
    const theme = {
      color: 'blue',
    }
    </script>

    <style>
      button {
        color: var(--va-theme-color);
        fill: var(--va-theme-color);
      }
    </style>
    `

    expect(transformVueComponent(componentCode())).toBe(expectedComponentCode())
  })

  test('idk yet', () => {
    const componentCode = (attrs = '', nestedAttrs = '') => `
    <template>
      <button>
        <span>
          Hello
        </span>
        world!
      </button>
    </template>

    <script lang="ts">
    export default defineComponent({
      name: 'VaLayoutArea',

      props: {
        area: { type: String as PropType<AreaName>, required: true },
        config: { type: Object as PropType<AreaConfig>, required: true },
      },

      emits: ['overlay-click'],

      setup (props) {
        return {
          absolute: computed(() => props.config.absolute || false),
          fixed: computed(() => props.config.fixed || false),
          overlay: computed(() => props.config.overlay || false),
        }
      },
    })
    </script>

    <style>
      button {
        color: v-bind("$props.color");
      }
    </style>
    `

    const expectedComponentCode = () => `
    <template>
      <button :style="\`--va-props-color: \${String($props.color)}\`">
        <span>
          Hello
        </span>
        world!
      </button>
    </template>

    <script lang="ts">
    export default defineComponent({
      name: 'VaLayoutArea',

      props: {
        area: { type: String as PropType<AreaName>, required: true },
        config: { type: Object as PropType<AreaConfig>, required: true },
      },

      emits: ['overlay-click'],

      setup (props) {
        return {
          absolute: computed(() => props.config.absolute || false),
          fixed: computed(() => props.config.fixed || false),
          overlay: computed(() => props.config.overlay || false),
        }
      },
    })
    </script>

    <style>
      button {
        color: var(--va-props-color);
      }
    </style>
    `

    expect(transformVueComponent(componentCode())).toBe(expectedComponentCode())
  })
})
