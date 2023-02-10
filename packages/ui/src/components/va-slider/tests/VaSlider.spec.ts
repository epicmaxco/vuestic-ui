import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaSlider from '../VaSlider.vue'

describe('VaSlider', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaSlider)
    expect(wrapper.exists()).toBeTruthy()
  })
})
