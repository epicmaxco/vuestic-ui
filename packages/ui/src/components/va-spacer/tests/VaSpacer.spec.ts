import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaSpacer from '../VaSpacer.vue'

describe('VaSpacer', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaSpacer)
    expect(wrapper.exists()).toBeTruthy()
  })
})
