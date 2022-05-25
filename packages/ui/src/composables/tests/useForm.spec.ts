import { useForm } from '../useForm'

describe('useForm', () => {
  it.each`
    props                                  | prefix              | expected
    ${{ disabled: true, readonly: false }} | ${'va-test'}        | ${{ computedClasses: { 'va-test--disabled': true, 'va-test--readonly': false }, computedClassesArray: ['va-test--disabled'] }}
    ${{ disabled: true, readonly: false }} | ${''}               | ${{ computedClasses: { '--disabled': true, '--readonly': false }, computedClassesArray: ['--disabled'] }}
    ${{}}                                  | ${'va-test'}        | ${{ computedClasses: { 'va-test--disabled': undefined, 'va-test--readonly': undefined }, computedClassesArray: [] }}
  `(
    'props $props & prefix $prefix should be $expected',
    ({ props, prefix, expected }) => {
      const { computedClasses, computedClassesArray } = useForm(props, prefix)
      const result = { computedClasses: computedClasses.value, computedClassesArray: computedClassesArray.value }
      expect(result).toMatchObject(expected)
    },
  )
})
