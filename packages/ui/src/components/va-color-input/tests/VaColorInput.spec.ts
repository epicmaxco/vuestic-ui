import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaColorInput from '../VaColorInput.vue'

describe('VaColorInput', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaColorInput)
    expect(wrapper.exists()).toBeTruthy()
  })
})
