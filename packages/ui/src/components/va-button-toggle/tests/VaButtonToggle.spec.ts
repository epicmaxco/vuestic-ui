import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaButtonToggle from '../VaButtonToggle.vue'

describe('VaButtonToggle', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaButtonToggle, {
      propsData: {
        options: [],
      },
    })
    expect(wrapper.exists()).toBeTruthy()
  })
})
