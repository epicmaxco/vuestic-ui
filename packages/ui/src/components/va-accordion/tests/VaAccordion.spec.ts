import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaAccordion from '../VaAccordion.vue'

describe('VaAccordion', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaAccordion)
    expect(wrapper.exists()).toBeTruthy()
  })
})
