import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaSplit from '../VaSplit.vue'

describe('VaSplit', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaSplit)
    expect(wrapper.exists()).toBeTruthy()
  })
})
