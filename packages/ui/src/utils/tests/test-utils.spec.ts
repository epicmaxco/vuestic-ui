import { describe, it, expect } from 'vitest'
import { fromTable } from '../test-utils'

describe('test-utils', () => {
  it('fromTable', () => {
    const result = fromTable`
      getColorArgs                     | expected
      ${['primary', undefined, false]} | ${'#2C82E0'}
      ${['#000', undefined, false]}    | ${'#000'}
    `
    expect(result).toEqual([
      [['primary', undefined, false], '#2C82E0'],
      [['#000', undefined, false], '#000'],
    ])
  })
})
