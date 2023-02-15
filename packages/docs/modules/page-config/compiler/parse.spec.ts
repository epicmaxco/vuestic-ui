import { describe, it, expect } from 'vitest'
import { parseCode } from './parse'

const objArg = `{
  title: "Test",
}`

const fnArg = `() => {
  console.log('AAAAAAAA!')
}`

const code = `
export default {
  meta: {
    title: "Hello",
    category: "component"
  },
  blocks: [
    block.component("default"),
    block.example("test"),
    block.example("test", ${objArg}),
    block.alert(${fnArg})
  ]
};
`

describe('definePageConfig.compiler', () => {
  it('parseCode', () => {
    const blocks = parseCode(code)

    expect(blocks[0]).toMatchObject({
      code: 'block.component("default")',
      type: 'component',
      args: ['"default"'],
    })

    expect(blocks[1]).toMatchObject({
      code: 'block.example("test")',
      type: 'example',
      args: ['"test"'],
    })

    expect(blocks[2]).toMatchObject({
      code: `block.example("test", ${objArg})`,
      type: 'example',
      args: ['"test"', objArg],
    })

    expect(blocks[3]).toMatchObject({
      code: `block.alert(${fnArg})`,
      type: 'alert',
      args: [fnArg],
    })
  })

  it('parseCode (nested)', () => {
    const blocks = parseCode(`export default {
      meta: {
        title: "Hello",
        category: "component"
      },
      blocks: [
        block.component("default"),
        block.collapse('title', [
          block.component("hidden"),
        ])
      ]
    }`)

    expect(blocks.length).toBe(3)
  })
})
