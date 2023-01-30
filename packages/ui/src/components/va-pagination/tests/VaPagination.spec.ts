import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaPagination from '../VaPagination.vue'

describe('VaPagination', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaPagination)
    expect(wrapper.exists()).toBeTruthy()
  })
})
