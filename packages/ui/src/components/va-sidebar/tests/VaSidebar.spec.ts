import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaSidebar from '../VaSidebar.vue'

describe('VaSidebar', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaSidebar)
    expect(wrapper.exists()).toBeTruthy()
  })
})
