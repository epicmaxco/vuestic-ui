import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import VaDatePicker from '../VaDatePicker.vue'
import {
  GLOBAL_CONFIG,
  createGlobalConfig,
} from '../../../services/global-config/global-config'

describe('VaDatePicker', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaDatePicker, {
      global: {
        provide: {
          [GLOBAL_CONFIG]: createGlobalConfig(),
        },
      },
    })
    expect(wrapper.findComponent(VaDatePicker)).toBeTruthy()
  })
})
