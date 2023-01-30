import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaPopover from '../VaPopover.vue'

describe('VaPopover', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaPopover)
    expect(wrapper.exists()).toBeTruthy()
  })
})
