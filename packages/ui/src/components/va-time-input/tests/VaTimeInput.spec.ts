import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaTimeInput from '../VaTimeInput.vue'

describe('VaTimeInput', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaTimeInput)
    expect(wrapper.exists()).toBeTruthy()
  })
})
