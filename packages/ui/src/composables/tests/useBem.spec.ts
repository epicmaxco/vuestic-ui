import { useBem } from '../useBem'
import { describe, it, expect } from 'vitest'

describe('createModifiersClasses', () => {
  it.each([
    /* eslint-disable */
//   modifiers                          | expectedArr                              | expectedObj                                            | expectedString
    [{}                                 , []                                       , {}                                                     , ''                                  ],
    [{ outline: true }                  , ['va-test--outline']                     , { 'va-test--outline': true }                           , 'va-test--outline'                  ],
    [{ outline: true, disabled: false } , ['va-test--outline']                     , { 'va-test--outline': true }                           , 'va-test--outline'                  ],
    [{ outline: true, disabled: true }  , ['va-test--outline', 'va-test--disabled'], { 'va-test--outline': true, 'va-test--disabled': true }, 'va-test--outline va-test--disabled'],
    /* eslint-enable */
  ])('modifiers %s should give expectedArr %s & expectedObj %s', (modifiers: Record<string, boolean>, expectedArr: string[], expectedObj: Record<string, boolean>, expectedString: string) => {
    const wrapper = useBem('va-test', modifiers)
    expect(wrapper.asArray.value).toEqual(expect.arrayContaining(expectedArr))
    expect(wrapper.asObject.value).toEqual(expect.objectContaining(expectedObj))
    expect(wrapper.asString.value).toEqual(expect.stringContaining(expectedString))
  })
})
