import { useBem } from '../useBem'
import { ref } from 'vue'
const { createModifiersClasses } = useBem('va-test')

describe('createModifiersClasses', () => {
  it.each`
    modifiersCb                                   | classes                             | expected
    ${() => ({})}                                 | ${undefined}                        | ${['va-test']}
    ${() => ({ outline: true })}                  | ${undefined}                        | ${['va-test', 'va-test--outline']}
    ${() => ({ outline: true, disabled: false })} | ${undefined}                        | ${['va-test', 'va-test--outline']}
    ${() => ({ outline: true, disabled: true })}  | ${undefined}                        | ${['va-test', 'va-test--outline', 'va-test--disabled']}
    ${() => ({ outline: true })}                  | ${['some-other-class']}             | ${['va-test', 'some-other-class', 'va-test--outline']}
    ${() => ({ outline: 'true' })}                | ${[]}                               | ${['va-test', 'va-test--outline']}
    ${() => ({ outline: 'true' })}                | ${ref(['some-other-class'])}  | ${['va-test', 'some-other-class', 'va-test--outline']}
  `(
    'modifiersCb $modifiersCb & classes $classes should be $expected',
    ({ modifiersCb, classes, expected }) => {
      const result = createModifiersClasses(modifiersCb, classes)

      expect(result.value).toEqual(expect.arrayContaining(expected))
    },
  )
})
