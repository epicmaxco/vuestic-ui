import { useBem } from '../useBem'

describe('createModifiersClasses', () => {
  it.each`
    modifiers                             | expectedArr                                 | expectedObj
    ${{}}                                 | ${[]}                                       | ${{}}
    ${{ outline: true }}                  | ${['va-test--outline']}                     | ${{ 'va-test--outline': true }}
    ${{ outline: true, disabled: false }} | ${['va-test--outline']}                     | ${{ 'va-test--outline': true }}
    ${{ outline: true, disabled: true }}  | ${['va-test--outline', 'va-test--disabled']}| ${{ 'va-test--outline': true, 'va-test--disabled': true }}
  `(
    'modifiers $modifiers should be expectedObj $expectedObj & expectedArr $expectedArr',
    ({ modifiers, expectedObj, expectedArr }) => {
      const { computedBemClassesObject, computedBemClassesArray } = useBem('va-test', modifiers)
      expect(computedBemClassesArray.value).toEqual(expect.arrayContaining(expectedArr))
      expect(computedBemClassesObject.value).toEqual(expect.arrayContaining(expectedObj))
    },
  )
})
