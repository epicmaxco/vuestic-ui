import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaList from '../VaList.vue'

describe('VaList', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaList)
    expect(wrapper.exists()).toBeTruthy()
  })
})
