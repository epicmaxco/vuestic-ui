import { mergeDeep } from './../merge-deep'
import { describe, it, expect } from 'vitest'

describe('test-utils', () => {
  it('Objects', () => {
    expect(mergeDeep({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
  })

  it('Object with array', () => {
    expect(mergeDeep({ a: [1], b: [1] }, { b: [2] })).toEqual({ a: [1], b: [2] })
  })

  it('Objects deep', () => {
    expect(mergeDeep({ a: { a: 1 } }, { a: { b: 2 } })).toEqual({ a: { a: 1, b: 2 } })
  })
})
