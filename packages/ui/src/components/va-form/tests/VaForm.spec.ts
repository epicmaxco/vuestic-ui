import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaForm from '../VaForm.vue'

describe('VaForm', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaForm)
    expect(wrapper.exists()).toBeTruthy()
  })
})
