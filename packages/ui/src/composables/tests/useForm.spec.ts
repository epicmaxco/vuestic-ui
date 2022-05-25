import { useForm } from '../useForm'

describe('useForm', () => {
  it.each`
    props                                  | prefix              | expected
    ${{ disabled: true, readonly: false }} | ${'va-test'}        | ${{ createComputedClasses: { 'va-test--disabled': true, 'va-test--readonly': false }, createComputedClassesArray: ['va-test--disabled'] }}
    ${{ disabled: true, readonly: false }} | ${''}               | ${{ createComputedClasses: { '--disabled': true, '--readonly': false }, createComputedClassesArray: ['--disabled'] }}
    ${{}}                                  | ${'va-test'}        | ${{ createComputedClasses: { 'va-test--disabled': undefined, 'va-test--readonly': undefined }, createComputedClassesArray: [] }}
  `(
    'props $props & prefix $prefix should be $expected',
    ({ props, prefix, expected }) => {
      const { createComputedClasses, createComputedClassesArray } = useForm(props)

      const result = { createComputedClasses: createComputedClasses(prefix).value, createComputedClassesArray: createComputedClassesArray(prefix).value }
      expect(result).toMatchObject(expected)
    },
  )
})
