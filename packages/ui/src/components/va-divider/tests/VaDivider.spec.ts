import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaDivider from '../VaDivider.vue'

describe('VaDivider', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaDivider)
    expect(wrapper.exists()).toBeTruthy()
  })
})
