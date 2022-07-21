import { useSize, useSizeProps } from '../useSize'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { fromTable } from '../../utils/test-utils'

const TestComponent = {
  template: '<p></p>',
  props: {
    ...useSizeProps,
  },
}

describe('useSize', () => {
  it.each(fromTable`
    props                           | expected
    ${{ size: 'medium' }}           | ${{ fontSizeComputed: '1rem', fontSizeInRem: 1, sizeComputed: '48px' }}
    ${{ size: 12 }}                 | ${{ fontSizeComputed: '0.25rem', fontSizeInRem: 0.25, sizeComputed: '12px' }}
    ${{ size: '16px' }}             | ${{ fontSizeComputed: '0.5rem', fontSizeInRem: 0.5, sizeComputed: '16px' }}
    ${{ size: '2rem' }}             | ${{ fontSizeComputed: '2rem', fontSizeInRem: 2, sizeComputed: '2rem' }}
  `)(
    'props %s should be %s',
    async ({ props, expected }) => {
      const wrapper = mount(TestComponent)
      expect(wrapper.exists()).toBeTruthy()
      await wrapper.setProps(props)

      const { sizeComputed, fontSizeComputed, fontSizeInRem } = useSize(wrapper.props() as any)

      const result = { sizeComputed: sizeComputed.value, fontSizeComputed: fontSizeComputed.value, fontSizeInRem: fontSizeInRem.value }
      expect(result).toMatchObject(expected)
    },
  )
})
