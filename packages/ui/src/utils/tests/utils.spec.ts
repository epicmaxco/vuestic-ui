import { getValueByKey, getValueByPath } from '../value-by-key'
import { describe, it, expect } from 'vitest'

describe('utils', () => {
  it('getValueByKey', () => {
    const test = 'test'
    expect(getValueByKey('string', test)).toBeUndefined()
    expect(getValueByKey(1, test)).toBeUndefined()
    expect(getValueByKey({ test }, obj => obj.test)).toBe(test)
    expect(getValueByKey({ test: { test: { test } } }, `${test}.${test}.${test}`))
      .toBe(test)
  })

  it('getValueByPath', () => {
    expect(getValueByPath({ name: 'one' }, 'disabled')).toBeUndefined()
    expect(getValueByPath({ name: 'one' }, 'name')).toBe('one')
    expect(getValueByPath({ name: { test: 'one' } }, '.name.test')).toBe('one')
  })
})
