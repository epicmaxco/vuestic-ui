import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaValue from '../VaValue.vue'

describe('VaValue', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaValue)
    expect(wrapper.exists()).toBeTruthy()
  })
})
