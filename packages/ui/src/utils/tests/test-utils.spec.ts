import { describe, it, expect } from 'vitest'
import { fromTable } from '../test-utils'

describe('test-utils', () => {
  it('fromTable', () => {
    const result = fromTable`
      getColorArgs                     | expected
      ${['primary', undefined, false]} | ${'#2c82e0'}
      ${['#000000', undefined, false]}    | ${'#000000'}
    `
    expect(result).toEqual([
      [['primary', undefined, false], '#2c82e0'],
      [['#000000', undefined, false], '#000000'],
    ])
  })
})
