import { useForm } from '../useForm'
import { describe, it, expect } from 'vitest'

describe('useForm', () => {
  it.each([
    /* eslint-disable */
//   props                             | prefix           | expected
    [{ disabled: true, readonly: false } , 'va-test'        , { 'va-test--disabled': true }                           ],
    [{ disabled: true, readonly: false } , ''               , { '--disabled': true }                                  ],
    [{ disabled: true, readonly: true }  , 'va-test'        , { 'va-test--disabled': true, 'va-test--readonly': true }],
    [{}                                  , 'va-test'        , {}                                                      ],
    /* eslint-enable */
  ])('props %s & prefix %s should be %s', (props, prefix, expected) => {
    const { computedClasses } = useForm(prefix, props)
    expect(computedClasses.asObject.value).toMatchObject(expected)
  })
})
