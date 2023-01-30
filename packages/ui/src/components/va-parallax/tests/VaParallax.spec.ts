import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaParallax from '../VaParallax.vue'

describe('VaParallax', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaParallax)
    expect(wrapper.exists()).toBeTruthy()
  })
})
