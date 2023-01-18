import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaListItem from '../VaListItem.vue'

describe('VaListItem', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaListItem)
    expect(wrapper.exists()).toBeTruthy()
  })
})
