import { useAlign } from '../useAlign'
import { describe, it, expect } from 'vitest'

describe('useAlign', () => {
  it.each([
    /* eslint-disable */
    // align    vertical   expected
    [undefined, undefined, { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }],
    ['left',    false,     { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }],
    ['center',  false,     { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }],
    ['right',   false,     { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }],
    ['between', false,     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }],
    ['around',  false,     { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }],
    ['left',    true,      { flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }],
    ['center',  true,      { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }],
    ['right',   true,      { flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }],
    ['stretch', true,      { flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' }],
    /* eslint-enable */
  ])('align %s with vertical %s should be %s', (align, vertical, expected) => {
    const { alignComputed } = useAlign({ align, vertical })

    expect(alignComputed.value).toMatchObject(expected)
  })
})
