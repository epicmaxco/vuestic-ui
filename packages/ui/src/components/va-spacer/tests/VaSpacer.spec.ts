import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import VaSpacer from '../VaSpacer.vue'

describe('VaSpacer', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaSpacer)
    expect(wrapper.findComponent('VaSpacer')).toBeTruthy()
  })
})
