import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaVirtualScroller from '../VaVirtualScroller.vue'

describe('VaVirtualScroller', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaVirtualScroller)
    expect(wrapper.exists()).toBeTruthy()
  })
})
