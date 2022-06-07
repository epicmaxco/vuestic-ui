import { useBem } from '../useBem'

describe('createModifiersClasses', () => {
  it.each`
    modifiers                             | expectedArr                                 | expectedObj                                               | expectedString
    ${{}}                                 | ${[]}                                       | ${{}}                                                     | ${''}
    ${{ outline: true }}                  | ${['va-test--outline']}                     | ${{ 'va-test--outline': true }}                           | ${'va-test--outline'}
    ${{ outline: true, disabled: false }} | ${['va-test--outline']}                     | ${{ 'va-test--outline': true }}                           | ${'va-test--outline'}
    ${{ outline: true, disabled: true }}  | ${['va-test--outline', 'va-test--disabled']}| ${{ 'va-test--outline': true, 'va-test--disabled': true }}| ${'va-test--outline va-test--disabled'}
  `(
    'modifiers $modifiers should be expectedObj $expectedObj & expectedArr $expectedArr',
    ({ modifiers, expectedObj, expectedArr }) => {
      const wrapper = useBem('va-test', modifiers)
      expect(wrapper.asArray).toEqual(expect.arrayContaining(expectedArr))
      expect(wrapper.asObject).toEqual(expect.arrayContaining(expectedObj))
      expect(wrapper.asString).toEqual(expect.arrayContaining(expectedObj))
    },
  )
})
