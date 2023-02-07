import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaSwitch from '../VaSwitch.vue'

describe('VaSwitch', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaSwitch)
    expect(wrapper.exists()).toBeTruthy()
  })
})
