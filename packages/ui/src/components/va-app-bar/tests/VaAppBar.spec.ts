import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaAppBar from '../VaAppBar.vue'

describe('VaAppBar', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaAppBar)
    expect(wrapper.exists()).toBeTruthy()
  })
})
