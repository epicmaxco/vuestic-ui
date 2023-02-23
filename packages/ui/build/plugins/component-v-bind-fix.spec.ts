import { describe, test, expect } from 'vitest'
import { transformVueComponent } from './component-v-bind-fix'

describe('component-v-bind-fix', () => {
  describe('style guard', () => {
    test('should use object if object', () => {
      const styleValue: any = { color: 'red' }

      expect(typeof styleValue === 'object'
        ? { ...styleValue, ...{ background: 'blue' } }
        : styleValue + ';background: blue')
        .toEqual({ color: 'red', background: 'blue' })
    })

    test('should use string if string', () => {
      const styleValue: any = 'color: red'

      expect(typeof styleValue === 'object'
        ? { ...styleValue, ...{ background: 'blue' } }
        : styleValue + ';background: blue')
        .toEqual('color: red;background: blue')
    })

    test('should use string if string with ;', () => {
      const styleValue: any = 'color: red;'

      expect(typeof styleValue === 'object'
        ? { ...styleValue, ...{ background: 'blue' } }
        : styleValue + ';background: blue')
        // TODO: Not sure, but it looks like a correct CSS
        .toEqual('color: red;;background: blue')
    })
  })

  describe('transformVueComponent', () => {
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
    color: var(--va-0-color);
    background: var(--va-1-background);
  }
</style>
`
    const stringStyle = '--va-0-color: color;--va-1-background: background'

    const objectGuardStyle = (exstingStyle: string) => {
      // If exstingStyle is object, we should use spread operator, but if it is string, we should use semicolon
      return `typeof ${exstingStyle} === 'object' ? { ...${exstingStyle}, ...{ '--va-0-color': color,'--va-1-background': background } } : ${exstingStyle} + ';${stringStyle}'`
    }

    test('replace v-bind() with var(--va-index-name)', () => {
      const code = transformVueComponent(componentCode())

      expect(code).toContain('var(--va-0-color)')
      expect(code).toContain('var(--va-1-background)')

      expect(code).not.toContain('v-bind(color)')
      expect(code).not.toContain('v-bind(background)')
    })

    test("if root node doesn't have a style attr, we should add a style attr with css variables ", () => {
      const code = transformVueComponent(componentCode())

      expect(code).toBe(expectedComponentCode(
        `style="${stringStyle}"`,
      ))
    })

    test('if root node have a style attr we add to its value css variables', () => {
      const code = transformVueComponent(componentCode(
        'style="color: red"',
      ))

      expect(code).toBe(expectedComponentCode(
        `style="color: red;${stringStyle}"`,
      ))
    })

    test('if root node have a style object vbind, we replace it with object guard', () => {
      const code = transformVueComponent(componentCode(
        ':style="{ background: yellow }"',
      ))

      expect(code).toBe(expectedComponentCode(
        `:style="${objectGuardStyle('{ background: yellow }')}"`,
      ))
    })

    // TODO: Maybe better just use style string
    test('if root node have both style attr and vbind we replace only vbind with object guard', () => {
      const code = transformVueComponent(componentCode(
        'style="color: blue" :style="{ background: yellow }"',
      ))

      expect(code).toBe(expectedComponentCode(
        `style="color: blue" :style="${objectGuardStyle('{ background: yellow }')}"`,
      ))
    })

    test('if root node have vbind and nested element has style attr, we replace only root node', () => {
      const code = transformVueComponent(componentCode(
        ':style="{ background: yellow }"',
        'style="color: blue"',
      ))

      expect(code).toBe(expectedComponentCode(
        `:style="${objectGuardStyle('{ background: yellow }')}"`,
        'style="color: blue"',
      ))
    })

    test('if root node have vbind and nested element has style vbind, we replace only root node', () => {
      const code = transformVueComponent(componentCode(
        ':style="{ background: yellow }"',
        ':style="{ color: blue }"',
      ))

      expect(code).toBe(expectedComponentCode(
        `:style="${objectGuardStyle('{ background: yellow }')}"`,
        ':style="{ color: blue }"',
      ))
    })

    test('if root node doesn\'t have any style we add it as string and nested elements stay the same', () => {
      const code = transformVueComponent(componentCode('', ':style="{ color: blue }"'))

      expect(code).toBe(expectedComponentCode(`style="${stringStyle}"`, ':style="{ color: blue }"'))
    })
  })
})
