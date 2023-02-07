import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'
import VaCard from '../VaCard.vue'

describe('VaCard', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaCard)
    expect(wrapper.exists()).toBeTruthy()
  })
})
