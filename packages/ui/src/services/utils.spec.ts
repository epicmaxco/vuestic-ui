import { deepEqual, getProp, getValueByPath, getNestedValue } from './utils'

describe('utils', () => {
  it('deepEqual', () => {
    expect(deepEqual(null, null)).toEqual(true)
    expect(deepEqual(null, undefined)).toEqual(false)
    expect(deepEqual(null, false)).toEqual(false)
    expect(deepEqual(null, 0)).toEqual(false)
    expect(deepEqual(null, '')).toEqual(false)
    expect(deepEqual(null, [])).toEqual(false)
    expect(deepEqual(null, {})).toEqual(false)

    // Undefined
    expect(deepEqual(undefined, undefined)).toEqual(true)
    expect(deepEqual(undefined, null)).toEqual(false)
    expect(deepEqual(undefined, false)).toEqual(false)
    expect(deepEqual(undefined, 0)).toEqual(false)
    expect(deepEqual(undefined, '')).toEqual(false)
    expect(deepEqual(undefined, [])).toEqual(false)
    expect(deepEqual(undefined, {})).toEqual(false)

    // Boolean
    expect(deepEqual(true, true)).toEqual(true)
    expect(deepEqual(true, false)).toEqual(false)
    expect(deepEqual(true, undefined)).toEqual(false)
    expect(deepEqual(true, null)).toEqual(false)
    expect(deepEqual(true, 0)).toEqual(false)
    expect(deepEqual(true, 1)).toEqual(false)
    expect(deepEqual(true, '')).toEqual(false)
    expect(deepEqual(true, 'abc')).toEqual(false)
    expect(deepEqual(true, [1, 2])).toEqual(false)
    expect(deepEqual(true, { x: 1 })).toEqual(false)

    expect(deepEqual(false, false)).toEqual(true)
    expect(deepEqual(false, true)).toEqual(false)
    expect(deepEqual(false, undefined)).toEqual(false)
    expect(deepEqual(false, null)).toEqual(false)
    expect(deepEqual(false, 0)).toEqual(false)
    expect(deepEqual(false, 1)).toEqual(false)
    expect(deepEqual(false, '')).toEqual(false)
    expect(deepEqual(false, 'abc')).toEqual(false)
    expect(deepEqual(false, [1, 2])).toEqual(false)
    expect(deepEqual(false, { x: 1 })).toEqual(false)

    // Number
    expect(deepEqual(5, 5)).toEqual(true)
    expect(deepEqual(8, 8.0)).toEqual(true)
    expect(deepEqual(8, '8')).toEqual(false)
    expect(deepEqual(-10, -10)).toEqual(true)

    expect(deepEqual(0, '')).toEqual(false)
    expect(deepEqual(0, false)).toEqual(false)
    expect(deepEqual(0, null)).toEqual(false)
    expect(deepEqual(0, undefined)).toEqual(false)

    // String
    expect(deepEqual('', '')).toEqual(true)
    expect(deepEqual('a', 'a')).toEqual(true)
    expect(deepEqual('a', 'b')).toEqual(false)
    expect(deepEqual('a', 'A')).toEqual(false)
    expect(deepEqual('abc', 'abc')).toEqual(true)
    expect(deepEqual('Abc', 'abc')).toEqual(false)
    expect(deepEqual(' ', '')).toEqual(false)

    // Array
    expect(deepEqual([], [])).toEqual(true)
    expect(deepEqual([1], [1.0])).toEqual(true)
    expect(deepEqual([1, '2'], [1, '2'])).toEqual(true)
    expect(deepEqual([1, { x: 1, y: 2 }], [1, { x: 1, y: 2 }])).toEqual(true)
    expect(deepEqual([1, { x: 1, y: null }], [1, { x: 1, y: false }]))
      .toEqual(false)
    expect(deepEqual([1, [1, 2]], [1, [1, 2]])).toEqual(true)

    // Object
    expect(deepEqual({}, {})).toEqual(true)
    expect(deepEqual({ x: 1 }, { x: 1 })).toEqual(true)
    expect(deepEqual({ x: 1 }, {})).toEqual(false)
    expect(deepEqual({ x: { a: 1, b: 2 } }, { x: { a: 1, b: 2 } }))
      .toEqual(true)

    // Date
    const currentDate = new Date()
    const futureDate = new Date(1000)

    expect(deepEqual(currentDate, currentDate)).toEqual(true)
    expect(deepEqual({ date: currentDate }, { date: currentDate }))
      .toEqual(true)
    expect(deepEqual(currentDate, futureDate)).toEqual(false)
    expect(deepEqual({ date: currentDate }, { date: futureDate }))
      .toEqual(false)

    const circular: any = {}
    circular.me = circular

    expect(deepEqual({ r: circular }, { r: circular })).toEqual(true)
    expect(deepEqual({ r: circular, x: 1 }, { r: circular, x: 2 }))
      .toEqual(false)
    expect(deepEqual({ r: [circular] }, { r: [circular] })).toEqual(true)
  })

  it('getProp', () => {
    const test = 'test'
    expect(getProp('string', test)).toBeUndefined()
    expect(getProp({ test }, obj => obj.test)).toBe(test)
    expect(getProp({ test: { test: { test } } }, `${test}.${test}.${test}`))
      .toBe(test)
  })

  it('getValueByPath', () => {
    expect(getValueByPath({ name: 'one' }, 'disabled')).toBeUndefined()
    expect(getValueByPath({ name: 'one' }, 'name')).toBe('one')
    expect(getValueByPath({ name: { test: 'one' } }, '.name.test')).toBe('one')
  })

  it('getNestedValue', () => {
    const object = {
      product: {
        name: 'one',
      },
    }
    expect(getNestedValue(object, [])).toBe(object)
    expect(getNestedValue(object, ['product'])).toBe(object.product)
    expect(getNestedValue(object, ['product', 'name'])).toBe(object.product.name)
    expect(getNestedValue(object, ['missing'])).toBeUndefined()
    expect(getNestedValue(object, ['product', 'missing'])).toBeUndefined()
    expect(getNestedValue(object, ['product', 'name', 'missing'])).toBeUndefined()
  })
})
