import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaCounter from '../VaCounter.vue'

describe('VaCounter', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaCounter)
    expect(wrapper.exists()).toBeTruthy()
  })
})
