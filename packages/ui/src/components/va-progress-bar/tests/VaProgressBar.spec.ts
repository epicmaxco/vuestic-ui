import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaProgressBar from '../VaProgressBar.vue'

describe('VaProgressBar', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaProgressBar)
    expect(wrapper.exists()).toBeTruthy()
  })
})
