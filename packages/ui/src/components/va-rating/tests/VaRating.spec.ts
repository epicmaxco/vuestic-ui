import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaRating from '../VaRating.vue'

describe('VaRating', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaRating)
    expect(wrapper.exists()).toBeTruthy()
  })
})
