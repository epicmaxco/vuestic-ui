import { useBem } from '../useBem'

describe('createModifiersClasses', () => {
  it.each`
    modifiers                             | includeStandAlonePrefix  | expectedArr                                            | expectedObj
    ${{}}                                 | ${true}                  | ${['va-test']}                                         | ${{ 'va-test': true }}
    ${{ outline: true }}                  | ${true}                  | ${['va-test', 'va-test--outline']}                     | ${{ 'va-test': true, 'va-test--outline': true }}
    ${{ outline: true, disabled: false }} | ${true}                  | ${['va-test', 'va-test--outline']}                     | ${{ 'va-test': true, 'va-test--outline': true, 'va-test--disabled': false }}
    ${{ outline: true, disabled: true }}  | ${true}                  | ${['va-test', 'va-test--outline', 'va-test--disabled']}| ${{ 'va-test': true, 'va-test--outline': true, 'va-test--disabled': true }}
    ${{ outline: true }}                  | ${false}                 | ${['va-test--outline']}                                | ${{ 'va-test--outline': true }}
  `(
    'modifiers $modifiers & includeStandAlonePrefix $includeStandAlonePrefix should be expectedObj $expectedObj & expectedArr $expectedArr',
    ({ modifiers, includeStandAlonePrefix, expectedObj, expectedArr }) => {
      const { computedBemClassesObject, computedBemClassesArray } = useBem('va-test', modifiers, includeStandAlonePrefix)
      expect(computedBemClassesObject.value).toEqual(expect.arrayContaining(expectedObj))
      expect(computedBemClassesArray.value).toEqual(expect.arrayContaining(expectedArr))
    },
  )
})
