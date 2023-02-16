import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaTabs from '../VaTabs.vue'

describe('VaTabs', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaTabs)
    expect(wrapper.exists()).toBeTruthy()
  })
})
