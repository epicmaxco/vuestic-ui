import { useForm } from '../useForm'

describe('useForm', () => {
  it.each`
    props                                  | prefix              | expected
    ${{ disabled: true, readonly: false }} | ${'va-test'}        | ${{ computedClasses: { 'va-test--disabled': true } }}
    ${{ disabled: true, readonly: false }} | ${''}               | ${{ computedClasses: { '--disabled': true } }}
    ${{ disabled: true, readonly: true }}  | ${'va-test'}        | ${{ computedClasses: { 'va-test--disabled': true, 'va-test--readonly': true } }}
    ${{}}                                  | ${'va-test'}        | ${{ computedClasses: {} }}
  `(
    'props $props & prefix $prefix should be $expected',
    ({ props, prefix, expected }) => {
      const { computedClasses } = useForm(prefix, props)
      expect(computedClasses.value.value).toMatchObject(expected)
    },
  )
})
