import { useForm } from '../useForm'

describe('useForm', () => {
  it.each`
    props                                  | prefix              | expected
    ${{ disabled: true, readonly: false }} | ${'va-test'}        | ${{ createComputedClass: { 'va-test--disabled': true, 'va-test--readonly': false }, createComputedClassArray: ['va-test--disabled'] }}
    ${{ disabled: true, readonly: false }} | ${''}               | ${{ createComputedClass: { '--disabled': true, '--readonly': false }, createComputedClassArray: ['--disabled'] }}
    ${{}}                                  | ${'va-test'}        | ${{ createComputedClass: { 'va-test--disabled': undefined, 'va-test--readonly': undefined }, createComputedClassArray: [] }}
  `(
    'props $props & prefix $prefix should be $expected',
    ({ props, prefix, expected }) => {
      const { createComputedClass, createComputedClassArray } = useForm(props)

      const result = { createComputedClass: createComputedClass(prefix).value, createComputedClassArray: createComputedClassArray(prefix).value }
      expect(result).toMatchObject(expected)
    },
  )
})
