import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaColorIndicator from '../VaColorIndicator.vue'

describe('VaColorIndicator', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaColorIndicator)
    expect(wrapper.exists()).toBeTruthy()
  })
})
