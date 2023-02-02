import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaInfiniteScroll from '../VaInfiniteScroll.vue'

describe('VaInfiniteScroll', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaInfiniteScroll)
    expect(wrapper.exists()).toBeTruthy()
  })
})
