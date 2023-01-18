import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaTreeView from '../VaTreeView.vue'

describe('VaTreeView', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaTreeView)
    expect(wrapper.exists()).toBeTruthy()
  })
})
