import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaInnerLoading from '../VaInnerLoading.vue'

describe('VaInnerLoading', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaInnerLoading)
    expect(wrapper.exists()).toBeTruthy()
  })
})
