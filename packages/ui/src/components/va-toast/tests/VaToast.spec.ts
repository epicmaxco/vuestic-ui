import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaToast from '../VaToast.vue'

describe('VaToast', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaToast)
    expect(wrapper.exists()).toBeTruthy()
  })
})
