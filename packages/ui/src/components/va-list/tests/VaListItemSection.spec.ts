import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaListItemSection from '../VaListItemSection.vue'

describe('VaListItemSection', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaListItemSection)
    expect(wrapper.exists()).toBeTruthy()
  })
})
