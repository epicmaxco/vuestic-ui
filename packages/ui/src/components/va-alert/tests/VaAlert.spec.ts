import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaAlert from '../VaAlert.vue'

describe('VaAlert', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaAlert)
    expect(wrapper.exists()).toBeTruthy()
  })
})
