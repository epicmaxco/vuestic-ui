import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaHover from '../VaHover.vue'

describe('VaHover', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaHover)
    expect(wrapper.exists()).toBeTruthy()
  })
})
