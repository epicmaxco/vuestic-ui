import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../../utils/unit-test-utils'

import VaTimelineItem from '../VaTimelineItem.vue'

describe('VaTimelineItem', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaTimelineItem)
    expect(wrapper.exists()).toBeTruthy()
  })
})
